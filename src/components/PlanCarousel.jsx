// @flow

import React from "react";
import PlanCard from "components/PlanCard";
import PlanDetails from "components/PlanDetails";
import CurrentPlanProvider from "components/util/CurrentPlanProvider";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import type { PaymentSchedule, Plan, PlanID } from "util/types.flow.js";
import "./styles/PlanCarousel.css";

type Props = {
  date: ?Date,
  plans: Array<Plan>,
  focus: PlanID,
  paymentType: PaymentSchedule
};

type State = {
  current: PlanID
};

export default class PlanCarousel extends React.Component<Props, State> {
  state = { current: this.props.focus || "U1" };
  render() {
    const { paymentType, plans, focus, date } = this.props;
    const currentSlide = plans.findIndex(({ id }) => id === focus);

    return (
      <div styleName="plan-carousel">
        <CarouselProvider
          naturalSlideWidth={255}
          naturalSlideHeight={200}
          lockOnWindowScroll={true}
          currentSlide={currentSlide === -1 ? 0 : currentSlide}
          totalSlides={5}
        >
          <Slider>
            {plans.map((plan, idx) => (
              <Slide index={idx} key={`slide-${plan.id}-${idx}`}>
                <PlanCard plan={plan} date={date} type={paymentType} />
              </Slide>
            ))}
          </Slider>
          <CurrentPlanProvider
            date={date}
            render={idx => (
              <PlanDetails plan={plans[idx]} date={date} type={paymentType} />
            )}
          />
        </CarouselProvider>
      </div>
    );
  }
}
