// @flow

import React from "react";
import cx from "classnames";
import MaskedInput from "react-text-mask";
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { PAYMENT_COUNT } from "util/constants";
import type { PaymentSchedule } from "util/types.flow.js";
import { priceIndex } from "util/maths";
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

const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy',{minYear:1970, maxYear:2099});

// Safari 3.0+ "[object HTMLElementConstructor]"
let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
let isIE = /*@cc_on!@*/false || !!document.documentMode;

type Props = {
  calcDate: Date,
  dispDate: Date,
  onHasDispDate: Date => void,
  onHasCalcDate: Date => void,
  paymentType: PaymentSchedule
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
    if(isSafari || isIE){
      this.state = {
        editActive: false,
        calcDate: props.calcDate,
        dateError: false,
        value: format(props.dispDate, "MM/DD/YYYY")
        // value: format(props.dispDate, "YYYY-MM-DD")
      };
    } else {
      this.state = {
        editActive: false,
        calcDate: props.calcDate,
        dateError: false,
        // value: format(props.dispDate, "MM/DD/YYYY")
        value: format(props.dispDate, "YYYY-MM-DD")
      };
    }


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
    this.setState({ editActive: false });
  };

  render() {
    const { editActive, dateError, value, paymentType } = this.state;
    const { dispDate, calcDate } = this.props;
    const age = getAge(calcDate);
    const isInSchool = calcDate != null && age >= 4;
    const editStyleName = cx({
      "edit-container": true,
      active: editActive
    });
    setTimeout(function(){
      window.resetListeners();

    }, 250);

    if(!isIE && !isSafari){
    return (
      <div styleName="birthdate-display-container">
        <div styleName="birthdate-display">
          <div styleName="birthdate-result-container">
            <dl>
              <dt>Birthdate</dt>
              <dd id="dob">{format(dispDate, "MM/DD/YYYY")}</dd>
            </dl>
            <dl>
              <dt>Child is</dt>
              <dd id="graduation-display">{describeChild(calcDate)}</dd>
            </dl>
          </div>
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
                <i className="fas fa-times" />
              </button>
              <div styleName="review-dates">
              <span className="update-info">Edit my child's information:</span>
                <Tooltip
                  styleName="date-input-tooltip-container"
                  html={
                    <div className="tip">
                      <p>
                        Prepaid Plans are only available for students in the
                        11th grade or below and children born on or before today's date.
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
                    // value={value}
                    value={this.state.value}
                    // value={this.state.value ? this.state.value : ""}
                    // value={this.state.value ? format(this.state.value, 'YYYY-MM-DD') : ""}
                    placeholder={
                      this.state.active ? "MM/DD/YYYY" : "MM/DD/YYYY"
                    }
                    onFocus={this.onFocus}
                    onChange={this.onChange}
                    aria-label="Enter your child's birthdate for plan prices"
                    id="date_entry"
                    data-hj-whitelist
                    className="updater"
                    max={new Date().toISOString().split("T")[0]}
                    min="1970-01-01"
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

                {isInSchool  &&
                  <div styleName="grade-adjust-buttons">
                    <button
                      className="btn-adjuster"
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
                      className="btn-adjuster"
                      disabled={
                        differenceInYears(dispDate, calcDate) > 0 ||
                        !isInSchool ||
                        age >= 16
                      }
                      onClick={this.addYear}
                      onKeyPress={gatedKeyPress(
                        ["Space", "Enter"],
                        this.addYear
                      )}
                    >
                      <i className="fa fa-plus-circle" />
                    </button>
                  </div>}
                </div>
                <div styleName="graduation-estimate">
                  Your child will graduate in
                  <span styleName="graduation-display">
                    {graduatesIn(calcDate)}
                    <Tooltip
                      html={
                        <div className="tip">
                          <h6>Why is this important?</h6>
                          <p>
                            Your child&apos;s birthdate predicts the year they
                            will graduate high school and begin using their Florida Prepaid
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
                  className="activator activator-update"
                  id="update-info-2"
                  checked={paymentType === "monthly"}
                >
                  Update My Child’s Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    } else {
      return(
      <div styleName="birthdate-display-container">
        <div styleName="birthdate-display">
          <div styleName="birthdate-result-container">
            <dl>
              <dt>Birthdate</dt>
              <dd id="dob">{format(dispDate, "MM/DD/YYYY")}</dd>
            </dl>
            <dl>
              <dt>Child is</dt>
              <dd id="graduation-display">{describeChild(calcDate)}</dd>
            </dl>
          </div>
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
                <i className="fas fa-times" />
              </button>
              <div styleName="review-dates">
                <Tooltip
                  styleName="date-input-tooltip-container"
                  html={
                    <div className="tip">
                      <p>
                        Prepaid Plans are only available for students in the
                        11th grade or below and children born on, or before today's date.
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
                    keepCharPositions={true}
                    value={value}
                    id="update_entry"
                    placeholder={
                      this.state.active
                        ? ""
                        : "MM/DD/YYYY"
                    }
                    pipe={autoCorrectedDatePipe}

                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    onChange={this.onChange}
                    aria-label="Enter your child's birthdate for plan prices"
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
                      className="btn-adjuster"
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
                      className="btn-adjuster"
                      disabled={
                        differenceInYears(dispDate, calcDate) > 0 ||
                        !isInSchool ||
                        age >= 16
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
                  Your child will graduate in
                  <span styleName="graduation-display">
                    {graduatesIn(calcDate)}
                    <Tooltip
                      html={
                        <div className="tip">
                          <h6>Why is this important?</h6>
                          <p>
                            Your child&apos;s birthdate predicts the year they
                            will graduate high school and begin using their Florida Prepaid
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
                  className="activator activator-update"
                  id="update-info-1"
                  checked={paymentType === "monthly"}
                >
                  Update My Child’s Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    };
  }
}
