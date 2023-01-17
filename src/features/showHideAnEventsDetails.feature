Feature: Show / Hide an Events Details 

Scenario: An event element is collapsed by default
Given that the user opens the main page
When the user views the event element of a city
Then the event element from each city will initially be collapsed/hidden from the user

Scenario: User can expand an event to see its details
Given the user is viewing a specific event
When the user selects the event
Then the details of that event will be listed for the user to view

Scenario: User can collapse an event to hide its details
Given the event element is opened
When the user closes the event element
Then the details are hidden