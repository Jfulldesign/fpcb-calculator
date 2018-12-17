// @flow strict

import React from "react";
import BirthdateInput from "components/BirthdateInput";
import BirthdateDisplay from "components/BirthdateDisplay";
import PaymentPlanSelector from "components/PaymentPlanSelector";
import PlanCarousel from "components/PlanCarousel";
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
    return (
      <section styleName="calculator-app">
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
        <PlanCarousel date={date} paymentType={paymentType} />
        <footer>
          <h3>Where can Florida Prepaid Plans be used?</h3>
          <h6>University vs. College Credits</h6>
          <p>
            Our plans include a set number of credit hours configured for either
            a Florida State College or University. What does that mean for each
            plan?
          </p>
          <ul>
            <li>
              <h6>College Credit Hours</h6>
              <p>
                Our College plans are configured to suit Florida&apos;s
                impressive 28 State Colleges. Any student earning an
                Associate&apos;s Degree from a State College is guaranteed
                admission to one of Florida&apos;s 12 Universities.
              </p>
            </li>
            <li>
              <h6>University Credit Hours</h6>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Perspiciatis, quibusdam. Iste numquam nam, magni soluta est
                maxime autem laborum! Dolore veritatis saepe at earum eos iste
                vitae explicabo eius pariatur?
              </p>
            </li>
          </ul>
        </footer>
      </section>
    );
  }
}
