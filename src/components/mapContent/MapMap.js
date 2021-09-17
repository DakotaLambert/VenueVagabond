import React, { useEffect, useContext } from "react";

import { MapContext } from "./MapProvider";

export const MapMap = ({handleControlledInputChange, handleStateIDChange})=> {
	const { states, getStates } = useContext(MapContext);

	useEffect(() => {
		getStates();
	}, []);

	return (
		<select
			className="FormField"
			onChange={(handleControlledInputChange, handleStateIDChange)}
			name="stateId"
		>
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
