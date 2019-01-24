// @flow

import React from "react";
import cx from "classnames";
import { Media } from "react-fns";
import { format } from "date-fns";
import { Tooltip } from "react-tippy";
import { addYears, subYears } from "date-fns";
import { gatedKeyPress } from "util/keyboard";
import { describeChild, graduatesIn } from "util/maths";
import "./styles/BirthdateDisplay.css";

type Props = {
  date: Date,
  onEdit: Date => void
};

type State = {
  date: Date,
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
    this.state = {
      editActive: false,
      date: this.props.date
    };
  }

  onEdit = () => {
    this.setState({ editActive: true });
  };

  onClose = () => {
    this.setState({ editActive: false });
  };

  onUpdate = () => {
    this.setState({ editActive: false });
  };

  addYear = () => {
    this.setState({ date: subYears(this.state.date, 1) });
  };

  subtractYear = () => {
    this.setState({ date: addYears(this.state.date, 1) });
  };

  onSetDate = () => {
    this.props.onEdit(this.state.date);
    this.setState({ editActive: false });
  };

  render() {
    const { date, editActive } = this.state;
    const editStyleName = cx({
      "edit-container": true,
      active: editActive
    });

    return (
      <div styleName="birthdate-display-container">
        <div styleName="birthdate-display">
          <dl>
            <dt>Birthdate</dt>
            <dd>{format(date, "MM/DD/YYYY")}</dd>
          </dl>
          <dl>
            <dt>Child is</dt>
            <dd>{describeChild(date)}</dd>
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
                    {describeChild(date)}
                    <Tooltip
                      html={
                        <div className="tip">
                          <h6>Why is this important?</h6>
                          <p>
                            Your child&apos;s grade predicts the year they will
                            graduate and begin using their Florida Prepaid Plan.
                            The beneficiary has up to 10 years following
                            graduation to use a Florida Prepaid Plan.
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
                    {graduatesIn(date)}
                    <Tooltip
                      html={
                        <div className="tip">
                          <h6>Why is this important?</h6>
                          <p>
                            Your child&apos;s birthdate predicts the year they
                            will graduate and begin using their Florida Prepaid
                            Plan. The date entered must be today or earlier.
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
