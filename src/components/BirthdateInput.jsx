// @flow

import React from "react";
import cx from "classnames";
import MaskedInput from "react-text-mask";
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
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
const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy',{minYear:1970, maxYear:2099});

// Safari 3.0+ "[object HTMLElementConstructor]"
let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
let isIE = /*@cc_on!@*/false || !!document.documentMode;

type State = {
  active: boolean,
  expand: boolean,
  value: ?string,
  date: ?Date,
  didx: number,
  dateError: boolean,
  dateErrorText: ?string
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
      dateError: false,
      dateErrorText: "Prepaid Plans are only available for students in the 11th grade or below and children born on or before today's date."
    };

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addYear = this.addYear.bind(this);
    this.subtractYear = this.subtractYear.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSetDate = this.onSetDate.bind(this);
    this.onClickLoad = this.onClickLoad.bind(this);
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
        this.setState({ date, value, dateError: false, didx: 0 });
        this.props.onHasCalcDate(date);
        this.setState({ expand: true });
      } else if (isValid(date)) {
        this.setState({ dateErrorText: "Prepaid Plans are only available for students in the 11th grade or below and children born on or before today's date."})
        this.setState({ value, dateError: true });

      } else {
        this.setState({ dateErrorText: "Please enter a valid value. The field is incomplete or has an invalid date."})
        this.setState({ value, dateError: true });
        this.setState({ expand: false });

      }
    }
  };

  addYear = (event: Event) => {
    const { date, didx } = this.state;
    event.preventDefault();
    this.setState({ date: subYears(date, 1), didx: didx + 1 });
    // this.props.onHasCalcDate(subYears(date, 1));
  };

  subtractYear = (event: Event) => {
    const { date, didx } = this.state;
    event.preventDefault();
    this.setState({ date: addYears(date, 1), didx: didx - 1 });
    // this.props.onHasCalcDate(addYears(date, 1));
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

  onClickLoad = (event: Event) => {
    this.onSetDate;
  };

  render() {
    const { value, didx, date, expand, dateError, dateErrorText } = this.state;
    const age = getAge(date);
    const isInSchool = date != null && age >= 4;
    const styleName = cx({
      active: this.state.active,
      "birthdate-input": true
    });
    if(!isIE && !isSafari){
    return (
      <form id="birthday-form" styleName={styleName}>
        <h1 style={{fontSize:55,color: '#12254d'}}>Your plan that is 100% worry-free.</h1>
        <div styleName="hero-copy">With a 529 Prepaid Plan for every budget, you can lock in the future cost of tuition and most fees for less.</div>
        <div styleName="hero-copy"><div style={{color: '#1b1c20', display: 'flex'}}><i className="fa fa-check-circle"></i> Use in-state or out</div></div>
        <div styleName="hero-copy"><div style={{color: '#1b1c20', display: 'flex'}}><i className="fa fa-check-circle"></i> Works great with scholarships and financial aid</div></div>
        <div styleName="hero-copy"><div style={{color: '#1b1c20', display: 'flex'}}><i className="fa fa-check-circle"></i>  Cancel anytime for a full refund</div></div>
        <span>Enter your child&apos;s birthdate for plan prices:</span>
        <Tooltip
          styleName="date-input-tooltip-container"
          html={
            <div className="tip">
              <p>
                { dateErrorText }
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
            value={this.state.value ? this.state.value : ""}
            onFocus={this.onFocus}
            onChange={this.onChange}
            aria-label="Enter your child's birthdate for plan prices"
            id="date_entry"
            data-hj-whitelist
            name="dob"
            max={new Date().toISOString().split("T")[0]}
            min="1970-01-01"
          />

        </Tooltip>
        {expand === false ? (
          <div styleName="button-container">
            { <button
              disabled={!isValidDate(new Date(value))}
              onClick={this.onSubmit}
              onKeyPress={gatedKeyPress(["Space", "Enter"], this.onSubmit)}
            >
              Show My Rates
            </button> }
          </div>
        ) : (
          <div styleName="review-dates">
            <div styleName="grade-adjust" >
              Your child is
              <span styleName="grade-display">
              <span id="childs_age">{describeChild(date)}</span>
              {describeChild(date) === "a newborn" ? (
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
                  <button type="button" styleName="info-tooltip" aria-label="BirthdateInput Child Grade Info Tooltip">
                    <i className="fa fa-info-circle" />
                  </button>
                </Tooltip>
              ) : (
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
                  <button type="button" styleName="info-tooltip" aria-label="BirthdateInput Child Grade Info Tooltip">
                    <i className="fa fa-info-circle" />
                  </button>
                </Tooltip>
              )}
              </span>
              {isInSchool  &&
                <div styleName="grade-adjust-buttons">
                  <button
                    className="btn-adjuster"
                    aria-label="BirthdateInput Minus Icon"
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
                    className="btn-adjuster"
                    aria-label="BirthdateInput Plus Icon"
                    disabled={didx >= 1 || !isInSchool || age >= 16}
                    onClick={this.addYear}
                    onKeyPress={gatedKeyPress(["Space", "Enter"], this.addYear)}
                  >
                    <i className="fa fa-plus-circle" />
                    Add Year
                  </button>
                </div>
              }
            </div>
            <div styleName="graduation-estimate">
              Your child will graduate in
              <span styleName="graduation-display">
                <span id="graduates_in">{graduatesIn(date)}</span>
                <Tooltip
                  html={
                    <div className="tip">
                      <h6>Why is this important?</h6>
                      <p>
                        Your child&apos;s birthdate predicts the year they will
                        graduate high school and begin using their Florida Prepaid Plan,
                        based on child???s age/grade on or before{" "}
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
                  <button type="button" styleName="info-tooltip" aria-label="BirthdateInput Child Graduation Info Tooltip">
                    <i className="fa fa-info-circle" />
                  </button>
                </Tooltip>
              </span>
            </div>
            <button
              styleName="button-submit"
              onClick={this.onSetDate}
              onKeyPress={gatedKeyPress(["Space", "Enter"], this.onSetDate)}
              className="activator activator-submit"
              id="show-rates"
            >
              Show My Rates
            </button>
          </div>
        )}
      </form>
    )
    } else {
      return (
        <form id="birthday-form" styleName={styleName}>
          <h1>You Pick the Plan, We Handle The Rest</h1>
        <div styleName="hero-copy">Our 529 Prepaid Plans are 100% risk-free, so you can never lose your investment. Find the plan that fits your family's budget and savings goals.</div>
          <span>Enter your child&apos;s birthdate for plan prices:</span>
          <Tooltip
            styleName="date-input-tooltip-container"
            html={
              <div className="tip">
                <p>
                  { dateErrorText }
                </p>
              </div>
            }
            open={dateError}
            position="top"
            tabIndex="0"
            arrow
          >

           <MaskedInput
            mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
            guide={true}
            pattern="\d*"
            keepCharPositions={true}
            value={this.state.value}
            pipe={autoCorrectedDatePipe}
            placeholder={
              this.state.active ? "MM/DD/YYYY" : "MM/DD/YYYY"
            }
            onFocus={this.onFocus}
            onChange={this.onChange}
            aria-label="Enter your child's birthdate for plan prices"
            id="date_entry"
            name="dob"
          />
          </Tooltip>
          {expand === false ? (
            <div styleName="button-container">
              <button
                disabled={!isValidDate(new Date(value))}
                onClick={this.onSubmit}
                onKeyPress={gatedKeyPress(["Space", "Enter"], this.onSubmit)}
              >
                Show My Rates
              </button>
            </div>
          ) : (
            <div styleName="review-dates">
              <div styleName="grade-adjust">
                Your child is
                <span styleName="grade-display">
              <span id="childs_age">{describeChild(date)}</span>
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
                    className="btn-adjuster"
                    aria-label="BirthdateInput Minus Icon"
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
                    className="btn-adjuster"
                    aria-label="BirthdateInput Plus Icon"
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
                <span id="graduates_in">{graduatesIn(date)}</span>
                  <Tooltip
                    html={
                      <div className="tip">
                        <h6>Why is this important?</h6>
                        <p>
                          Your child&apos;s birthdate predicts the year they will
                          graduate high school and begin using their Florida Prepaid Plan,
                          based on child???s age/grade on or before{" "}
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
                className="activator activator-submit"
                id="show-rates"
              >
                Show My Rates
              </button>
            </div>
          )}
        </form>
      )
    };
  }
}
