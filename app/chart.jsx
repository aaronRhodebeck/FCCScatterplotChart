import React from "react";
import makeScatterPlot from "./scatterplot";
import * as d3 from "d3";
import { withFauxDOM } from "react-faux-dom";
import { ChartDiv } from "./ChartDisplay";
import { Tooltip, TooltipTitle, TooltipList } from "./tooltip.jsx";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipVisibility: "hidden",
      tooltipX: 0,
      tooltipY: 0,
      tooltipData: {}
    };
  }

  componentWillMount() {
    const faux = this.props.connectFauxDOM("div", "chart");
    makeScatterPlot(faux, this.props.dataset, this);
  }

  shouldComponentUpdate(previousState, nextState) {
    if (previousState.tooltipVisibility !== nextState.tooltipVisibility) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const tooltip = this.state.tooltipData;
    return (
      <ChartDiv>
        {this.props.chart}
        <Tooltip
          visibility={this.state.tooltipVisibility}
          top={this.state.tooltipY}
          left={this.state.tooltipX}
        >
          <TooltipTitle>
            {tooltip.Name} {tooltip.Nationality}
          </TooltipTitle>
          <TooltipList>
            <li>Rank: {tooltip.Place}</li>
            <li>Time: {tooltip.Time}</li>
            <li>Year: {tooltip.Year}</li>
            <li>{tooltip.Doping}</li>
          </TooltipList>
        </Tooltip>
      </ChartDiv>
    );
  }
}

export default withFauxDOM(Chart);
