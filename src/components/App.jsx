// @flow strict

import React from "react";
import BirthdateInput from "components/BirthdateInput";
import PlanCarousel from "components/PlanCarousel";
import "./styles/App.css";

export default class App extends React.Component<void> {
  state = {
    birthdate: null
  };

  onHasBirthdate(birthdate) {
    this.setState({ birthdate });
  }

  render() {
    return (
      <section styleName="calculator-app">
        <BirthdateInput />
        <PlanCarousel />
        <footer>
          <h4>What does this plan cover?</h4>
          <p>
            All tuition, registration, tuition differential and local fees. Does
            not include campus fees. <a href="#">Learn more about fees.</a>
          </p>
          <p>30 semester credit hours at a State University</p>
        </footer>
      </section>
    );
  }
}
