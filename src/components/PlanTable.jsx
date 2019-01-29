// @flow

import React from "react";
import cx from "classnames";
import { Tooltip } from "react-tippy";
import { priceIndex } from "util/maths";
import { DORM } from "util/constants";
import type { Plan, PlanID, PaymentSchedule } from "util/types.flow.js";
import "./styles/PlanTable.css";

import IconUni from "assets/icon-uni.svg";
import IconCollege from "assets/icon-college.svg";

type Props = {
  date: ?Date,
  plans: Array<Plan>,
  focus: PlanID,
  paymentType: PaymentSchedule
};

export default class PlanTable extends React.Component<Props> {
  render() {
    const { plans, date, focus, paymentType } = this.props;
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
                const computedStyle = cx({
                  dimmed: focus != null && id !== focus
                });

                return (
                  <td
                    styleName={`plan--${id} plan--info ${computedStyle}`}
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
              {plans.map(({ id, credits: { state } }) => {
                const computedStyle = cx({
                  dimmed: focus != null && id !== focus
                });

                return (
                  <td
                    styleName={`plan--${id} plan--uni ${computedStyle}`}
                    key={`plan--${id}--uni`}
                  >
                    {state === 0 ? (
                      <i className="fa fa-minus" />
                    ) : (
                      <div styleName="stack--hours">
                        <IconUni styleName="icon icon--uni" />
                        {state} Hours
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td styleName="def def--college">Florida College Credit Hours</td>
              {plans.map(({ id, credits: { college } }) => {
                const computedStyle = cx({
                  dimmed: focus != null && id !== focus
                });

                return (
                  <td
                    styleName={`plan--${id} plan--college ${computedStyle}`}
                    key={`plan--${id}--college`}
                  >
                    {college === 0 ? (
                      <i className="fa fa-minus" />
                    ) : (
                      <div styleName="stack--hours">
                        <IconCollege styleName="icon icon--college" />
                        {college} Hours
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td styleName="def def--fees">
                Covers tuition and most fees.{" "}
                <a href="/resources/existing-customers/all-about-fees/">
                  Learn about fees.
                </a>
              </td>
              {plans.map(({ id }) => {
                const computedStyle = cx({
                  dimmed: focus != null && id !== focus
                });

                return (
                  <td
                    styleName={`plan--${id} plan--fees ${computedStyle}`}
                    key={`plan--${id}--fees`}
                  >
                    <i className="fa fa-check" />
                  </td>
                );
              })}
            </tr>
            <tr>
              <td styleName="def def--dorm">
                Option to add a Dormitory Plan
                <Tooltip
                  html={
                    <div className="tip">
                      <p>
                        The 1-year Dormitory Plan covers a standard,
                        double-occupancy, air-conditioned dormitory room at a
                        State University in Florida. The amount covered by this
                        plan can also be used at some fraternity or sorority
                        houses (if those houses are overseen by the State
                        University) or dormitory housing costs at other colleges
                        nationwide. A maximum of four years may be purchased.
                      </p>
                    </div>
                  }
                  position="bottom"
                  trigger="mouseenter"
                  tabIndex="0"
                  arrow
                >
                  <button styleName="info-tooltip">
                    <i className="fa fa-info-circle" />
                  </button>
                </Tooltip>
              </td>
              {plans.map(({ id, dorm }) => {
                const computedStyle = cx({
                  dimmed: focus != null && id !== focus
                });

                return (
                  <td
                    styleName={`plan--${id} plan--dorm ${computedStyle}`}
                    key={`plan--${id}--dorm`}
                  >
                    {dorm ? (
                      <React.Fragment>
                        {!date && <span styleName="starting">Starting at</span>}
                        {`$${DORM.prices[paymentType][pidx].toLocaleString()}`}
                        {paymentType !== "single" && (
                          <span styleName="per"> / month</span>
                        )}
                      </React.Fragment>
                    ) : (
                      <i className="fa fa-minus" />
                    )}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td styleName="def def--cost">
                Projected Actual Cost of College
                <Tooltip
                  html={
                    <div className="tip">
                      <p>
                        This is an estimate of the amount we anticipate to pay
                        for tuition and fees covered by your plan. The estimate
                        is based on current in-state tuition and fees,
                        anticipated inflation and historical usage patterns. The
                        actual benefit (costs paid in the future) may be higher
                        or lower. However, the actual benefit will never be less
                        than the price you pay for a plan - you cannot lose
                        money.
                      </p>
                    </div>
                  }
                  position="bottom"
                  trigger="mouseenter"
                  tabIndex="0"
                  arrow
                >
                  <button styleName="info-tooltip">
                    <i className="fa fa-info-circle" />
                  </button>
                </Tooltip>
              </td>
              {plans.map(({ id, estimatedCost }) => {
                const price = pidx == null ? "–" : estimatedCost[pidx];
                const computedStyle = cx({
                  dimmed: focus != null && id !== focus
                });

                return (
                  <td
                    styleName={`plan--${id} plan--cost ${computedStyle}`}
                    key={`plan--${id}--cost`}
                  >
                    <div styleName="college-price">
                      {date ? (
                        <span styleName="estimate">{`$${price.toLocaleString()}`}</span>
                      ) : (
                        <span>
                          Enter Birthdate
                          <br />
                          to Calculate
                        </span>
                      )}
                    </div>
                    <a
                      href={`https://customeraccess.myfloridaprepaid.com/selectpath.aspx?plan=${id}`}
                      styleName="enroll"
                    >
                      Enroll Online
                    </a>
                    {/* {date && (
                      <a href="" styleName="email">
                        Email Prices
                      </a>
                    )} */}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
