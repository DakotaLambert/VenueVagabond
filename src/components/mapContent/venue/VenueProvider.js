import React, { useState } from "react";

export const VenueContext = React.createContext();

export const VenueProvider = (props) => {
	const [venues, setVenues] = useState([]);

	const getVenues = () => {
		return fetch(`http://localhost:8000/venues`, {
			headers: {
				Authorization: `Token ${localStorage.getItem("VV_User")}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then(setVenues);
	};
	const getVenueById = (venueId) => {
		return fetch(`http://localhost:8000/venues/${venueId}`, {
			headers: {
				Authorization: `Token ${localStorage.getItem("VV_User")}`,
			},
		})
			.then((response) => response.json())
			.then(setVenues);
	};
	const createVenue = (eventObject) => {
		return fetch("http://localhost:8000/venues", {
			method: "POST",
			headers: {
				Authorization: `Token ${localStorage.getItem("VV_User")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(eventObject),
		}).then(getVenues);
	};
	return (
		<VenueContext.Provider
			value={{
				venues,
				getVenues,
				getVenueById,
				createVenue,
			}}
		>
			{props.children}
		</VenueContext.Provider>
	);
};
