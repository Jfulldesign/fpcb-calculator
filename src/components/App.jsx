// @flow

import React from "react";
import cx from "classnames";
import qs from "query-string";
import { Media } from "react-fns";
import PlanTable from "components/PlanTable";
import PlanCarousel from "components/PlanCarousel";
import BirthdateInput from "components/BirthdateInput";
import BirthdateDisplay from "components/BirthdateDisplay";
import PaymentPlanSelector from "components/PaymentPlanSelector";

import { PLANS } from "util/constants";
import heroImage from "assets/hero.jpg";
import type { PaymentSchedule, PlanID } from "util/types.flow.js";
import "./styles/App.css";

type State = {
  dispDate: ?Date,
  calcDate: ?Date,
  focus: ?PlanID,
  paymentType: PaymentSchedule
};

const query = qs.parse(window.location.search);

export default class App extends React.Component<{}, State> {
  state = {
    dispDate: null,
    calcDate: null,
    focus: query.focus,
    paymentType: "monthly"
  };

  constructor(props: Props) {
    super(props);

    this.onHasDispDate = this.onHasDispDate.bind(this);
    this.onHasCalcDate = this.onHasCalcDate.bind(this);
    this.onUpdatePaymentType = this.onUpdatePaymentType.bind(this);
  }

  onHasCalcDate(calcDate: Date) {
    console.log(calcDate)
    this.setState({ calcDate });
  }

  onHasDispDate(dispDate: Date) {
    this.setState({ dispDate });
  }

  onUpdatePaymentType(paymentType: PaymentSchedule) {
    this.setState({ paymentType });
  }

  render() {
    const { calcDate, dispDate, focus, paymentType } = this.state;
    const plans = [
      PLANS.get("C2"),
      PLANS.get("C4"),
      PLANS.get("P2"),
      PLANS.get("U1"),
      PLANS.get("U4")
    ];

    const styleName = cx({
      "calculator-app": true,
      "has-date": calcDate != null
    });

    return (
      <section styleName={styleName}>
        <header>
          <div styleName="header-content">
            <img src={heroImage} alt="Mother and baby" />
            <div styleName="header-copy">
              <h1>Start Saving for College</h1>
              <h2>
                Find the guaranteed Florida Prepaid College Plan that fits your
                budget and never lose your investment.
              </h2>
            </div>
            {dispDate == null ? (
              <BirthdateInput
                onHasCalcDate={this.onHasCalcDate}
                onHasDispDate={this.onHasDispDate}
              />
            ) : (
              <React.Fragment>
                <BirthdateDisplay
                  calcDate={calcDate}
                  dispDate={dispDate}
                  onHasDispDate={this.onHasDispDate}
                  onHasCalcDate={this.onHasCalcDate}
                />
                <PaymentPlanSelector
                  date={calcDate}
                  onSelectionChange={this.onUpdatePaymentType}
                />
              </React.Fragment>
            )}
          </div>
        </header>
        <div className="plans">
          <Media.default query="(max-width: 599px)">
            {matches =>
              matches ? (
                <PlanCarousel
                  date={calcDate}
                  // We know all these plans exist because Flow would complain
                  // if we didn't use a valid key above while we're building the
                  // array.
                  // $FlowFixMe
                  plans={plans}
                  focus={focus}
                  paymentType={paymentType}
                />
              ) : (
                <PlanTable
                  date={calcDate}
                  // $FlowFixMe
                  plans={plans}
                  focus={focus}
                  paymentType={paymentType}
                />
              )
            }
          </Media.default>
        </div>
      </section>
    );
  }
}
