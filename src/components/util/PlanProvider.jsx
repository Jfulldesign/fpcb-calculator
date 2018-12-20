// @flow strict

import React from "react";
import { WithStore } from "pure-react-carousel";

type Props = {
  render: () => void,
  currentSlide: number
};

class PlanProvider extends React.Component<Props> {
  render() {
    return this.props.render({ plan: this.props.currentSlide });
  }
}

export default WithStore(PlanProvider, state => ({
  currentSlide: state.currentSlide
}));
