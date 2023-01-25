import "./App.css";
import React, { Component } from "react";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import EventGenre from "./EventGenre";
import "./nprogress.css";
import WelcomeScreen from "./WelcomeScreen";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import { OfflineAlert } from "./Alert";

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: "all",
    eventCount: 32,
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          events = events.slice(0, this.state.eventCount);
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }

    // async componentDidMount() {
    //   this.mounted = true;
    //   const accessToken = localStorage.getItem("access_token"); // These 3 lines are from CF documentation but they work when added
    //   const searchParams = new URLSearchParams(window.location.search); // These 3 lines are from CF documentation but they work when added
    //   const code = searchParams.get("code"); // These 3 lines are from CF documentation but they work when added
    //   getEvents().then((events) => {
    //     if (this.mounted) {
    //       this.setState({ events, locations: extractLocations(events) });
    //     }
    //   });

    if (!navigator.onLine) {
      this.setState({
        offlineText:
          "You are currently not connected to the internet, your data was loaded from the cache.",
      });
    } else {
      this.setState({
        offlineText: "",
      });
    }
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  async componentWillUnmount() {
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
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose Your Nearest City</h4>
        <OfflineAlert text={this.state.offlineText} />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          updateEvents={this.updateEvents}
          eventCount={this.state.eventCount}
        />
        <h4>Events in each city</h4>
        <EventGenre events={this.state.events} />
        <ResponsiveContainer height={400}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis
              type="number"
              allowDecimals={false}
              dataKey="number"
              name="number of events"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={this.getData()} fill="#8884d8" />
            <Scatter data={this.getData()} fill="#2284d8" />{" "}
          </ScatterChart>
        </ResponsiveContainer>
        <EventList events={this.state.events} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
