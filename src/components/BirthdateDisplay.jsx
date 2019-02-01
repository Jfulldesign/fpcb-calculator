// @flow

import React from "react";
import cx from "classnames";
import MaskedInput from "react-text-mask";
import { Media } from "react-fns";
import { Tooltip } from "react-tippy";
import {
  parse,
  format,
  getYear,
  isValid,
  addYears,
  subYears,
  differenceInYears
} from "date-fns";

import { gatedKeyPress } from "util/keyboard";
import {
  describeChild,
  graduatesIn,
  cutoff,
  getAge,
  isValidDate
} from "util/maths";
import "./styles/BirthdateDisplay.css";

type Props = {
  calcDate: Date,
  dispDate: Date,
  onHasDispDate: Date => void,
  onHasCalcDate: Date => void
};

type State = {
  calcDate: Date,
  editActive: boolean,
  dateError: boolean,
  value: ?string
};

export default class BirthdateDisplay extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.addYear = this.addYear.bind(this);
    this.subtractYear = this.subtractYear.bind(this);
    this.onSetDate = this.onSetDate.bind(this);
    this.state = {
      editActive: false,
      calcDate: props.calcDate,
      dateError: false,
      value: format(props.dispDate, "MM/DD/YYYY")
    };
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
        this.props.onHasDispDate(date);
        this.props.onHasCalcDate(date);
      } else if (isValid(date)) {
        this.setState({ value, dateError: true });
      } else {
        this.setState({ value, dateError: false });
      }
    }
  };

  onEdit = () => {
    this.setState({ editActive: true });
  };

  onClose = (event: Event) => {
    event.preventDefault();
    this.setState({ editActive: false });
  };

  onUpdate = () => {
    this.setState({ editActive: false });
  };

  addYear = (event: Event) => {
    event.preventDefault();
    const { calcDate, onHasCalcDate } = this.props;
    onHasCalcDate(subYears(calcDate, 1));
  };

  subtractYear = (event: Event) => {
    event.preventDefault();
    const { calcDate, onHasCalcDate } = this.props;
    onHasCalcDate(addYears(calcDate, 1));
  };

  onSetDate = () => {
    this.props.onHasCalcDate(this.state.calcDate);
    this.setState({ editActive: false });
  };

  render() {
    const { editActive, dateError, value } = this.state;
    const { dispDate, calcDate } = this.props;
    const age = getAge(calcDate);
    const isInSchool = calcDate != null && age >= 4;
    const editStyleName = cx({
      "edit-container": true,
      active: editActive
    });

    return (
      <div styleName="birthdate-display-container">
        <div styleName="birthdate-display">
          <dl>
            <dt>Birthdate</dt>
            <dd>{format(dispDate, "MM/DD/YYYY")}</dd>
          </dl>
          <dl>
            <dt>Child is</dt>
            <dd>{describeChild(calcDate)}</dd>
          </dl>
          <Media.default query="(max-width: 599px)">
            {matches => (
              <button
                styleName="edit"
                onClick={this.onEdit}
                onKeyPress={gatedKeyPress(["Space", "Enter"], this.onEdit)}
              >
                {matches ? "Edit" : "Update My Child’s Information"}
              </button>
            )}
          </Media.default>
          <div styleName={editStyleName}>
            <div styleName="display-edit">
              <button
                styleName="button-close"
                onClick={this.onClose}
                onKeyPress={gatedKeyPress(["Space", "Enter"], this.onClose)}
              >
                <i className="fa fa-times-circle" />
              </button>
              <div styleName="review-dates">
                <Tooltip
                  styleName="date-input-tooltip-container"
                  html={
                    <div className="tip">
                      <p>
                        Prepaid Plans are only available for students in the
                        11th grade or below and children born on, or before,
                        April 30, {getYear(addYears(cutoff, 1))}.
                      </p>
                    </div>
                  }
                  open={dateError}
                  position="top"
                  tabIndex="0"
                  arrow
                >
                  <MaskedInput
                    mask={[
                      /\d/,
                      /\d/,
                      "/",
                      /\d/,
                      /\d/,
                      "/",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/
                    ]}
                    guide={true}
                    pattern="\d*"
                    value={value}
                    placeholder={
                      this.state.active
                        ? ""
                        : "Enter MM/DD/YYYY for payment estimates"
                    }
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    onChange={this.onChange}
                    aria-label="Enter birthdate for payment estimates"
                  />
                </Tooltip>
                <div styleName="grade-adjust">
                  Your child is
                  <span styleName="grade-display">
                    {describeChild(calcDate)}
                    <Tooltip
                      html={
                        <div className="tip">
                          <h6>Why is this important?</h6>
                          <p>
                            Your child&apos;s grade predicts the year they will
                            graduate and begin using their Florida Prepaid Plan.
                            The beneficiary has up to 10 years following
                            graduation to use a Florida Prepaid Plan. You may
                            enroll any Florida resident with a valid Social
                            Security number, age newborn through 11th grade, in
                            a Prepaid Plan.
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
                  </span>
                  <div styleName="grade-adjust-buttons">
                    <button
                      disabled={
                        differenceInYears(dispDate, calcDate) < 0 ||
                        !isInSchool ||
                        age <= 4
                      }
                      onClick={this.subtractYear}
                      onKeyPress={gatedKeyPress(
                        ["Space", "Enter"],
                        this.subtractYear
                      )}
                    >
                      <i className="fa fa-minus-circle" />
                    </button>
                    <button
                      disabled={
                        differenceInYears(dispDate, calcDate) > 0 ||
                        !isInSchool ||
                        age >= 17
                      }
                      onClick={this.addYear}
                      onKeyPress={gatedKeyPress(
                        ["Space", "Enter"],
                        this.addYear
                      )}
                    >
                      <i className="fa fa-plus-circle" />
                    </button>
                  </div>
                </div>
                <div styleName="graduation-estimate">
                  We project your child will graduate in
                  <span styleName="graduation-display">
                    {graduatesIn(calcDate)}
                    <Tooltip
                      html={
                        <div className="tip">
                          <h6>Why is this important?</h6>
                          <p>
                            Your child&apos;s birthdate predicts the year they
                            will graduate and begin using their Florida Prepaid
                            Plan, based on child’s age/grade on or before{" "}
                            {format(cutoff, "MMMM D, YYYY")}. The date entered
                            must be today or earlier.
                          </p>
                        </div>
                      }
                      position="top"
                      trigger="mouseenter"
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
                  Update My Child’s Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
