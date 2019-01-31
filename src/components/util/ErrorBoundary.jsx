// @flow strict

import React from "react";
import type { Node } from "react";

type Props = {
  children?: Node
};

type State = {
  error: ?Error
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error != null) {
      return (
        <div>
          <header>
            <h1>That&apos;s an error</h1>
          </header>
          <main>
            {process.env.NODE_ENV === "development" ? (
              <React.Fragment>
                <p>
                  This part of the app has encountered an unrecoverable error,
                  see the message below for further details:
                </p>
                <pre>{this.state.error.stack}</pre>
              </React.Fragment>
            ) : (
              <p>
                This part of the app has encountered an unrecoverable error.
              </p>
            )}
          </main>
        </div>
      );
    }

    return this.props.children || null;
  }
}
