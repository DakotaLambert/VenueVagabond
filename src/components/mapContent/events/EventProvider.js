import React, { useEvent } from "react";

export const EventContext = React.createContext();

export const EventProvider = (props) => {
	const [events, setEvents] = useEvent([]);

	const getEvents = () => {
		return fetch(`http://localhost:8000/events`)
			.then((response) => response.json())
			.then(setEvents);
	};
	const getEventById = (eventId) => {
		return fetch(`http://localhost:8000/events/${eventId}`)
			.then((response) => response.json())
			.then(setEvents);
	};

	return (
		<EventContext.Provider
			value={{
				events,
				getEvents,
        getEventById
			}}
		>
			{props.children}
		</EventContext.Provider>
	);
};