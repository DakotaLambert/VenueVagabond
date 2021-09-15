// import React, { useContext, useEffect, useState } from "react";
// import { useHistory, useParams } from "react-router";
// import { MapContext } from "../MapProvider";

// export const StateVenueMap = () => {
// 	const { states, getStateById } = useContext(MapContext);

// 	const { stateId } = useParams();

// 	useEffect(() => {
// 		getStateById(stateId);
// 	}, [stateId]);

// 	return (
// 		<select>
// 			{states.state_venues?.map((venue) => {
// 				return (
// 					<option key={venue.id}>
// 						{venue.name}
// 					</option>
// 				);
// 			})}
// 		</select>
// 	);
// };
