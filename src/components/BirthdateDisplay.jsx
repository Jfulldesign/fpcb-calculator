// @flow strict

import React from "react";
import { format } from "date-fns";
import { describeChild } from "util/maths";

type Props = {
  date: Date
};

export default class BirthdateDisplay extends React.Component<Props> {
  render() {
    return (
      <div>
        <dl>
          <dt>Birthdate</dt>
          <dd>{format(this.props.date, "MM/DD/YYYY")}</dd>
          <dt>Ready to use</dt>
          <dd>xxxx - xxxx</dd>
          <dt>Child is</dt>
          <dd>{describeChild(this.props.date)}</dd>
        </dl>
        <button>Edit</button>
        <button>Reset</button>
      </div>
    );
  }
}
