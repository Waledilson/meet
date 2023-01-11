import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    eventCount: 5,
  };

  noeInput = (e) => {
    const inputValue = e.target.value;
    this.props.updateEvents(null, inputValue);
    this.setState({
      eventCount: inputValue,
    });
  };

  componentDidMount() {
    this.setState({ eventCount: this.props.eventCount || 5 });
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
          // onChange={this.noeInput}
          onChange={(event) => {
            this.noeInput(event);
          }}
        ></input>
      </div>
    );
  }
}

export default NumberOfEvents;
