// @flow

import React from "react";
import PlanCard from "components/PlanCard";
import PlanDetails from "components/PlanDetails";
import CurrentPlanProvider from "components/util/CurrentPlanProvider";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import type { PaymentSchedule, Plan, PlanID } from "util/types.flow.js";
import { priceIndex, graduatesIn, formatMoney } from "util/maths";
import { DORM } from "util/constants";
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
    const pidx = date == null ? 0 : priceIndex(date);
    return (
      <div styleName="plan-carousel">
        <CarouselProvider
          naturalSlideWidth={255}
          naturalSlideHeight={210}
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

        {plans.map(({ id, credits: { state } }) => {
          return(
                  <span style={{display:'none'}} id={`state_hours-${id}`}>{state}</span>
                );
        })}
        {plans.map(({ id, estimatedCost }) => {

          return (
              <a style={{display:'none'}}
                href={`https://customeraccess.myfloridaprepaid.com/selectpath.aspx?plan=${id}`}
                 className="planenroll_url" id={`planenroll_url-${id}`}
              >
              </a>
          );
        })}
        {plans.map(({ id, title, description, prices, note }) => {
          const price = pidx == null ? "–" : prices[paymentType][pidx];

          return (
                  <span style={{display:'none'}} id={`plan_price-${id}`}>{formatMoney(price)}</span>
                );
          })}
          {plans.map(({ id, credits: { college } }) => {

            return (

                  <span style={{display:'none'}} id={`college_hours-${id}`}>{college}</span>
            );
          })}

          {plans.map(({ id, dorm }) => {
            return (
                  <span style={{display:'none'}} id={`dorm_price-${id}`}>{formatMoney(DORM.prices[paymentType][pidx])}</span>
            );
          })}
      </div>
    );
  }
}
