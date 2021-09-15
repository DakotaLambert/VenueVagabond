import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { MapContext } from "./MapProvider.js";
import { VenueContext } from "./venue/VenueProvider.js";
import { VenueEvents } from "./venue/VenueEvents.js";
export const StateDetail = () => {
	const {states, getStateById}  = useContext(MapContext);

  const { stateId } = useParams()


	useEffect(() => {
		getStateById(stateId)
	}, [stateId]);

	return (
		<>
			<div>
        {states.state_venues?.map((venue) => {
          return (
          <div key={venue.id} style={{color:"white"}}>
            {venue.name}
            <VenueEvents venue={venue}/>
          </div>
          )
        })}
        
      </div>
		</>
	);
};
