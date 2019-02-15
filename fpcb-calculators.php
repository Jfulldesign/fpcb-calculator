<?php

/**
 * Plugin Name: FPCB Calculators
 * Plugin URI:  https://github.com/sjpdigital/fpcb-calculators
 * Description: Prepaid Plan calculators for myfloridaprepaid.com
 * Version:     1.0
 * Author:      Julian Bravard <julianbravard@sjp.com>
 * License:     UNLICENSED
 **/

defined('ABSPATH') or die('nope');

function Get_Asset_name($path)
{
    $asset = explode('/', $path);
    return $asset[count($asset) - 1];
}

function Register_glob($glob, $regFn)
{
    $asset_dir = __DIR__ . '/';
    $handles = array();
    foreach (glob($asset_dir . $glob) as $filename) {
        $name = Get_Asset_name($filename);
        call_user_func(
            $regFn,
            $name,
            str_replace(get_site_url(), '', plugin_dir_url(__FILE__) . '/') . $name,
            array(),
            null,
            $regFn === 'wp_register_style' ? 'all' : true
        );
        array_push($handles, $name);
    }
    return $handles;
}

class FPCBCalculators
{
    public $script_handles = array();
    public $style_handles = array();

    function check_uri($url) {
        if (strpos($_SERVER['REQUEST_URI'], $url) === 0) return TRUE;
        else return FALSE;
    }
    public function init()
    {
      // only load calculator assets for page it is displayed on
      if($this->check_uri('/prepaid-plans/plans-and-pricing') ){
        add_action('init', array($this, 'registerAssets'), 9999);
        add_action('wp_enqueue_scripts', array($this, 'loadAssets'), 9999);

        add_shortcode(
            'plan-calculator',
            function () {
                echo ('<div class="hook--calculators"></div>');
            }
        );
      }

    }

    public function registerAssets()
    {
        array_push($this->script_handles, Register_glob('*.js', 'wp_register_script'));
        array_push($this->style_handles, Register_glob('*.css', 'wp_register_style'));
    }

    public function loadAssets()
    {
        foreach ($this->script_handles as $handle) {
            wp_enqueue_script($handle);
        }
        foreach ($this->style_handles as $handle) {
            wp_enqueue_style($handle);
        }
    }
}

(new FPCBCalculators)->init();
