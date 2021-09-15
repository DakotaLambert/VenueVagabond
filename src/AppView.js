import React from "react";
import { USMap } from "./components/mapContent/USMap";
import { Route } from "react-router-dom";
import { StateDetail } from "./components/mapContent/StateDetail";
import { MapProvider } from "./components/mapContent/MapProvider";
import { VenueProvider } from "./components/mapContent/venue/VenueProvider";

export const AppViews = () => {
	return (
		<>
			<MapProvider>
				<VenueProvider>
					<Route exact path="/">
						<USMap />
					</Route>
					<Route exact path="/state/:stateId(\d+)">
						<StateDetail />
					</Route>
				</VenueProvider>
			</MapProvider>
		</>
	);
};
