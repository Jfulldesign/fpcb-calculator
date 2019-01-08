// @flow strict

import React from "react";
import { Tooltip } from "react-tippy";
import type { PaymentSchedule } from "util/types";
import "./styles/PaymentPlanSelector.css";

type Props = {
  onSelectionChange: PaymentSchedule => void
};

export default class PaymentPlanSelector extends React.Component<Props> {
  onChange = event => {
    const value = event.currentTarget.value;
    this.setState({ value });
    this.props.onSelectionChange(value);
  };

  render() {
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
              <h6>Why is this important?</h6>
              <p>
                Your child&apos;s grade predicts the year they will graduate and
                begin using their Florida Prepaid Plan. The beneficiary has up
                to 10 years following graduation to use a Florida Prepaid Plan.
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
