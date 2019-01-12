// @flow

import React from "react";
import cx from "classnames";
import MaskedInput from "react-text-mask";
import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";
import { Tooltip } from "react-tippy";
import { withUrlState } from "with-url-state";
import { parse, addYears, subYears } from "date-fns";
import { gatedKeyPress } from "util/keyboard";
import { describeChild, graduatesIn } from "util/maths";
import "./styles/BirthdateInput.css";

const autoCorrectedDatePipe = createAutoCorrectedDatePipe("mm/dd/yyyy");

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

  onFocus: () => void;
  onFocus() {
    this.setState({
      active: true
    });
  }

  onChange: () => void;
  onChange(event) {
    this.setState({ value: event.currentTarget.value });
  }

  addYear: () => void;
  addYear() {
    this.setState({ date: subYears(this.state.date, 1) });
  }

  subtractYear: () => void;
  subtractYear() {
    this.setState({ date: addYears(this.state.date, 1) });
  }

  onSubmit: () => void;
  onSubmit() {
    // this.props.setUrlState({ birthdate: this.state.value });
    this.setState({ date: parse(this.state.value) });
  }

  onSetDate: () => void;
  onSetDate() {
    if (this.state.date) this.props.onHasDate(this.state.date);
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
          mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
          pipe={autoCorrectedDatePipe}
          guide={true}
          pattern="\d*"
          value={this.state.value}
          disabled={date !== null}
          placeholder={
            this.state.active ? "" : "Enter MM/DD/YYYY for payment estimates"
          }
          onFocus={this.onFocus}
          onChange={this.onChange}
        />
        {date == null ? (
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
                  html={
                    <div className="tip">
                      <h6>Why is this important?</h6>
                      <p>
                        Your child&apos;s grade predicts the year they will
                        graduate and begin using their Florida Prepaid Plan. The
                        beneficiary has up to 10 years following graduation to
                        use a Florida Prepaid Plan.
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
              </span>
              <div styleName="grade-adjust-buttons">
                <button
                  onClick={this.subtractYear}
                  onKeyPress={gatedKeyPress(
                    ["Space", "Enter"],
                    this.subtractYear
                  )}
                >
                  <i className="fa fa-minus-circle" />
                </button>
                <button
                  onClick={this.addYear}
                  onKeyPress={gatedKeyPress(["Space", "Enter"], this.addYear)}
                >
                  <i className="fa fa-plus-circle" />
                </button>
              </div>
            </div>
            <div styleName="graduation-estimate">
              We project your child will graduate in
              <span styleName="graduation-display">
                {graduatesIn(date)}
                <Tooltip
                  html={
                    <div className="tip">
                      <h6>Why is this important?</h6>
                      <p>
                        Your child&apos;s birthdate predicts the year they will
                        graduate and begin using their Florida Prepaid Plan. The
                        date entered must be today or earlier.
                      </p>
                    </div>
                  }
                  position="top"
                  trigger="click"
                  tabIndex="0"
                  arrow
                >
                  <button styleName="info-tooltip">
                    <i className="fa fa-info-circle" />
                  </button>
                </Tooltip>
              </span>
            </div>
            <button
              styleName="button-submit"
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
