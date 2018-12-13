// @flow strict

import React from "react";
import type { Plan, PaymentSchedule } from "util/types";
import "./styles/PlanCard.css";

type Props = {
  plan: Plan,
  year: number,
  type: PaymentSchedule
};

const PlanCard = ({ plan }: Props) => (
  <div>
    <h1>{plan.title}</h1>
    <div styleName="price">
      <span>Starting at</span>
      <span>
        {plan.prices.monthly[0]}
        <span>/month</span>
      </span>
    </div>
  </div>
);

export default PlanCard;
