// @flow strict

import React from "react";
import IMask from "imask";
import { format, parse } from "date-fns";
import { IMaskInput } from "react-imask";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import { plans } from "util/constants";
import type { Plan } from "util/types";
import "./styles/App.css";

const PlanCard = ({ plan }: { plan: Plan }) => (
  <div>
    <span>{plan.title}</span>
    <span>Starting at</span>
    <span>
      {plan.prices.monthly[0]}
      <span>/month</span>
    </span>
    <span>View details</span>
  </div>
);

export default class App extends React.Component<void> {
  state = {
    birthdate: null
  };

  onHasBirthdate(birthdate) {
    this.setState({ birthdate });
  }

  render() {
    return (
      <section styleName="app">
        {this.state.birthdate == null && (
          <div styleName="birthdate">
            <span>Your Child&apos;s Birthdate</span>
          </div>
        )}
        <span>{this.state.birthdate && this.state.birthdate.toString()}</span>
        <div>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={6}
          >
            <Slider>
              {plans.map((plan, idx) => (
                <Slide index={idx} key={plan.id}>
                  <PlanCard plan={plan} />
                </Slide>
              ))}
            </Slider>
          </CarouselProvider>
          <a href="#">Enroll in this Plan</a>
          <a href="#">Email Me These Prices</a>
        </div>
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
