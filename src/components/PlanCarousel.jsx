// @flow strict

import React from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import { plans } from "util/constants";
import type { Plan } from "util/types";
import "./styles/PlanCarousel.css";

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

export default class PlanCarousel extends React.Component<void> {
  render() {
    return (
      <div styleName="plan-carousel">
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
    );
  }
}
