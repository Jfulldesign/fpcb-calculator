// @flow strict

import React from "react";
import { format } from "date-fns";
import { gatedKeyPress } from "util/keyboard";
import { describeChild } from "util/maths";
import "./styles/BirthdateDisplay.css";

type Props = {
  date: Date,
  onEdit: () => void,
  onReset: () => void
};

export default class BirthdateDisplay extends React.Component<Props> {
  render() {
    const { date, onEdit } = this.props;
    return (
      <div styleName="birthdate-display">
        <dl>
          <dt>Birthdate</dt>
          <dd>{format(date, "MM/DD/YYYY")}</dd>
        </dl>
        <dl>
          <dt>Child is</dt>
          <dd>{describeChild(date)}</dd>
        </dl>
        <button
          onClick={onEdit}
          onKeyPress={gatedKeyPress(["Space", "Enter"], this.onEdit)}
        >
          Edit
        </button>
      </div>
    );
  }
}
