import React from "react";
import { USMap } from "./components/mapContent/USMap";
import { Route } from "react-router-dom";
import { StateDetail } from "./components/mapContent/StateDetail";
import { MapProvider } from "./components/mapContent/MapProvider";
import { VenueProvider } from "./components/mapContent/venue/VenueProvider";
import { EventForm } from "./components/mapContent/events/EventForm";
import {EventTypeProvider} from "../src/components/mapContent/events/EventTypeProvider"

export const AppViews = () => {
	return (
		<>
			<MapProvider>
				<VenueProvider>
          <EventTypeProvider>
					<Route exact path="/">
						<USMap />
					</Route>
					<Route exact path="/state/:stateId(\d+)">
						<StateDetail />
					</Route>
          <Route exact path="/eventform/:stateId(\d+)">
            <EventForm />
          </Route>
          </EventTypeProvider>
				</VenueProvider>
			</MapProvider>
		</>
	);
};
