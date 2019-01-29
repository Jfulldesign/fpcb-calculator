// @flow

import React from "react";
import cx from "classnames";
import Modal from "react-modal";
import { Tooltip } from "react-tippy";
import { graduatesIn, priceIndex } from "util/maths";
import "./styles/PlanDetails.css";
import type { Plan } from "util/types.flow.js";

import icon60College from "assets/icon-60-college.png";
import icon120College from "assets/icon-120-college.png";
import icon6060Vert from "assets/icon-60+60-vert.png";
import icon30Uni from "assets/icon-30-uni.png";
import icon120Uni from "assets/icon-120-uni.png";
import iconMortar from "assets/icon-mortarboard-diploma.png";
import iconMoney from "assets/icon-money.png";
import iconBed from "assets/icon-bed.png";

type Props = {
  plan: Plan,
  date: ?Date
};

type State = {
  modalAcitve: boolean,
  numEmails: number
};

export default class PlanDetails extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    Modal.setAppElement(".hook--calculators");
    this.state = { modalAcitve: false, numEmails: 1 };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addEmail = this.addEmail.bind(this);
    this.removeEmail = this.removeEmail.bind(this);
  }

  openModal = () => {
    this.setState({ modalAcitve: true });
  };

  closeModal = () => {
    this.setState({ modalAcitve: false });
  };

  addEmail = (event: Event) => {
    event.preventDefault();
    this.setState({ numEmails: this.state.numEmails + 1 });
  };

  removeEmail = (event: Event) => {
    event.preventDefault();
    this.setState({ numEmails: this.state.numEmails - 1 });
  };

  render() {
    const { plan, date } = this.props;
    const { numEmails } = this.state;
    const styleName = cx({
      [`plan--${plan.id}`]: true,
      "plan-details": true
    });

    const creditsIcon = (() => {
      if (plan.credits.college === 0)
        return plan.credits.state === 30 ? icon30Uni : icon120Uni;
      if (plan.credits.state === 0)
        return plan.credits.college === 60 ? icon60College : icon120College;
      if (plan.credits.state === 60 && plan.credits.college === 60)
        return icon6060Vert;
    })();

    const pidx = date == null ? 0 : priceIndex(date);
    const futurePrice = pidx == null ? "–" : plan.estimatedCost[pidx];

    return (
      <React.Fragment>
        <div styleName={styleName}>
          <h4>What does this plan cover?</h4>
          <ol>
            <li>
              <img src={creditsIcon} alt="Icon for school credits." />
              <div>
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
                    <strong>{plan.credits.state} semester credit hours</strong>{" "}
                    at a State University.
                  </span>
                )}
              </div>
            </li>
            <li>
              <img src={iconMortar} alt="Icon of mortarboard and diploma." />
              <div>
                Covers tuition and most fees.{" "}
                <a href="/resources/existing-customers/all-about-fees/">
                  Learn more about fees
                </a>
                .
              </div>
            </li>
            {plan.dorm && (
              <li>
                <img src={iconBed} alt="Icon of bed." />
                <div>
                  Option to add a Dormitory Plan starting at $47.89/month.
                  <Tooltip
                    html={
                      <div className="tip">
                        <p>
                          The 1-year Dormitory Plan covers a standard,
                          double-occupancy, air-conditioned dormitory room at a
                          State University in Florida. The amount covered by
                          this plan can also be used at some fraternity or
                          sorority houses (if those houses are overseen by the
                          State University) or dormitory housing costs at other
                          colleges nationwide. A maximum of four years may be
                          purchased.
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
                </div>
              </li>
            )}
            {date != null && (
              <li>
                <img src={iconMoney} alt="Icon of money." />
                <div>
                  Projected Actual Cost of College in {graduatesIn(date)} is{" "}
                  {futurePrice}
                  <Tooltip
                    html={
                      <div className="tip">
                        <p>
                          This is an estimate of the amount we anticipate to pay
                          for tuition and fees covered by your plan. The
                          estimate is based on current in-state tuition and
                          fees, anticipated inflation and historical usage
                          patterns. The actual benefit (costs paid in the
                          future) may be higher or lower. However, the actual
                          benefit will never be less than the price you pay for
                          a plan - you cannot lose money.
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
                </div>
              </li>
            )}
          </ol>
          <div styleName="links">
            <a href="#" styleName="enroll">
              Enroll Online
            </a>
            {/* {date !== null && (
              <a href="#" styleName="email" onClick={this.openModal}>
                Email Prices
              </a>
            )} */}
            <Modal
              styleName="modal"
              isOpen={this.state.modalAcitve}
              onRequestClose={this.closeModal}
              contentLabel="Email My Prices"
            >
              <h2>Send me a copy</h2>
              <h3>Lorem ispum dolor sit amet.</h3>
              <button onClick={this.closeModal} styleName="button-close">
                <i className="fa fa-times" />
              </button>
              <form>
                <div styleName="emails">
                  {[...Array(numEmails)].map((_, idx) => (
                    <input
                      type="email"
                      key={`email--${idx}`}
                      name={`email--${idx}`}
                      placeholder="Email Address"
                    />
                  ))}
                  {numEmails > 1 && (
                    <button styleName="remove-email" onClick={this.removeEmail}>
                      <i className="fa fa-minus-circle" />
                    </button>
                  )}
                </div>
                <button styleName="add-email" onClick={this.addEmail}>
                  Send a copy to another address
                  <i className="fa fa-plus-circle" />
                </button>
                <div styleName="optin">
                  <input type="checkbox" id="join-mailing-list" />
                  <label htmlFor="join-mailing-list">
                    I would like to join the mailing list.
                  </label>
                </div>
                <button type="submit">Send My Results</button>
              </form>
            </Modal>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
