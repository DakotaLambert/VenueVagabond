import React, { useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import { EventContext } from "./EventProvider";
// import { EventTypeContext } from "./EventTypeProvider";
// import { VenueContext } from "../venue/VenueProvider";
// import { StateVenueMap } from "../venue/StateVenueMap";
import { useParams } from "react-router";
import { MapContext } from "../MapProvider";
import { EventTypeMap } from "./EventTypeMap";

export const EventForm = () => {
	const { states, getStateById } = useContext(MapContext);

	const { stateId } = useParams();

	useEffect(() => {
		getStateById(stateId);
	}, [stateId]);

	// ? grab stateId from  param
	// TODO create StateVenueMap.js

	return (
		<>
			<form>
				<div>
					<fieldset>
						<EventTypeMap />
					</fieldset>
					<fieldset>
						<select>
							{states.state_venues?.map((venue) => {
								return <option key={venue.id}>{venue.name}</option>;
							})}
						</select>
					</fieldset>
					<fieldset>
						<input type="text" />
					</fieldset>
					<fieldset>
						<input type="date" />
					</fieldset>
				</div>
			</form>
		</>
	);
};
