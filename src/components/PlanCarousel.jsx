// @flow

import React from "react";
import PlanCard from "components/PlanCard";
import PlanDetails from "components/PlanDetails";
import CurrentPlanProvider from "components/util/CurrentPlanProvider";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import type { PaymentSchedule, Plan } from "util/types.flow.js";
import "./styles/PlanCarousel.css";

type Props = {
  date: ?Date,
  plans: Array<Plan>,
  paymentType: PaymentSchedule
};

type State = {
  current: string
};

export default class PlanCarousel extends React.Component<Props, State> {
  state = { current: "1U" };
  render() {
    const { paymentType, plans, date } = this.props;
    return (
      <div styleName="plan-carousel">
        <CarouselProvider
          naturalSlideWidth={255}
          naturalSlideHeight={200}
          lockOnWindowScroll={true}
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
            render={idx => <PlanDetails plan={plans[idx]} date={date} />}
          />
        </CarouselProvider>
      </div>
    );
  }
}
