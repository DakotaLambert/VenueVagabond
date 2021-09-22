import React, { useContext, useEffect, useState, useParams } from "react";
import { useHistory } from "react-router-dom";
import { MapMap } from "../MapMap";
import { MapContext } from "../MapProvider";
import { VenueContext } from "./VenueProvider";

import "../venue/VenueStyles.css";
export const VenueForm = () => {
	const { venues, createVenue, getVenues, deleteVenue } =
		useContext(VenueContext);

	// ?TRACK STATE ID THROUGH MAP MAP

	const [venue, setVenue] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const handleControlledInputChange = (event) => {
		const newVenue = { ...venue };
		newVenue[event.target.name] = event.target.value;
		setVenue(newVenue);
	};

	const handleSaveVenue = () => {
		setIsLoading(true);
		createVenue({
			name: venue.name,
			stateId: venue.stateId,
		}).then(() => {
			clearForm();
		});
	};
	const clearForm = () => {
		document.getElementById("venueForm").reset();
	};
	useEffect(() => {
		getVenues();
	}, []);

	useEffect(() => {
		setIsLoading(false);
	}, [venue]);

	return (
		<>
			<form className="FormContainer" id="venueForm">
				<div className="FormBox">
					<fieldset className="FormSet">
						<div>
							<input
								className="FormField"
								type="text"
								id="name"
								name="name"
								required
								autoFocus
								placeholder="Venue Name"
								onChange={handleControlledInputChange}
							/>
						</div>
					</fieldset>
					<fieldset className="FormSet">
						<MapMap handleControlledInputChange={handleControlledInputChange} />
					</fieldset>
					<div>
						<button
							className="SubmitButton"
							disabled={isLoading}
							onClick={(event) => {
								event.preventDefault();
								handleSaveVenue();
								setVenue("");
							}}
						>
							Save Venue
						</button>
					</div>
				</div>
			</form>
			<div
				className="venueListContainer myOtherBox"
				onChange={handleControlledInputChange}
				name="venueId"
			>
				{venues.map((venue) => {
					return (
						<>
							<div className="venueListFlexBasis">
								<div
									key={venue.id}
									value={venue.id}
									style={{ fontSize: "25px" }}
								>
									{venue.name}
								</div>
								<div>{venue.state.abbreviation}</div>
								<div>
									<button
										onClick={() => {
											deleteVenue(venue.id);
										}}
									>
										Delete
									</button>
								</div>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
};
