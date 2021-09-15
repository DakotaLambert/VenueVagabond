import React, { useState } from "react";

export const VenueContext = React.createContext();

export const VenueProvider = (props) => {
	const [venues, setVenues] = useState([]);

	const getVenues = () => {
		return fetch(`http://localhost:8000/venues`)
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

	return (
		<VenueContext.Provider
			value={{
				venues,
				getVenues,
        getVenueById
			}}
		>
			{props.children}
		</VenueContext.Provider>
	);
};