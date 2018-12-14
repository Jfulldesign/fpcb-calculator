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

  onHasBirthdate(date: Date) {
    this.setState({ date });
  }

  render() {
    return (
      <section styleName="calculator-app">
        {this.state.date === null ? (
          <BirthdateInput onContinue={this.onHasBirthdate.bind(this)} />
        ) : (
          <BirthdateDisplay date={this.state.date} />
        )}
        <PlanCarousel />
      </section>
    );
  }
}
