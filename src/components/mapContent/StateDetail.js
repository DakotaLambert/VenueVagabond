import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { MapContext } from "./MapProvider.js";
import { VenueEvents } from "./venue/VenueEvents.js";
export const StateDetail = () => {
	const { states, getStateById } = useContext(MapContext);

	const { stateId } = useParams();

  const history = useHistory()

	useEffect(() => {
		getStateById(stateId);
	}, [stateId]);

	return (
		<>
    <button onClick={()=> {
      history.push(`/eventform/${stateId}`)
    }}>Create Event</button>
			<div>
				{states.state_venues?.map((venue) => {
					return (
						<div key={venue.id} style={{ color: "white" }}>
							{venue.name}
							<VenueEvents venue={venue} />
						</div>
					);
				})}
			</div>
		</>
	);
};
