import React, { useContext, useEffect } from "react";
import { EventTypeContext } from "./EventTypeProvider";


export const EventTypeMap = ({handleControlledInputChange, eventStateVariable}) => {
	const { eventTypes, getEventTypes } = useContext(EventTypeContext);

	useEffect(() => {
		getEventTypes();
	}, []);

	return (
			<select 
      className="FormField"
      onChange={handleControlledInputChange}
      name="eventTypeId" 
      value={eventStateVariable.eventTypeId}
        >
          <option>Choose Event Type</option>
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


