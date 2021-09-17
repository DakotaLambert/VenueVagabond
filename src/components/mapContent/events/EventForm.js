import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { EventContext } from "./EventProvider";
import { useParams } from "react-router";
import { MapContext } from "../MapProvider";
import { EventTypeMap } from "./EventTypeMap";

import "../../mapContent/events/Event.css";

export const EventForm = () => {
	const { states, getStateById } = useContext(MapContext);
	const { createUserEvent } = useContext(EventContext);
	const [event, setEvent] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const { stateId } = useParams();
	const history = useHistory();

	useEffect(() => {
		getStateById(stateId);
	}, []);

	useEffect(() => {
		if (isLoading === false) {
			return;
		} else {
			handleSaveEvent();
		}
	}, [isLoading]);

	const checkForm = () => {
		if (
			event.venueId === undefined ||
			event.name === undefined ||
			event.eventTypeId === undefined
		) {
			return false;
		} else {
			return true;
		}
	};

	const handleSaveEvent = () => {
		if (checkForm() === true) {
			createUserEvent({
				eventTypeId: parseInt(event.eventTypeId),
				venueId: parseInt(event.venueId),
				name: event.name,
				dateOfEvent: event.dateOfEvent,
			}).then(() => {
				history.push(`/state/${stateId}`);
			});
		} else {
			window.alert("Please fill in all form fields before submitting event.");
			setIsLoading(false);
		}
	};

	// ? grab stateId from param
	// TODO create StateVenueMap.js
	// ? how to set limit on how many photos upload? disable when theres value/length on state variable?

	const handleControlledInputChange = (field) => {
		const newEvent = { ...event };
		newEvent[field.target.name] = field.target.value;
		setEvent(newEvent);
	};

	return (
		<>
			<form className="FormContainer">
				<div className="FormBox">
					<fieldset className="FormSet">
						<EventTypeMap
							handleControlledInputChange={handleControlledInputChange}
						/>
					</fieldset>
					<fieldset className="FormSet">
						<select
							className="FormField"
							name="venueId"
							onChange={handleControlledInputChange}
						>
							<option style={{ fontStyle: "italic" }}>Choose Venue</option>
							{states.state_venues?.map((venue) => {
								return (
									<option key={venue.id} value={venue.id}>
										{venue.name}
									</option>
								);
							})}
						</select>
					</fieldset>
					<fieldset className="FormSet">
						<input
							className="FormField"
							// value={event.name}
              placeholder="Event Name"
							type="text"
							name="name"
							onChange={handleControlledInputChange}
						/>
					</fieldset>
					<fieldset className="FormSet">
						<input
							className="FormField"
							// value={event.dateOfEvent}
							type="date"
							name="dateOfEvent"
							onChange={handleControlledInputChange}
						/>
					</fieldset>
					<button
						className="SubmitButton"
						disabled={isLoading}
						onClick={(event) => {
							setIsLoading();
							event.preventDefault();
						}}
					>
						Save
					</button>
					<button
						className="SubmitButton"
						onClick={(event) => {
							history.goBack([1]);
							event.preventDefault();
						}}
					>
						Back
					</button>
				</div>
			</form>
		</>
	);
};
