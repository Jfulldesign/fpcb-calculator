// @flow

import React from "react";
import cx from "classnames";
import MaskedInput from "react-maskedinput";
import { Tooltip } from "react-tippy";
import { parse, format, addYears, subYears, isValid, getYear } from "date-fns";
import { gatedKeyPress } from "util/keyboard";
import {
  describeChild,
  graduatesIn,
  isValidDate,
  getAge,
  cutoff
} from "util/maths";
import "./styles/BirthdateInput.css";

type Props = {
  onHasCalcDate: Date => void,
  onHasDispDate: Date => void
};

type State = {
  active: boolean,
  expand: boolean,
  value: ?string,
  date: ?Date,
  didx: number,
  dateError: boolean
};

export default class BirthdateInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      active: false,
      expand: false,
      value: null,
      date: null,
      didx: 0,
      dateError: false
    };

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addYear = this.addYear.bind(this);
    this.subtractYear = this.subtractYear.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSetDate = this.onSetDate.bind(this);
  }

  onBlur = () => {
    this.setState({ active: false });
  };

  onFocus = () => {
    this.setState({ active: true });
  };

  onChange = (event: Event) => {
    const target = event.currentTarget;
    if (target instanceof HTMLInputElement) {
      const value = target.value;
      const date = parse(value);

      if (isValidDate(date)) {
        this.setState({ date, value, dateError: false });
        this.props.onHasCalcDate(date);
      } else if (isValid(date)) {
        this.setState({ value, dateError: true });
      } else {
        this.setState({ value, dateError: false });
      }
    }
  };

  addYear = (event: Event) => {
    const { date, didx } = this.state;
    event.preventDefault();
    this.setState({ date: subYears(date, 1), didx: didx + 1 });
  };

  subtractYear = (event: Event) => {
    const { date, didx } = this.state;
    event.preventDefault();
    this.setState({ date: addYears(date, 1), didx: didx - 1 });
  };

  onSubmit = (event: Event) => {
    event.preventDefault();
    this.setState({ expand: true });
  };

  onSetDate = (event: Event) => {
    event.preventDefault();
    const { date, didx } = this.state;
    if (date) {
      this.props.onHasCalcDate(date);
      this.props.onHasDispDate(addYears(date, didx));
    }
  };

  render() {
    const { value, didx, date, expand, dateError } = this.state;
    const age = getAge(date);
    const isInSchool = date != null && age >= 4;
    const styleName = cx({
      active: this.state.active,
      "birthdate-input": true
    });

    return (
      <form styleName={styleName}>
        <span>Your Child&apos;s Birthdate</span>
        <Tooltip
          styleName="date-input-tooltip-container"
          html={
            <div className="tip">
              <p>
                Prepaid Plans are only available for students in the 11th grade
                or below and children born on, or before, April 30,{" "}
                {getYear(addYears(cutoff, 1))}.
              </p>
            </div>
          }
          open={dateError}
          position="top"
          tabIndex="0"
          arrow
        >
          <input
            type="date"
            value={this.state.value}
            placeholder={
              this.state.active ? "MM/DD/YYYY" : "Enter MM/DD/YYYY for payment estimates"
            }
            onFocus={this.onFocus}
            onChange={this.onChange}
            aria-label="Enter birthdate for payment estimates"
          />
        </Tooltip>
        {expand === false ? (
          <div styleName="button-container">
            <button
              disabled={!isValidDate(new Date(value))}
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
                        Your child&apos;s age and grade predicts the year they will
                        graduate high school and begin using their Florida Prepaid Plan. The
                        beneficiary has up to 10 years following high school graduation to
                        use a Florida Prepaid Plan. You may enroll any Florida
                        resident with a valid Social Security number, age
                        newborn through 11th grade, in a Prepaid Plan. For newborns, the
                        Social Security Number is not required when the Application is submitted,
                        but it must be provided shortly thereafter.
                      </p>
                    </div>
                  }
                  position="bottom"
                  trigger="mouseenter"
                  tabIndex="0"
                  arrow
                >
                  <button type="button" styleName="info-tooltip">
                    <i className="fa fa-info-circle" />
                  </button>
                </Tooltip>
              </span>
              <div styleName="grade-adjust-buttons">
                <button
                  disabled={didx <= -1 || !isInSchool || age <= 4}
                  onClick={this.subtractYear}
                  onKeyPress={gatedKeyPress(
                    ["Space", "Enter"],
                    this.subtractYear
                  )}
                >
                  <i className="fa fa-minus-circle" />
                  Subtract Year
                </button>
                <button
                  disabled={didx >= 1 || !isInSchool || age >= 16}
                  onClick={this.addYear}
                  onKeyPress={gatedKeyPress(["Space", "Enter"], this.addYear)}
                >
                  <i className="fa fa-plus-circle" />
                  Add Year
                </button>
              </div>
            </div>
            <div styleName="graduation-estimate">
              Your child will graduate in
              <span styleName="graduation-display">
                {graduatesIn(date)}
                <Tooltip
                  html={
                    <div className="tip">
                      <h6>Why is this important?</h6>
                      <p>
                        Your child&apos;s birthdate predicts the year they will
                        graduate high school and begin using their Florida Prepaid Plan,
                        based on child’s age/grade on or before{" "}
                        {` ${format(cutoff, "MMMM D, YYYY")}`}. The date entered
                        must be today or earlier.
                      </p>
                    </div>
                  }
                  position="top"
                  trigger="mouseenter"
                  tabIndex="0"
                  arrow
                >
                  <button type="button" styleName="info-tooltip">
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
      </form>
    );
  }
}
