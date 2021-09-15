import React, {useState} from "react";

export const EventTypeContext = React.createContext();

export const EventTypeProvider = (props) => {
	const [eventTypes, setEventTypes] = useState([]);

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
  
	return (
		<EventTypeContext.Provider
			value={{
				eventTypes,
				getEventTypes,
        getEventById,
        createEventType
			}}
		>
			{props.children}
		</EventTypeContext.Provider>
	);
};