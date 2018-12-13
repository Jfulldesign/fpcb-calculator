// @flow strict

import React from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import PlanCard from "components/PlanCard";
import { plans } from "util/constants";
import "./styles/PlanCarousel.css";

export default class PlanCarousel extends React.Component<void> {
  render() {
    return (
      <div styleName="plan-carousel">
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          lockOnWindowScroll={true}
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
