import React from "react";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: "" };
    this.componentWillMount = this.componentWillMount.bind(this);
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
        <p>${JSON.stringify(this.state.data, null, 3)}</p>
      </div>
    );
  }
}

export default Main;
