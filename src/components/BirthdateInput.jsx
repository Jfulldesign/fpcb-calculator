// @flow strict

import React from "react";
import cx from "classnames";
import Tooltip from "rc-tooltip";
import MaskedInput from "react-text-mask";
import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";
import { withUrlState } from "with-url-state";
import { parse, addYears, subYears } from "date-fns";
import { describeChild, graduatesIn } from "util/maths";
import "./styles/BirthdateInput.css";

const autoCorrectedDatePipe = createAutoCorrectedDatePipe("mm/dd/yy");

type Props = {
  onHasDate: Date => void,
  setUrlState: () => void,
  urlState: {
    birthdate?: string
  }
};

type State = {
  active: boolean,
  value: string,
  date: ?Date
};

class BirthdateInput extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      active: props.urlState.birthdate != "",
      value: props.urlState.birthdate || "",
      date: null
    };
  }

  onFocus() {
    this.setState({
      active: true
    });
  }

  onChange(event) {
    this.setState({ value: event.currentTarget.value });
  }

  onSubmit() {
    this.props.setUrlState({ birthdate: this.state.value });
    this.setState({ date: parse(this.state.value) });
  }

  addYear() {
    this.setState({ date: subYears(this.state.date, 1) });
  }

  subtractYear() {
    this.setState({ date: addYears(this.state.date, 1) });
  }

  render() {
    const { date } = this.state;
    const styleName = cx({
      active: this.state.active,
      "birthdate-input": true
    });

    return (
      <div styleName={styleName}>
        <span>Your Child&apos;s Birthdate</span>
        <MaskedInput
          mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/]}
          pipe={autoCorrectedDatePipe}
          guide={true}
          pattern="\d*"
          value={this.state.value}
          disabled={date !== null}
          keepCharPositions={true}
          placeholder={
            this.state.active ? "" : "Enter MM/DD/YY for payment estimates"
          }
          onFocus={this.onFocus.bind(this)}
          onChange={this.onChange.bind(this)}
        />
        {date === null ? (
          <div styleName="button-container">
            <button onClick={this.onSubmit.bind(this)}>
              Start Calculating
            </button>
          </div>
        ) : (
          <div styleName="review-dates">
            <div styleName="grade-adjust">
              Your child is
              <span styleName="grade-display">
                {describeChild(date)}
                <Tooltip
                  placement="top"
                  trigger={["hover"]}
                  overlay={
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptates quae voluptatum sunt culpa fugit saepe esse
                      odio molestias officia delectus, doloribus fugiat atque
                      ipsam quam nulla, porro animi cupiditate doloremque.
                    </span>
                  }
                >
                  <button styleName="info-tooltip">Info</button>
                </Tooltip>
              </span>
              <div styleName="grade-adjust-buttons">
                <button onClick={this.subtractYear.bind(this)}>
                  Subtract Year
                </button>
                <button onClick={this.addYear.bind(this)}>Add Year</button>
              </div>
            </div>
            <div styleName="graduation-estimate">
              We project your child will graduate in
              <span styleName="graduation-display">
                {graduatesIn(date)}
                <Tooltip
                  placement="top"
                  trigger={["hover"]}
                  overlay={
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptates quae voluptatum sunt culpa fugit saepe esse
                      odio molestias officia delectus, doloribus fugiat atque
                      ipsam quam nulla, porro animi cupiditate doloremque.
                    </span>
                  }
                >
                  <button>Info</button>
                </Tooltip>
              </span>
            </div>
            <button
              onClick={() => {
                this.props.onHasDate(this.state.date);
              }}
            >
              Show My Rates
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default withUrlState(() => ({ birthdate: null }))(BirthdateInput);
