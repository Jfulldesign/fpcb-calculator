// @flow strict

import React from "react";

type State = {
  error: ?Error
};

export default class ErrorBoundary extends React.Component<void, State> {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error !== null) {
      return (
        <div>
          <header>
            <h1>That&apos;s an error</h1>
          </header>
          <main>
            <p>
              This part of the app has encountered an unrecoverable error, see
              the message below for further details:
            </p>
            <pre>{this.state.error.stack}</pre>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}
