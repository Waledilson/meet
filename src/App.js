import "./App.css";
import React, { Component } from "react";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import "./nprogress.css";
import { extractLocations, getEvents } from "./api";
import { OfflineAlert } from "./Alert";

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: "all",
    eventCount: 32,
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        events = events.slice(0, this.state.eventCount);
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, inputNumber) => {
    const { eventCount, selectedLocation } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const currentNum = locationEvents.slice(0, eventCount);
        this.setState({
          events: currentNum,
          selectedLocation: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          selectedLocation === "all"
            ? events
            : events.filter((event) => event.location === selectedLocation);
        const currentNum = locationEvents.slice(0, inputNumber);
        this.setState({
          events: currentNum,
          eventCount: inputNumber,
        });
      });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="OfflineAlert">
          {!navigator.onLine && (
            <OfflineAlert
              text={
                "You are currently using the app offline. Some information may be out of date."
              }
            />
          )}
        </div>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          updateEvents={this.updateEvents}
          eventCount={this.state.eventCount}
        />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
