import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    eventCount: 32,
  };

  noeInput = (e) => {
    const inputValue = e.target.value;
    this.props.updateEvents(null, inputValue);
    this.setState({
      eventCount: inputValue,
    });
  };

  componentDidMount() {
    this.setState({ eventCount: this.props.eventCount || 32 });
  }

  render() {
    const { noe } = this.state;
    return (
      <div className="numOfEvents">
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
