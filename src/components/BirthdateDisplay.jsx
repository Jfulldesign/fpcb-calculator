// @flow strict

import React from "react";
import { format } from "date-fns";
import { describeChild, graduatesIn } from "util/maths";
import "./styles/BirthdateDisplay.css";

type Props = {
  date: Date,
  onEdit: () => void,
  onReset: () => void
};

export default class BirthdateDisplay extends React.Component<Props> {
  render() {
    const { date, onEdit, onReset } = this.props;
    return (
      <div styleName="birthdate-display">
        <dl>
          <dt>Birthdate</dt>
          <dd>{format(date, "MM/DD/YYYY")}</dd>
        </dl>
        <dl>
          <dt>Ready to use</dt>
          <dd>{graduatesIn(date)}</dd>
        </dl>
        <dl>
          <dt>Child is</dt>
          <dd>{describeChild(date)}</dd>
        </dl>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onReset}>Reset</button>
      </div>
    );
  }
}
