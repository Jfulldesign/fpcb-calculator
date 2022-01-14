// @flow

import React from "react";
import cx from "classnames";
import { priceIndex, formatMoney } from "util/maths";
import type { Plan, PaymentSchedule } from "util/types.flow.js";
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

  const pidx = date == null ? 0 : priceIndex(date);
  const price = pidx == null ? "–" : plan.prices[type][pidx];

  return (
    <div styleName={styleName} className="plan-price-all plan-price-mob">
      <h1 styleName={date ? `active title`:`title`} className="planname" id={`plan_name-${plan.id}`}>{plan.title}</h1>
      <p>{plan.description}</p>
      <div styleName="price">
        {!date && <span styleName="starting">Starting at</span>}
        <span className="plan_price" id={`benefit_price-${plan.id}`}>{formatMoney(price)}</span>
        {type !== "single" && <span styleName="per"> / month</span>}
        {type == "single" && <span styleName="per">&nbsp;</span>}
      </div>
      {/* {plan.note && <div styleName="note">{plan.note}</div>} */}
    </div>
  );
};

export default PlanCard;
