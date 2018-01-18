import React from "react";
import Chart from "./chart.jsx";
import styled from "styled-components";

const PageTitle = styled.h1`
  text-align: center;
  font-family: Arial, sans-serif;
  margin-bottom: 5px;
`;

const PageSubtitle = styled.p`
  text-align: center;
  font-size: 1em;
  margin-top: 0px;
`;

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
        <PageTitle>D3 Scatterplot</PageTitle>
        <PageSubtitle>
          <i>
            Created using D3 and React for freeCodeCamp Data Visualization challenge<br />{" "}
            by Aaron Rhodebeck
          </i>
        </PageSubtitle>
        {this.state.data && <Chart dataset={this.state.data} />}
      </div>
    );
  }
}

export default Main;
