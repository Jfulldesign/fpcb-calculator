// @flow strict

import React from "react";
import BirthdateInput from "components/BirthdateInput";
import BirthdateDisplay from "components/BirthdateDisplay";
import PlanCarousel from "components/PlanCarousel";
import "./styles/App.css";

type State = {
  date: Date
};

export default class App extends React.Component<void, State> {
  state = {
    date: null
  };

  onHasDate(date: Date) {
    this.setState({ date });
  }

  onEdit() {
    this.setState({ date: null });
  }

  onReset() {
    this.setState({ date: null });
  }

  render() {
    return (
      <section styleName="calculator-app">
        {this.state.date === null ? (
          <BirthdateInput onHasDate={this.onHasDate.bind(this)} />
        ) : (
          <BirthdateDisplay
            date={this.state.date}
            onEdit={this.onEdit.bind(this)}
            onReset={this.onReset.bind(this)}
          />
        )}
        <PlanCarousel />
      </section>
    );
  }
}
