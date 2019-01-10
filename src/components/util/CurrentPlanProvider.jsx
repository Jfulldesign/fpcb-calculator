// @flow strict

import React from "react";
import { WithStore } from "pure-react-carousel";

type Props = {
  date: ?Date,
  render: () => void,
  currentSlide: number
};

class CurrentPlanProvider extends React.Component<Props> {
  render() {
    return this.props.render(this.props.currentSlide);
  }
}

export default WithStore(CurrentPlanProvider, state => ({
  currentSlide: state.currentSlide
}));
