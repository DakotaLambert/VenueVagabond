import React, { useState } from "react";

export const MapContext = React.createContext();

export const MapProvider = (props) => {
	const [states, setStates] = useState({});

	const getStates = () => {
		return fetch(`http://localhost:8000/states`)
			.then((response) => response.json())
			.then(setStates);
	};
	const getStateById = (stateId) => {
		return fetch(`http://localhost:8000/states/${stateId}`)
			.then((response) => response.json())
			.then(setStates);
	};

	return (
		<MapContext.Provider
			value={{
				states,
				getStates,
        getStateById
			}}
		>
			{props.children}
		</MapContext.Provider>
	);
};

// getStateById(51).then(() => {history.push(`/state/${51}`)})