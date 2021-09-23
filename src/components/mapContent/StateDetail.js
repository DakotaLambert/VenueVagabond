import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { MapContext } from "./MapProvider.js";
import { VenueEvents } from "./venue/VenueEvents.js";

import createButton from "../../images/createButton.png";

import "../mapContent/MapStyles.css";

export const StateDetail = () => {
	const { singleState, getStateById } = useContext(MapContext);

	const { stateId } = useParams();

	const history = useHistory();

	useEffect(() => {
		getStateById(stateId);
	}, []);
	console.log(singleState.state_venues);

	// ? response.event.eventimage_set.map,

	return (
		<>
			<div style={{ textAlign: "center" }}>
				<img
					className="eventCreate"
					src={createButton}
					style={{ cursor: "pointer", marginTop: "5rem" }}
					onClick={() => {
						history.push(`/eventform/${stateId}`);
					}}
				/>
			</div>
			<div className="eventsBox">
				{singleState.state_venues?.map((venue) => {
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
