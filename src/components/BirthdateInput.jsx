// @flow strict

import React from "react";
import MaskedInput from "react-text-mask";
import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";
import "./styles/BirthdateInput.css";

const autoCorrectedDatePipe = createAutoCorrectedDatePipe("mm/dd/yyyy");
export default class BirthdateInput extends React.Component<void> {
  render() {
    return (
      <div styleName="birthdate-input">
        <span>Your Child&apos;s Birthdate</span>
        <MaskedInput
          mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
          pipe={autoCorrectedDatePipe}
          guide={true}
          keepCharPositions={true}
          placeholder="Enter MM/DD/YYYY for payment estimates"
          placeholderChar=" "
        />
      </div>
    );
  }
}
