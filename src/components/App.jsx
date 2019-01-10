// @flow strict

import React from "react";
import cx from "classnames";
import { Media } from "react-fns";
import PlanTable from "components/PlanTable";
import PlanCarousel from "components/PlanCarousel";
import BirthdateInput from "components/BirthdateInput";
import BirthdateDisplay from "components/BirthdateDisplay";
import PaymentPlanSelector from "components/PaymentPlanSelector";

import { PLANS } from "util/constants";
import heroImage from "assets/hero.jpg";
import type { PaymentSchedule } from "util/types";
import "./styles/App.css";

type State = {
  date: Date,
  paymentType: PaymentSchedule
};

export default class App extends React.Component<void, State> {
  state = {
    date: null,
    paymentType: "monthly"
  };

  onHasDate(date: Date) {
    this.setState({ date });
  }

  onUpdatePaymentType(paymentType) {
    this.setState({ paymentType });
  }

  render() {
    const { date, paymentType } = this.state;
    const plans = [
      PLANS.get("2C"),
      PLANS.get("4C"),
      PLANS.get("2P"),
      PLANS.get("1U"),
      PLANS.get("4U")
    ];

    const styleName = cx({
      "calculator-app": true,
      "has-date": date !== null
    });

    return (
      <section styleName={styleName}>
        <header>
          <div styleName="header-content">
            {date === null && <img src={heroImage} alt="Mother and baby" />}
            <div styleName="header-copy">
              <h1>Start Saving for College</h1>
              <h2>
                Find the guaranteed Florida Prepaid College Plan that fits your
                budget and enver lose your investment.
              </h2>
            </div>
            {date === null ? (
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
                  plans={plans}
                  paymentType={paymentType}
                />
              ) : (
                <PlanTable />
              )
            }
          </Media.default>
        </div>
      </section>
    );
  }
}
