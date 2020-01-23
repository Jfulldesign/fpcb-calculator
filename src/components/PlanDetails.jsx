// @flow

import React from "react";
import cx from "classnames";
import Modal from "react-modal";
import { Tooltip } from "react-tippy";
import { graduatesIn, priceIndex, formatMoney } from "util/maths";
import { DORM } from "util/constants";
import "./styles/PlanDetails.css";
import type { Plan, PaymentType } from "util/types.flow.js";

import Icon60College from "assets/icon-60-college.svg";
import Icon120College from "assets/icon-120-college.svg";
import Icon6060Vert from "assets/icon-60_60-vert.svg";
import Icon30Uni from "assets/icon-30-uni.svg";
import Icon120Uni from "assets/icon-120-uni.svg";
import IconMortar from "assets/icon-mortarboard-diploma.svg";
import IconMoney from "assets/icon-money.svg";
import IconBed from "assets/icon-bed.svg";

type Props = {
  plan: Plan,
  date: ?Date,
  type: PaymentType
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
    const { plan, date, type } = this.props;
    const { numEmails } = this.state;
    const styleName = cx({
      [`plan--${plan.id}`]: true,
      "plan-details": true
    });

    const creditsIcon = (() => {
      if (plan.credits.college === 0)
        return plan.credits.state === 30 ? <Icon30Uni /> : <Icon120Uni />;
      if (plan.credits.state === 0)
        return plan.credits.college === 60 ? (
          <Icon60College />
        ) : (
          <Icon120College />
        );
      if (plan.credits.state === 60 && plan.credits.college === 60)
        return <Icon6060Vert />;
    })();

    const pidx = date == null ? 0 : priceIndex(date);
    const futurePrice =
      pidx == null ? "–" : `$${plan.estimatedCost[pidx].toLocaleString()}`;

    return (
      <React.Fragment>
        <div styleName={styleName} id="plan-list-container">
          <h4>What does this plan cover?</h4>
          <ol>
            <li>
              {creditsIcon}
              <div>
                {plan.credits.college > 0 && (
                  <span>
                    <strong>{plan.credits.college} credit hours</strong> at a
                    Florida College
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
              <IconMortar />
              <div>
                Covers tuition and most fees.{" "}
                <a href="/existing-customers/fees/">Learn more about fees</a>
              </div>
            </li>
            {plan.dorm && (
              <li>
                <IconBed />
                <div>
                  Option to add a Dormitory Plan {!date && "starting"} at
                  {` ${formatMoney(DORM.prices[type][pidx])}`}
                  {type !== "single" && <span>/month</span>}
                  <Tooltip
                    html={
                      <div className="tip">
                        <p>
                          The 1-year University Dormitory Plan covers a
                          standard, double-occupancy, air-conditioned dormitory
                          room at a State University in Florida. The amount
                          covered by this plan can also be used at some
                          fraternity or sorority houses (if those houses are
                          overseen by the State University) or dormitory housing
                          costs at other colleges nationwide. A maximum of four
                          years may be purchased.
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
              </li>
            )}
            {date != null && (
              <li>
                <IconMoney />
                <div>
                  Estimated Future Savings in {graduatesIn(date)} is{" "}
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
            <a
              href={`https://customeraccess.myfloridaprepaid.com/selectpath.aspx?plan=${
                plan.id
              }`}
              styleName="enroll" className="planenroll_url" id={`planenroll_url-${plan.id}`}
            >
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
                <i className="fas fa-times" />
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
                    <button styleName="remove-email" className="btn-adjuster" onClick={this.removeEmail}>
                      <i className="fa fa-minus-circle" />
                    </button>
                  )}
                </div>
                <button styleName="add-email" className="btn-adjuster" onClick={this.addEmail}>
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
