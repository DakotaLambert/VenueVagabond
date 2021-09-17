import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { MapContext } from "./MapProvider.js";
import { VenueEvents } from "./venue/VenueEvents.js";
export const StateDetail = () => {
	const { states, getStateById } = useContext(MapContext);

	const { stateId } = useParams();

	const history = useHistory();

	useEffect(() => {
		getStateById(stateId);
	}, []);

	return (
		<>
			<div>
				<button
					onClick={() => {
						history.push(`/eventform/${stateId}`);
					}}
				>
					Create Event
				</button>
			</div>
			<div className="eventsBox">
				{states.state_venues?.map((venue) => {
					return (
						<div
							className="eventBoxes"
							key={venue.id}
							style={{ color: "white", textAlign: "center" }}
						>
							<h2>{venue.name}</h2>
							<VenueEvents venue={venue} />
						</div>
					);
				})}
			</div>
		</>
	);
};
