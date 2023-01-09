import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numQuery: 5,
  };

  noeInput = (value) => {
    this.props.noeInput(value);
    this.setState({ numQuery: value });
  };

  componentDidMount() {
    this.setState({ numQuery: this.props.numQuery || 5 });
  }

  render() {
    const { numQuery } = this.state;
    return (
      <div className="numOfEvents">
        <h2>Number Of Events</h2>
        <input
          type="number"
          className="noe-Input"
          value={numQuery}
          onChange={(event) => {
            this.noeInput(event.target.value);
          }}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
