// @flow strict

import React from "react";
import "./styles/PlanDetails.css";
import type { Plan } from "util/types";

type Props = {
  plan: Plan
};

export default class PlanDetails extends React.Component<Props> {
  render() {
    const { plan } = this.props;
    return (
      <React.Fragment>
        <div styleName="plan-links">
          <a href="#">Enroll in this Plan {plan.id}</a>
          <a href="#">Email Me These Prices</a>
        </div>
        <div styleName="plan-details">
          <h4>What does this plan cover?</h4>
          <ol>
            <li>
              All tuition, registration, tuition differential and local fees.
              Does not include campus fees.{" "}
              <a href="#">Learn more about fees.</a>
            </li>
            <li>30 semester credit hours at a State University</li>
          </ol>
        </div>
      </React.Fragment>
    );
  }
}
