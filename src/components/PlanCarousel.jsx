// @flow strict

import React from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import PlanCard from "components/PlanCard";
import { plans } from "util/constants";
import type { PaymentSchedule } from "util/types";
import "./styles/PlanCarousel.css";

type Props = {
  date: Date,
  paymentType: PaymentSchedule
};

export default class PlanCarousel extends React.Component<Props> {
  render() {
    const { date, paymentType } = this.props;
    return (
      <div styleName="plan-carousel">
        <CarouselProvider
          naturalSlideWidth={255}
          naturalSlideHeight={148}
          lockOnWindowScroll={true}
          totalSlides={5}
        >
          <Slider>
            <Slide index={0}>
              <PlanCard
                plan={plans.get("1U")}
                year={0}
                type={paymentType}
                note={<span>Most Popular</span>}
              />
            </Slide>
            <Slide index={1}>
              <PlanCard plan={plans.get("4U")} year={0} type={paymentType} />
            </Slide>
            <Slide index={2}>
              <PlanCard plan={plans.get("2P")} year={0} type={paymentType} />
            </Slide>
            <Slide index={3}>
              <PlanCard plan={plans.get("2C")} year={0} type={paymentType} />
            </Slide>
            <Slide index={4}>
              <PlanCard plan={plans.get("4C")} year={0} type={paymentType} />
            </Slide>
          </Slider>
        </CarouselProvider>
        <a href="#">Enroll in this Plan</a>
        <a href="#">Email Me These Prices</a>
        <div>
          <h4>What does this plan cover?</h4>
          <ol>
            <li>
              All tuition, registration, tuition differential and local fees.
              Does not include campus fees.{" "}
              <a href="#">Learn more about fees.</a>
            </li>
            <li>30 semester credit hours at a State University</li>
          </ol>
        </div>
      </div>
    );
  }
}
