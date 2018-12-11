const postcssSimpleVars = require("postcss-simple-vars");

module.exports = () => ({
  plugins: {
    "postcss-mixins": {},
    "postcss-import": {},
    "postcss-nested": {},
    "postcss-utilities": {},
    "postcss-color-function": {},
    "postcss-custom-selectors": {},
    "postcss-url": { url: "inline" },
    "postcss-preset-env": {
      insertBefore: {
        "all-property": postcssSimpleVars
      }
    },
    cssnano: {}
  }
});
