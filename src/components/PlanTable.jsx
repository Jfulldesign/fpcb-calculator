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
              <td styleName="def def--info">
                <strong>What does each plan cover?</strong>
              </td>
              {plans.map(({ id, title, description, prices, note }) => {
                const price = pidx == null ? "–" : prices[paymentType][pidx];
                return (
                  <td
                    styleName={`plan--${id} plan--info`}
                    key={`plan--${id}--info`}
                  >
                    {note && <div styleName="note">{note}</div>}
                    <div styleName="info-container">
                      <h3>{title}</h3>
                      <p>{description}</p>
                      <div styleName="price">
                        {!date && <span styleName="starting">Starting at</span>}
                        {`$${price.toLocaleString()}`}
                        {paymentType !== "single" && (
                          <span styleName="per"> / month</span>
                        )}
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
            <tr>
              <td styleName="def def--uni">State University Credit Hours</td>
              {plans.map(({ id, credits: { state } }) => (
                <td
                  styleName={`plan--${id} plan--uni`}
                  key={`plan--${id}--uni`}
                >
                  {state === 0 ? (
                    <i className="fa fa-minus" />
                  ) : (
                    <React.Fragment>
                      <img styleName="icon icon--uni" src={iconUni} />
                      {state} Hours
                    </React.Fragment>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td styleName="def def--college">Florida College Credit Hours</td>
              {plans.map(({ id, credits: { college } }) => (
                <td
                  styleName={`plan--${id} plan--college`}
                  key={`plan--${id}--college`}
                >
                  {college === 0 ? (
                    <i className="fa fa-minus" />
                  ) : (
                    <React.Fragment>
                      <img styleName="icon icon--college" src={iconCollege} />
                      {college} Hours
                    </React.Fragment>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td styleName="def def--fees">
                Covers tuition and most fees. <a href="#">Learn about fees.</a>
              </td>
              {plans.map(({ id }) => (
                <td
                  styleName={`plan--${id} plan--fees`}
                  key={`plan--${id}--fees`}
                >
                  <i className="fa fa-check" />
                </td>
              ))}
            </tr>
            <tr>
              <td styleName="def def--dorm">Option to add a Dormitory Plan</td>
              {plans.map(({ id, dorm }) => (
                <td
                  styleName={`plan--${id} plan--dorm`}
                  key={`plan--${id}--dorm`}
                >
                  {dorm ? (
                    <React.Fragment>
                      Starting at
                      <br />
                      $47.89 / month
                    </React.Fragment>
                  ) : (
                    <i className="fa fa-minus" />
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td styleName="def def--cost">
                Projected Actual Cost of College
              </td>
              {plans.map(({ id }) => (
                <td
                  styleName={`plan--${id} plan--cost`}
                  key={`plan--${id}--cost`}
                >
                  <div styleName="college-price">
                    {date ? (
                      <span>Something here</span>
                    ) : (
                      <span>
                        Enter Birthdate
                        <br />
                        to Calculate
                      </span>
                    )}
                  </div>
                  <a href="" styleName="enroll">
                    Enroll Online
                  </a>
                  {date && (
                    <a href="" styleName="email">
                      Email Prices
                    </a>
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
