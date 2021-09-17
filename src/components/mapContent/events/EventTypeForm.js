import React, {
	useContext,
	useRef,
	useEffect,
	useState,
	useParams,
} from "react";
import { useHistory } from "react-router-dom";
import { EventTypeContext } from "./EventTypeProvider";

export const EventTypeForm = () => {
	const { eventTypes, createEventType, getEventTypes } =
		useContext(EventTypeContext);

	const [eventType, setEventType] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const handleControlledInputChange = (event) => {
		const newEventType = { ...eventType };
		newEventType[event.target.id] = event.target.value;
		setEventType(newEventType);
	};

	const handleSaveEventType = () => {
		setIsLoading(true);
		createEventType({
			label: eventType.label,
		}).then(clearForm());
	};

  const clearForm = () => { 
    document.getElementById("eventTypeForm").reset();
  }

	useEffect(() => {
		getEventTypes();
	}, []);

	useEffect(() => {
		setIsLoading(false);
	}, [eventType]);

	return (
		<>
			<form className="FormContainer" id="eventTypeForm">
				<div className="FormBox">
					<fieldset className="FormSet">
						<div>
							<input
								className="FormField"
								type="text"
								id="label"
								name="label"
								required
								autoFocus
								placeholder="Type Event Type Here"
								onChange={handleControlledInputChange}
							/>
						</div>
					</fieldset>
					<div>
						<button
							className="SubmitButton"
							disabled={isLoading}
							onClick={(event) => {
								event.preventDefault();
								handleSaveEventType();

							}}
						>
							Save Event Type
						</button>
					</div>
				</div>
			</form>
			<div
				className="FormField"
				onChange={handleControlledInputChange}
				name="eventTypeId"
			>
				{eventTypes.map((type) => {
					return (
						<div key={type.id} value={type.id}>
							{type.label}
						</div>
					);
				})}
			</div>
		</>
	);
};
