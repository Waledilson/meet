import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    eventCount: 32,
    errorText: "",
  };

  noeInput = (e) => {
    const inputValue = e.target.value;

    if (inputValue <= 0 || inputValue >= 33) {
      this.setState({
        eventCount: inputValue,
        errorText: "please pick a number betwen 0 - 100",
      });
    } else {
      this.setState({
        eventCount: inputValue,
        errorText: "",
      });
    }
    this.props.updateEvents(null, inputValue);
  };

  componentDidMount() {
    this.setState({ eventCount: this.props.eventCount || 32 });
  }

  render() {
    // const { noe } = this.state;
    return (
      <div className="numOfEvents">
        <ErrorAlert test={this.state.errorText} />
        <h2>Number Of Events</h2>
        <input
          type="number"
          className="noe-Input"
          value={this.state.eventCount}
          onChange={(event) => {
            this.noeInput(event);
          }}
        ></input>
      </div>
    );
  }
}

export default NumberOfEvents;
