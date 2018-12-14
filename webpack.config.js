const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const SriPlugin = require("webpack-subresource-integrity");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = function(env) {
  const plugins = [
    new Dotenv(),
    new HtmlWebpackPlugin({
      title: "FPCB Plan Calculator",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
      }
    })
  ];

  if (env.dev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (env.analyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (env.prod) {
    plugins.push(
      new SriPlugin({ hashFuncNames: ["sha256", "sha384"] }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].css"
      })
    );
  }

  return {
    plugins,
    context: __dirname,
    mode: env.prod ? "production" : "development",
    entry: [
      "@babel/polyfill",
      "rc-tooltip/assets/bootstrap_white.css",
      "pure-react-carousel/dist/react-carousel.es.css",
      "./src/index.jsx"
    ],
    output: {
      path: path.resolve("./dist"),
      filename: env.prod ? "[name].[contenthash].js" : "bundle.js",
      crossOriginLoading: "anonymous"
    },
    resolve: {
      modules: ["./src", "node_modules"],
      extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"]
    },
    devtool: "cheap-module-source-map",
    devServer: {
      hot: true,
      host: "0.0.0.0",
      historyApiFallback: true
    },
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
        {
          test: /\.css$/,
          oneOf: [
            {
              issuer: {
                test: /\.jsx?$/
              },
              use: [
                {
                  loader: env.prod
                    ? MiniCssExtractPlugin.loader
                    : "style-loader",
                  options: { sourceMap: true }
                },
                {
                  loader: "css-loader",
                  options: {
                    modules: true,
                    sourceMap: true,
                    importLoaders: 1,
                    localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
                  }
                },
                {
                  loader: "postcss-loader",
                  options: { sourceMap: true }
                }
              ]
            },
            {
              use: [
                {
                  loader: env.prod
                    ? MiniCssExtractPlugin.loader
                    : "style-loader"
                },
                {
                  loader: "css-loader"
                },
                {
                  loader: "postcss-loader"
                }
              ]
            }
          ]
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          oneOf: [
            {
              issuer: {
                test: /\.jsx?$/
              },
              use: ["babel-loader", "@svgr/webpack", "url-loader"]
            },
            {
              loader: "url-loader"
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
          loader: "url-loader",
          options: {
            limit: 10000
          }
        }
      ]
    }
  };
};
