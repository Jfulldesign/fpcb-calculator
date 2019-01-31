// @flow

import React from "react";
import cx from "classnames";
import { Media } from "react-fns";
import { Tooltip } from "react-tippy";
import { addYears, subYears, format, differenceInYears } from "date-fns";
import { gatedKeyPress } from "util/keyboard";
import { describeChild, graduatesIn, cutoff, getAge } from "util/maths";
import "./styles/BirthdateDisplay.css";

type Props = {
  calcDate: Date,
  dispDate: Date,
  onHasDispDate: Date => void,
  onHasCalcDate: Date => void
};

type State = {
  calcDate: Date,
  editActive: boolean
};

export default class BirthdateDisplay extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onEdit = this.onEdit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.addYear = this.addYear.bind(this);
    this.subtractYear = this.subtractYear.bind(this);
    this.onSetDate = this.onSetDate.bind(this);
    this.state = { editActive: false, calcDate: props.calcDate };
  }

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
    this.setState({ calcDate: subYears(this.state.calcDate, 1) });
  };

  subtractYear = (event: Event) => {
    event.preventDefault();
    this.setState({ calcDate: addYears(this.state.calcDate, 1) });
  };

  onSetDate = () => {
    this.props.onHasCalcDate(this.state.calcDate);
    this.setState({ editActive: false });
  };

  render() {
    const { calcDate, editActive } = this.state;
    const { dispDate } = this.props;
    const age = getAge(calcDate);
    const isInSchool = calcDate != null && age >= 5;
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
                        age <= 5
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
