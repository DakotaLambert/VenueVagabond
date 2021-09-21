import React, { useState } from "react";

export const MapContext = React.createContext();

export const MapProvider = (props) => {
	const [states, setStates] = useState([]);
	const [singleState, setSingleState] = useState({});

	const getStates = () => {
		return fetch(`http://localhost:8000/states`)
			.then((response) => response.json())
			.then(setStates);
	};

	const getStateById = (stateId) => {
		return fetch(`http://localhost:8000/states/${stateId}`,{
      headers: {
				Authorization: `Token ${localStorage.getItem("VV_User")}`,
				"Content-Type": "application/json",
			},
    })
			.then((response) => response.json())
			.then(setSingleState);
	};

	return (
		<MapContext.Provider
			value={{
				states,
        singleState,
				getStates,
        getStateById
			}}
		>
			{props.children}
		</MapContext.Provider>
	);
};

// getStateById(51).then(() => {history.push(`/state/${51}`)})