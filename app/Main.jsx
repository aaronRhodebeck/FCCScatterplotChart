import React from "react";
import Chart from "./chart.jsx";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: "" };
  }

  componentWillMount() {
    const component = this;
    const request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json",
      true
    );
    request.send();
    request.onload = function() {
      let data = JSON.parse(request.responseText);
      component.setState({ data: data });
    };
  }

  render() {
    return (
      <div>
        <h1>Chart is below</h1>
        {this.state.data && <Chart dataset={this.state.data} />}
      </div>
    );
  }
}

export default Main;
