// @flow

import React from "react";
import { priceIndex } from "util/maths";
import type { Plan, PaymentSchedule } from "util/types.flow.js";
import "./styles/PlanTable.css";

import iconUni from "assets/icon-uni.png";
import iconCollege from "assets/icon-college.png";

type Props = {
  date: ?Date,
  plans: Array<Plan>,
  paymentType: PaymentSchedule
};

export default class PlanTable extends React.Component<Props> {
  render() {
    const { plans, date, paymentType } = this.props;
    const pidx = date == null ? 0 : priceIndex(date);

    return (
      <div styleName="plan-table">
        <table>
          <tbody>
            <tr>
              <td styleName="def--info">
                <strong>What does each plan cover?</strong>
              </td>
              {plans.map(({ id, title, description, prices, note }) => {
                const price = pidx == null ? "–" : prices[paymentType][pidx];
                return (
                  <td styleName={`plan--${id}--info`} key={`plan--${id}--info`}>
                    {note && <div styleName="note">{note}</div>}
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <div styleName="price">
                      {!date && <span styleName="starting">Starting at</span>}
                      {`$${price.toLocaleString()}`}
                      {paymentType !== "single" && (
                        <span styleName="per"> / month</span>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
            <tr>
              <td styleName="def--uni">State University Credit Hours</td>
              {plans.map(({ id, credits: { state } }) => (
                <td styleName={`plan--${id}--uni`} key={`plan--${id}--uni`}>
                  {state === 0 ? (
                    <i className="fa fa-minus" />
                  ) : (
                    <React.Fragment>
                      <img src={iconUni} />
                      {state} Hours
                    </React.Fragment>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td styleName="def--college">Florida College Credit Hours</td>
              {plans.map(({ id, credits: { college } }) => (
                <td
                  styleName={`plan--${id}--college`}
                  key={`plan--${id}--college`}
                >
                  {college === 0 ? (
                    <i className="fa fa-minus" />
                  ) : (
                    <React.Fragment>
                      <img src={iconCollege} />
                      {college} Hours
                    </React.Fragment>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td styleName="def--fees">
                Covers tuition and most fees. <a href="#">Learn about fees.</a>
              </td>
              {plans.map(({ id }) => (
                <td styleName={`plan--${id}--fees`} key={`plan--${id}--fees`}>
                  <i className="fa fa-check" />
                </td>
              ))}
            </tr>
            <tr>
              <td styleName="def--dorm">Option to add a Dormitory Plan</td>
              {plans.map(({ id, dorm }) => (
                <td styleName={`plan--${id}--dorm`} key={`plan--${id}--dorm`}>
                  {dorm ? (
                    <React.Fragment>Starting at $47.89 / month</React.Fragment>
                  ) : (
                    <i className="fa fa-minus" />
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td styleName="def--cost">
                Projected Actual Cost of College <a href="#">in 2025</a>
              </td>
              {plans.map(({ id }) => (
                <td styleName={`plan--${id}--cost`} key={`plan--${id}--cost`}>
                  {date ? (
                    <span>Something here</span>
                  ) : (
                    <span>Enter birthdate to calculate</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
