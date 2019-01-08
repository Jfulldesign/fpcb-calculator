// @flow

import React from "react";

export default class PlanTable extends React.Component<void> {
  render() {
    return (
      <div className="plan-table">
        <ol className="defs">
          <li>
            <strong>What does each plan cover?</strong>
          </li>
          <li>State University Credit Hours</li>
          <li>Florida College Credit Hours</li>
          <li>
            All tuition, registration, tuition differential and local fees. Does
            not include campus fees.
          </li>
          <li>Option to add a Dormitory Plan</li>
          <li>
            Projected Actual Cost of College <a href="#">in 2025</a>
          </li>
        </ol>
        <ul className="plans">
          <li>
            <h1>Plan title</h1>
            <span className="price">$349.56</span>
          </li>
        </ul>
      </div>
    );
  }
}
