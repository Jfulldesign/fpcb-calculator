// @flow strict

import React from "react";
import cx from "classnames";
import type { Plan, PaymentSchedule } from "util/types";
import "./styles/PlanCard.css";

type Props = {
  plan: Plan,
  year: number,
  type: PaymentSchedule,
  note?: React.Node
};

const PlanCard = ({ plan, year, type, note }: Props) => {
  const styleName = cx({
    [`plan--${plan.id}`]: true,
    "plan-card": true
  });

  return (
    <div styleName={styleName}>
      <h1 styleName="title">{plan.title}</h1>
      <span styleName="starting">Starting at</span>
      <span styleName="price">
        {plan.prices[type][year]}
        {type !== "single" && <span styleName="per">/ month</span>}
      </span>
      <span styleName="note">{note}</span>
    </div>
  );
};

export default PlanCard;
