import React, { useContext, useEffect } from "react";
import { EventTypeContext } from "./EventTypeProvider";


export const EventTypeMap = () => {
	const { eventTypes, getEventTypes } = useContext(EventTypeContext);

	useEffect(() => {
		getEventTypes();
	}, []);

	return (
			<select>
				{eventTypes.map((type) => {
					return (
						<option key={type.id} value={type.id}>
							{type.label}
						</option>
					);
				})}
			</select>
	);
};
