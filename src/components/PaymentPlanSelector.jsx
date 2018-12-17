// @flow strict

import React from "react";
import type { PaymentSchedule } from "util/types";
import "./styles/PaymentPlanSelector.css";

type Props = {
  onSelectionChange: PaymentSchedule => void
};

export default class PaymentPlanSelector extends React.Component<Props> {
  state = { value: "monthly" };
  onChange = event => {
    const value = event.currentTarget.value;
    this.setState({ value });
    this.props.onSelectionChange(value);
  };

  render() {
    const { value } = this.state;
    return (
      <div styleName="payment-selector">
        <input
          type="radio"
          id="pay-monthly"
          name="payment"
          value="monthly"
          checked={value === "monthly"}
          onChange={this.onChange}
        />
        <label htmlFor="pay-monthly">Monthly</label>

        <input
          type="radio"
          id="pay-short"
          name="payment"
          value="short"
          checked={value === "short"}
          onChange={this.onChange}
        />
        <label htmlFor="pay-short">5 Year</label>

        <input
          type="radio"
          id="pay-single"
          name="payment"
          value="single"
          checked={value === "single"}
          onChange={this.onChange}
        />
        <label htmlFor="pay-single">Lump Sum</label>
      </div>
    );
  }
}
