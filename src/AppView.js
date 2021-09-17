import React from "react";
import { USMap } from "./components/mapContent/USMap";
import { Route } from "react-router-dom";
import { StateDetail } from "./components/mapContent/StateDetail";
import { MapProvider } from "./components/mapContent/MapProvider";
import { VenueProvider } from "./components/mapContent/venue/VenueProvider";
import { EventForm } from "./components/mapContent/events/EventForm";
import {EventTypeProvider} from "../src/components/mapContent/events/EventTypeProvider"
import {EventProvider} from "../src/components/mapContent/events/EventProvider"
import { EventTypeForm } from "./components/mapContent/events/EventTypeForm";
import { VenueForm } from "./components/mapContent/venue/VenueForm";
// import { AllEvents } from "./components/mapContent/events/AllEvents";

export const AppViews = () => {
	return (
		<>
			<MapProvider>
				<VenueProvider>
          <EventTypeProvider>
            <EventProvider>
					<Route exact path="/">
						<USMap />
					</Route>
					<Route exact path="/state/:stateId(\d+)">
						<StateDetail />
					</Route>
          <Route exact path="/eventform/:stateId(\d+)">
            <EventForm />
          </Route>
          <Route exact path="/eventtypemanager">
            <EventTypeForm/>
          </Route>
          <Route exact path="/venuemanager">
            <VenueForm/>
          </Route>
          {/* <Route exact path="/allevents">
            <AllEvents/>
          </Route> */}
          </EventProvider>
          </EventTypeProvider>
				</VenueProvider>
			</MapProvider>
      
		</>
	);
};
