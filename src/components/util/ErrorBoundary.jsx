// @flow strict

import React from "react";

type Props = {
  message: string,
  children?: React.Node
};

type State = {
  hasError: boolean
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <header>
            <span>That&apos;s an error</span>
          </header>
          <main>
            <p>
              This part of the app has encountered an unrecoverable error, see
              the message below for further details:
            </p>
            <code>{this.props.message}</code>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}
