// @flow strict

import React from "react";
import MaskedInput from "react-text-mask";
import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";
import { parse } from "date-fns";
import { withUrlState } from "with-url-state";
import "./styles/BirthdateInput.css";

const enhance = withUrlState(() => ({ birthdate: "" }));
const autoCorrectedDatePipe = createAutoCorrectedDatePipe("mm/dd/yyyy");

type Props = {
  setUrlState: () => void
};

type State = {
  value: string
};

class BirthdateInput extends React.Component<Props, State> {
  state = {
    value: ""
  };

  onBlur(event) {
    this.setState({ value: event.currentTarget.value });
  }

  onChange(event) {
    this.setState({ value: event.currentTarget.value });
  }

  render() {
    return (
      <div styleName="birthdate-input">
        <span>Your Child&apos;s Birthdate</span>
        <MaskedInput
          mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
          pipe={autoCorrectedDatePipe}
          guide={true}
          pattern="\d*"
          keepCharPositions={true}
          placeholder="Enter MM/DD/YYYY for payment estimates"
          // placeholderChar="\u2000"
          onBlur={this.onBlur.bind(this)}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }
}

export default enhance(BirthdateInput);
