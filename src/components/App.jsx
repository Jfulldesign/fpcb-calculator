// @flow

import React from "react";
import cx from "classnames";
import { Media } from "react-fns";
import PlanTable from "components/PlanTable";
import PlanCarousel from "components/PlanCarousel";
import BirthdateInput from "components/BirthdateInput";
import BirthdateDisplay from "components/BirthdateDisplay";
import PaymentPlanSelector from "components/PaymentPlanSelector";

import { PFX } from "config";
import { PLANS } from "util/constants";
import heroImage from "assets/hero.jpg";
import type { PaymentSchedule } from "util/types.flow.js";
import "./styles/App.css";

type State = {
  date: ?Date,
  paymentType: PaymentSchedule
};

export default class App extends React.Component<{}, State> {
  state = {
    date: null,
    paymentType: "monthly"
  };

  onHasDate(date: Date) {
    this.setState({ date });
  }

  onUpdatePaymentType(paymentType: PaymentSchedule) {
    this.setState({ paymentType });
  }

  render() {
    const { date, paymentType } = this.state;
    const plans = [
      PLANS.get("C2"),
      PLANS.get("C4"),
      PLANS.get("P2"),
      PLANS.get("U1"),
      PLANS.get("U4")
    ];

    const styleName = cx({
      "calculator-app": true,
      "has-date": date !== null
    });

    return (
      <section styleName={styleName}>
        <header>
          <div styleName="header-content">
            <img src={`${PFX}${heroImage}`} alt="Mother and baby" />
            <div styleName="header-copy">
              <h1>Start Saving for College</h1>
              <h2>
                Find the guaranteed Florida Prepaid College Plan that fits your
                budget and enver lose your investment.
              </h2>
            </div>
            {date == null ? (
              <BirthdateInput onHasDate={this.onHasDate.bind(this)} />
            ) : (
              <React.Fragment>
                <BirthdateDisplay
                  date={date}
                  onEdit={this.onHasDate.bind(this)}
                />
                <PaymentPlanSelector
                  date={date}
                  onSelectionChange={this.onUpdatePaymentType.bind(this)}
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
                  date={date}
                  // We know all these plans exist because Flow would complain
                  // if we didn't use a valid key above while we're building the
                  // array.
                  // $FlowFixMe
                  plans={plans}
                  paymentType={paymentType}
                />
              ) : (
                <PlanTable
                  date={date}
                  // $FlowFixMe
                  plans={plans}
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
