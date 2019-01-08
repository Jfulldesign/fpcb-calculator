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
        <div styleName="plan-details">
          <h4>What does this plan cover?</h4>
          <ol>
            <li>
              {plan.credits.college > 0 && (
                <span>
                  <strong>
                    {plan.credits.college} lower division credit hours
                  </strong>{" "}
                  at a Florida College
                  {plan.credits.state > 0 ? " and " : ". "}
                </span>
              )}
              {plan.credits.state > 0 && (
                <span>
                  <strong>{plan.credits.state} semester credit hours</strong> at
                  a State University.
                </span>
              )}
            </li>
            <li>
              Covers tuition and most fees.{" "}
              <a href="#">Learn more about fees</a>.
            </li>
            <li>Option to add a Dormitory Plan starting at $47.89/month.</li>
          </ol>
          <a href="#">Enroll Online</a>
        </div>
      </React.Fragment>
    );
  }
}
