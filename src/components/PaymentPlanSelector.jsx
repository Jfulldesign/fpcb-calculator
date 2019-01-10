// @flow strict

import React from "react";
import { Tooltip } from "react-tippy";
import { priceIndex } from "util/maths";
import type { PaymentSchedule } from "util/types";
import "./styles/PaymentPlanSelector.css";

type Props = {
  date: ?Data,
  onSelectionChange: PaymentSchedule => void
};

export default class PaymentPlanSelector extends React.Component<Props> {
  onChange = event => {
    const value = event.currentTarget.value;
    this.setState({ value });
    this.props.onSelectionChange(value);
  };

  render() {
    const { date } = this.props;
    const pidx = date === null ? 0 : priceIndex(date);

    return (
      <div styleName="payment-selector">
        <input
          type="radio"
          id="pay-monthly"
          name="payment"
          value="monthly"
          onChange={this.onChange}
          defaultChecked
        />
        <label htmlFor="pay-monthly">
          Monthly <span styleName="description">88 payments</span>
        </label>

        <input
          type="radio"
          id="pay-short"
          name="payment"
          value="short"
          disabled={pidx > 14}
          onChange={this.onChange}
        />
        <label htmlFor="pay-short">
          5 Year<span styleName="description">55 payments</span>
        </label>

        <input
          type="radio"
          id="pay-single"
          name="payment"
          value="single"
          onChange={this.onChange}
        />
        <label htmlFor="pay-single">
          Lump Sum<span styleName="description">One payment</span>
        </label>

        <Tooltip
          html={
            <div className="tip">
              <h6>What are my payment options?</h6>
              <p>
                The monthly option breaks down plan prices into monthly payments
                through October of the year your child graduates from high
                school.
              </p>
              <p>
                The 5-year option breaks down plan prices into 55 monthly
                payments over five years.
              </p>
              <p>
                Both monthly and 5-year options include an interest fee that is
                determined by the contract year and will not change. Your
                beneficiary is entitled to the total value paid into the plan,
                including interest.
              </p>
              <p>
                This option is a single payment for the plan purchased. There is
                no interest fee applied. Your beneficiary is entitled to the
                total value paid into the plan.
              </p>
            </div>
          }
          position="bottom"
          trigger="click"
          tabIndex="0"
          arrow
        >
          <button styleName="info-tooltip">
            <i className="fa fa-info-circle" />
          </button>
        </Tooltip>
      </div>
    );
  }
}
