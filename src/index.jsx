// @flow

import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import ErrorBoundary from "components/util/ErrorBoundary";
import "./index.css";

if (process.env.NODE_ENV === "development") {
  const a11y = require("react-a11y").default;
  a11y(React, ReactDOM, {
    rules: {
      "aria-role": "warn",
      "aria-unsupported-elements": "warn",
      "click-events-have-key-events": "warn",
      "hidden-uses-tabindex": "warn",
      "img-redundant-alt": "warn",
      "img-uses-alt": "warn",
      "interactive-supports-focus": "warn",
      "label-has-for": "warn",
      "mouse-events-have-key-events": "warn",
      "no-access-key": "warn",
      "no-hash-ref": "warn",
      "no-onchange": "warn",
      "onclick-uses-role": "warn",
      "tabindex-no-positive": "warn",
      "tabindex-uses-button": "warn"
    }
  });
}

const mount = document.createElement("div");
const modal = document.createElement("div");
mount.classList.add("container");
modal.id = "modal-root";
if (document.body != undefined) {
  document.body.appendChild(mount);
  document.body.appendChild(modal);
  ReactDOM.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
    mount
  );
} else {
  throw new Error("Cannot find suitable mount.");
}
