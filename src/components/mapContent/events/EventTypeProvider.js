import React, {useState} from "react";

export const EventTypeContext = React.createContext();

export const EventTypeProvider = (props) => {
	const [eventTypes, setEventTypes] = useState([]);
  const [eventType, setEventType] = useState({})
	const getEventTypes = () => {
		return fetch(`http://localhost:8000/eventtypes`,{
      headers: {
				Authorization: `Token ${localStorage.getItem("VV_User")}`,
				"Content-Type": "application/json",
			},
    })
			.then((response) => response.json())
			.then(setEventTypes);
	};
	const getEventById = (eventId) => {
		return fetch(`http://localhost:8000/eventtypes/${eventId}`,{
      headers: {
				Authorization: `Token ${localStorage.getItem("VV_User")}`,
				"Content-Type": "application/json",
			},
    })
			.then((response) => response.json())
			.then(setEventTypes);
	};

  const createEventType = (eventObject) => {
		return fetch("http://localhost:8000/eventtypes", {
			method: "POST",
			headers: {
				Authorization: `Token ${localStorage.getItem("VV_User")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(eventObject)
		}).then(getEventTypes);
	};
  const deleteEventType = (eventTypeId) => {
		return fetch(`http://localhost:8000/eventtypes/${eventTypeId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Token ${localStorage.getItem("VV_User")}`,
			},
		}).then(getEventTypes);
	};
	return (
		<EventTypeContext.Provider
			value={{
				eventTypes,
        eventType,
				getEventTypes,
        getEventById,
        createEventType,
        deleteEventType
			}}
		>
			{props.children}
		</EventTypeContext.Provider>
	);
};