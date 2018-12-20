// @flow strict

import React from "react";
import PlanCard from "components/PlanCard";
import PlanDetails from "components/PlanDetails";
import PlanProvider from "components/util/PlanProvider";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import { plans } from "util/constants";
import type { PaymentSchedule } from "util/types";
import "./styles/PlanCarousel.css";

type Props = {
  date: Date,
  paymentType: PaymentSchedule
};

type State = {
  current: string
};

export default class PlanCarousel extends React.Component<Props, State> {
  state = { current: "1U" };
  render() {
    const { paymentType } = this.props;
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
          <PlanProvider render={plan => <PlanDetails plan={plan} />} />
        </CarouselProvider>
      </div>
    );
  }
}
