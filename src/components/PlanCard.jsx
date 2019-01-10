// @flow strict

import React from "react";
import cx from "classnames";
import { priceIndex } from "util/maths";
import type { Plan, PaymentSchedule } from "util/types";
import "./styles/PlanCard.css";

type Props = {
  plan: Plan,
  date: ?Date,
  type: PaymentSchedule
};

const PlanCard = ({ plan, type, date }: Props) => {
  const styleName = cx({
    [`plan--${plan.id}`]: true,
    "plan-card": true
  });

  const pidx = date === null ? 0 : priceIndex(date);
  const price = pidx === undefined ? "–" : plan.prices[type][pidx];

  return (
    <div styleName={styleName}>
      <h1 styleName="title">{plan.title}</h1>
      <p>{plan.description}</p>
      <div styleName="price">
        {!date && <span styleName="starting">Starting at</span>}
        {`$${price.toLocaleString()}`}
        {type !== "single" && <span styleName="per"> / month</span>}
      </div>
      {plan.note && <div styleName="note">{plan.note}</div>}
    </div>
  );
};

export default PlanCard;
