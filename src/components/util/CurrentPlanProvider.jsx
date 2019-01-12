// @flow strict

import React from "react";
import { WithStore } from "pure-react-carousel";

type Props = {
  date: ?Date,
  render: number => React$Element<*>,
  currentSlide: number
};

class CurrentPlanProvider extends React.Component<Props> {
  render() {
    const { render, currentSlide } = this.props;
    return render(currentSlide);
  }
}

export default WithStore(CurrentPlanProvider, state => ({
  currentSlide: state.currentSlide
}));
