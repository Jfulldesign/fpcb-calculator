// @flow strict

import React from "react";
import cx from "classnames";
import MaskedInput from "react-text-mask";
import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";
import { Tooltip } from "react-tippy";
import { withUrlState } from "with-url-state";
import { parse, addYears, subYears } from "date-fns";
import { gatedKeyPress } from "util/keypress";
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

    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addYear = this.addYear.bind(this);
    this.subtractYear = this.subtractYear.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSetDate = this.onSetDate.bind(this);
  }

  onFocus() {
    this.setState({
      active: true
    });
  }

  onChange(event) {
    this.setState({ value: event.currentTarget.value });
  }

  addYear() {
    this.setState({ date: subYears(this.state.date, 1) });
  }

  subtractYear() {
    this.setState({ date: addYears(this.state.date, 1) });
  }

  onSubmit() {
    this.props.setUrlState({ birthdate: this.state.value });
    this.setState({ date: parse(this.state.value) });
  }

  onSetDate() {
    this.props.onHasDate(this.state.date);
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
          onFocus={this.onFocus}
          onChange={this.onChange}
        />
        {date === null ? (
          <div styleName="button-container">
            <button
              onClick={this.onSubmit}
              onKeyPress={gatedKeyPress(["Space", "Enter"], this.onSubmit)}
            >
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
                  title="Hello World!"
                  position="top"
                  trigger="click"
                  tabIndex="0"
                  arrow
                >
                  <button styleName="info-tooltip">Info</button>
                </Tooltip>
              </span>
              <div styleName="grade-adjust-buttons">
                <button
                  onClick={this.subtractYear}
                  onKeyPress={gatedKeyPress(
                    ["Space", "Enter"],
                    this.subtractYear
                  )}
                >
                  Subtract Year
                </button>
                <button
                  onClick={this.addYear}
                  onKeyPress={gatedKeyPress(["Space", "Enter"], this.addYear)}
                >
                  Add Year
                </button>
              </div>
            </div>
            <div styleName="graduation-estimate">
              We project your child will graduate in
              <span styleName="graduation-display">
                {graduatesIn(date)}
                <Tooltip
                  title="Hello World!"
                  position="top"
                  trigger="click"
                  tabIndex="0"
                  arrow
                >
                  <button styleName="info-tooltip">Info</button>
                </Tooltip>
              </span>
            </div>
            <button
              onClick={this.onSetDate}
              onKeyPress={gatedKeyPress(["Space", "Enter"], this.onSetDate)}
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
