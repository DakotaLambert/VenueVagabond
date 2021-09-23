import React, { useEffect, useContext } from "react";

import { MapContext } from "./MapProvider";

export const MapMap = ({handleControlledInputChange})=> {
	const { states, getStates } = useContext(MapContext);

	useEffect(() => {
		getStates();
	}, []);

	return (
		<select
			className="FormField"
			onChange={handleControlledInputChange}
			name="stateId"
		>
      <option style={{fontStyle:"italic"}}>Choose a State</option>
			{states?.map((state) => {
				return (
					<option key={state.id} value={state.id}>
						{state.name}
					</option>
				);
			})}
		</select>
	);
};
