import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { EventContext } from "./EventProvider";
import { useParams } from "react-router";
import { MapContext } from "../MapProvider";
import { EventTypeMap } from "./EventTypeMap";

import "../../mapContent/events/Event.css";

export const EventEditForm = () => {
	const { getStates } = useContext(MapContext);
	const { singleState, getStateById } = useContext(MapContext);
	const { updateEvent, getEventById } = useContext(EventContext);

	const [event, setEvent] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [currentPicture, setCurrentPicture] = useState("");

	const { stateId, eventId } = useParams();

	const history = useHistory();

  const getBase64 = (file, callback) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => callback(reader.result));
		reader.readAsDataURL(file);
	};

	const createPostImageString = (event) => {
		getBase64(event.target.files[0], (base64ImageString) => {
			// console.log("Base64 of file is", base64ImageString);

			// Update a component state variable to the value of base64ImageString
			setCurrentPicture(base64ImageString);
		});
	};

	useEffect(() => {
		getEventById(eventId).then((eventObject) => {
			setEvent({
				id: parseInt(eventId),
				stateId: parseInt(eventObject.event.venue.state.id),
				name: eventObject.event.name,
				venueId: eventObject.event.venue.id,
				dateOfEvent: eventObject.event.date_of_event,
				eventTypeId: eventObject.event.event_type.id,
			});
		});
	}, [eventId]);

	useEffect(() => {
		getStates().then(() => {
			getStateById(stateId);
		});
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
			updateEvent({
				id: parseInt(eventId),
				stateId: event.stateId,
				eventTypeId: parseInt(event.eventTypeId),
				venueId: parseInt(event.venueId),
				name: event.name,
				dateOfEvent: event.dateOfEvent,
        image_url: currentPicture
			}).then(() => {
				history.push(`/state/${stateId}`);
			});
		} else {
			window.alert("Please fill in all form fields before submitting event.");
			setIsLoading(false);
		}
	};

	// TODO create StateVenueMap.js

	const handleControlledInputChange = (field) => {
		const updateEvent = { ...event };
		updateEvent[field.target.name] = field.target.value;
		setEvent(updateEvent);
	};

	return (
		<>
			<form className="FormContainer">
				<div className="FormBox">
					<fieldset className="FormSet">
						<EventTypeMap
							eventStateVariable={event}
							handleControlledInputChange={handleControlledInputChange}
						/>
					</fieldset>

					<fieldset className="FormSet">
						<select
							className="FormField"
							name="venueId"
							onChange={handleControlledInputChange}
							value={event.venueId}
						>
							<option style={{ fontStyle: "italic" }}>Choose Venue</option>
							{singleState.state_venues?.map((venue) => {
								return <option value={venue.id}>{venue.name}</option>;
							})}
						</select>
					</fieldset>
					<fieldset className="FormSet">
						<input
							className="FormField"
							placeholder="Event Name"
							type="text"
							name="name"
							onChange={handleControlledInputChange}
							value={event.name}
						/>
					</fieldset>
					<fieldset className="FormSet">
						<input
							className="FormField"
							// value={event.dateOfEvent}
							type="date"
							name="dateOfEvent"
							onChange={handleControlledInputChange}
							value={event.dateOfEvent}
						/>
					</fieldset>
          <fieldset className="FormSet">
						<input
							type="file"
							id="image_url"
							className="postFormField"
							onChange={createPostImageString}
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
