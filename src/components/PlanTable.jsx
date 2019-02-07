// @flow

import React from "react";
import cx from "classnames";
import ScrollHint from "scroll-hint";
import { Tooltip } from "react-tippy";
import { priceIndex, graduatesIn, formatMoney } from "util/maths";
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
  componentDidMount() {
    new ScrollHint(".js-scrollable", { suggestiveShadow: true });
  }
  handleClick = () => {
    document.getElementById('date_entry').focus();
  }
  render() {
    const { plans, date, focus, paymentType } = this.props;
    const pidx = date == null ? 0 : priceIndex(date);

    return (
      <div styleName="plan-table" className="js-scrollable">
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
                      <h3 data-hj-whitelist>{title}</h3>
                      <p>{description}</p>
                      <div styleName="price" data-hj-whitelist>
                        {!date && <span styleName="starting">Starting at</span>}
                        {formatMoney(price)}
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
                      <div styleName="stack--hours" data-hj-whitelist>
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
                      <div styleName="stack--hours" data-hj-whitelist>
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
                <a href="/existing-customers/fees/">Learn about fees.</a>
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
                Option to add a Dormitory Plan.{" "}
                <a href="/prepaid-plans/faqs/#dormitory-specific-questions">
                  Learn more.
                </a>
                <Tooltip
                  html={
                    <div className="tip">
                      <p>
                        The 1-year University Dormitory Plan covers a standard,
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
                    key={`plan--${id}--dorm`} data-hj-whitelist
                  >
                    {dorm ? (
                      <React.Fragment>
                        {!date && <span styleName="starting">Starting at</span>}
                        {formatMoney(DORM.prices[paymentType][pidx])}
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
              <td styleName={`def def--cost`} data-hj-whitelist>Estimated future benefit
              {date ? <span> beginning in {graduatesIn(date)}.</span> : null}
                
              <Tooltip html={
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
              
              {plans.map(({ id, estimatedCost }, index) => {
                const price = pidx == null ? "–" : estimatedCost[pidx];
                const computedStyle = cx({
                  dimmed: focus != null && id !== focus
                });
                
                return date ? (
                  <td
                    styleName={`plan--${id} plan--cost ${computedStyle}`}
                    key={`plan--${id}--cost`} data-hj-whitelist
                  >
                    <div styleName="college-price" data-hj-whitelist>
                      <span styleName="estimate" data-hj-whitelist>{`$${price.toLocaleString()}`}</span>
                    </div>
                  </td>
                ) : [ 
                  (index == 0 ? 
                   (
                  <td colSpan="5"
                    styleName={`plan--cost`}
                    key={`plan--cost`}
                  >
                    <div styleName="college-price clickable" onClick={this.handleClick}>
                      <span>
                        Enter Your Child's Birthdate to Calculate
                      </span>
                    </div>
                  </td>
                ) : null)];
              })}
              </tr>
            <tr>
              <td styleName="def def--cost">&nbsp;</td>
                
              {plans.map(({ id, estimatedCost }) => {
                const price = pidx == null ? "–" : estimatedCost[pidx];
                const computedStyle = cx({
                  dimmed: focus != null && id !== focus
                });
                
                return date ? (
                  <td 
                    styleName={`plan--${id} plan--enroll ${computedStyle}`}
                    key={`plan--${id}--enroll`}
                  >
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
                ) : (
                  <td
                  styleName={`plan--${id} plan--enroll ${computedStyle}`}
                  key={`plan--${id}--enroll`}
                >
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
