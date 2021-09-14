import React, { useState } from "react";

export const MapContext = React.createContext();

export const MapProvider = (props) => {
	const [states, setStates] = useState([]);

	const getStates = () => {
		return fetch(`http://localhost:8000/states`)
			.then((response) => response.json())
			.then(setStates);
	};

	return (
		<MapContext.Provider
			value={{
				states,
				getStates,
			}}
		>
			{props.children}
		</MapContext.Provider>
	);
};
