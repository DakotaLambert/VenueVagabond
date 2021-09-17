import React, { useState } from "react";

export const EventContext = React.createContext();

export const EventProvider = (props) => {
	const [events, setEvents] = useState([]);

	const getEvents = () => {
		return fetch(`http://localhost:8000/events`, {
			headers: {
				Authorization: `Token ${localStorage.getItem("VV_User")}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then(setEvents);
	};
	const getEventById = (eventId) => {
		return fetch(`http://localhost:8000/events/${eventId}`, {
			headers: {
				Authorization: `Token ${localStorage.getItem("VV_User")}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then(setEvents);
	};

	const createUserEvent = (eventObject) => {
		return fetch("http://localhost:8000/events", {
			method: "POST",
			headers: {
				Authorization: `Token ${localStorage.getItem("VV_User")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(eventObject),
		}).then(getEvents);
	};

  const deleteEvent = (eventId) => {
		return fetch(`http://localhost:8000/events/${eventId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Token ${localStorage.getItem("VV_User")}`,
			},
		})
	};

	return (
		<EventContext.Provider
			value={{
				events,
				getEvents,
				getEventById,
				createUserEvent,
        deleteEvent
			}}
		>
			{props.children}
		</EventContext.Provider>
	);
};
