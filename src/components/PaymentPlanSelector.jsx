// @flow

import React from "react";
import { Tooltip } from "react-tippy";
import { priceIndex } from "util/maths";
import { PAYMENT_COUNT } from "util/constants";
import type { PaymentSchedule } from "util/types.flow.js";
import "./styles/PaymentPlanSelector.css";

type Props = {
  date: Date,
  paymentType: PaymentSchedule,
  onSelectionChange: PaymentSchedule => void
};

export default class PaymentPlanSelector extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange = (event: Event) => {
    const target = event.currentTarget;
    if (target instanceof HTMLInputElement) {
      const value = target.value;
      // these two don't like having a "string" being assigned where
      // the PaymentSchedule enum belongs, but since we control the inputs
      // below, we know they're always going to be one of the enum
      // $FlowFixMe
      this.props.onSelectionChange(value);
    }
  };

  render() {
    const { date, paymentType } = this.props;
    const pidx = date === null ? 0 : priceIndex(date);

    return (
      <div styleName="payment-selector">
        <div id="active-container" styleName="payment-selector-container" className="pay-month">
        <input
          type="radio"
          id="pay-monthly"
          name="payment"
          value="monthly"
          onChange={this.onChange}
          checked={paymentType === "monthly"}
          className="activator activator-pay"
        />
        <label htmlFor="pay-monthly" className="activator activator-label" data-hj-whitelist>
          Monthly{" "}
          <span styleName="description" data-hj-whitelist>
            <span id="payment_months">{PAYMENT_COUNT[pidx]}</span> payments
          </span>
        </label>

        <input
          type="radio"
          id="pay-short"
          name="payment"
          value="short"
          disabled={pidx > 14}
          checked={paymentType === "short"}
          onChange={this.onChange}
          className="activator activator-pay"
        />
        <label htmlFor="pay-short" className="activator activator-label" data-hj-whitelist>
          5 Year<span styleName="description">55 payments</span>
        </label>

        <input
          type="radio"
          id="pay-single"
          name="payment"
          value="single"
          checked={paymentType === "single"}
          onChange={this.onChange}
          className="activator activator-pay"
        />
        <label htmlFor="pay-single" className="activator activator-label" data-hj-whitelist>
          Lump Sum<span styleName="description">One payment</span>
        </label>
      </div>
      <Tooltip
        html={
          <div className="tip">
            <h6>What are my payment options?</h6>
            <p>
              The monthly payment option breaks down plan prices into monthly
              payments through the year your child graduates from high school.
            </p>
            <p>
              The 5-Year option breaks down plan prices into 55 monthly
              payments over five years.
            </p>
            <p>
              Both the monthly and 5-year options include an interest fee that
              is determined by the contract year and will not change.
            </p>
            <p>
              If you decide to make one lump-sum payment, there is no interest
              fee applied.
            </p>
          </div>
        }
        position="bottom"
        trigger="mouseenter"
        tabIndex="0"
        arrow
      >
        <button styleName="info-tooltip" aria-label="PaymentPlanSelector Info Tooltip">
          <i className="fa fa-info-circle" />
        </button>
      </Tooltip>
    </div>
    );
  }
}
