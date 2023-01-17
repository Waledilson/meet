import React from "react";
import { mount } from "enzyme";
import App from "../App";
import { loadFeature, defineFeature } from "jest-cucumber";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  let AppWrapper;

  test("An event element is collapsed by default", ({ given, when, then }) => {
    given("that the user opens the main page", () => {});
    when("the user views the event element of a city", () => {
      AppWrapper = mount(<App />);
    });
    then(
      "the event element from each city will initially be collapsed/hidden from the user",
      () => {
        AppWrapper.update();
        expect(AppWrapper.find(".event .event-details")).toHaveLength(0);
      }
    );
  });
  test("User can expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    given("the user is viewing a specific event", () => {
      AppWrapper = mount(<App />);
    });

    when("the user selects the event", () => {
      AppWrapper.update();
      AppWrapper.find(".event .details-btn").at(0).simulate("click");
    });
    then(
      "the details of that event will be listed for the user to view",
      () => {
        expect(AppWrapper.find(".event .description")).toHaveLength(1);
      }
    );
  });
  test("User can collapse an event to hide its details", ({
    given,
    when,
    then,
  }) => {
    given("the event element is opened", async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find(".event .details-btn").at(0).simulate("click");
    });

    when("the user closes the event element", () => {
      AppWrapper.update();
      AppWrapper.find(".event .details-btn").at(0).simulate("click");
    });

    then("the details are hidden", () => {
      expect(AppWrapper.find(".event .description")).toHaveLength(0);
    });
  });
});
