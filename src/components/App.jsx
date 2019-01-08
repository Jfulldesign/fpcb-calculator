// @flow strict

import React from "react";
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

  onEdit() {
    this.setState({ date: null });
  }

  onReset() {
    this.setState({ date: null });
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

    return (
      <section styleName="calculator-app">
        <header>
          <div styleName="header-content">
            <img src={heroImage} />
            <div className="header-copy">
              <h1>Florida Prepaid College Plans</h1>
              <h2>
                Start saving for college with a plan that fits your budget.
              </h2>
            </div>
            {date === null ? (
              <BirthdateInput onHasDate={this.onHasDate.bind(this)} />
            ) : (
              <React.Fragment>
                <BirthdateDisplay
                  date={date}
                  onEdit={this.onEdit.bind(this)}
                  onReset={this.onReset.bind(this)}
                />
                <PaymentPlanSelector
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
