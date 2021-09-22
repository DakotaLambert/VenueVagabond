import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { EventContext } from "../events/EventProvider";
import { MapContext } from "../MapProvider";

import editButton from "../../../images/editButton.png"
import deleteButton from "../../../images/deleteButton.png"
export const VenueEvents = ({ venue }) => {
	const { getStateById } = useContext(MapContext);
	const { deleteEvent } = useContext(EventContext);

	const date = new Date().toISOString().slice(0, 10);

	const history = useHistory();
	const { stateId } = useParams();

	const handleDelete = (vid) => {
		deleteEvent(vid).then(() => {
			getStateById(stateId);
		});
	};

  const editEventButton = (event_id) => {
		return (
			<button
        className="myEventEditButton"
				id={`event--${event_id}`}
				onClick={(event) => {
					event.preventDefault();
					handleUpdateEvent(event_id);
				}}
			>
				Edit Event
			</button>
		);
	};

	const handleUpdateEvent = (event_id) => {
		history.push(`/events/edit/${event_id}`);
	};

	// ? state of events not updating when deleted

	return (
		<>
			<div>
				<h3>FUTURE</h3>
				<div className="myBox">
					{venue.venue_events?.map((venueEvents) => {
						if (venueEvents.date_of_event >= date) {
							return (
								<>
									<div className="futureEventFlex">
										<div style={{textAlign:"start"}}value={venueEvents.id} key={venueEvents.id}>
											{venueEvents.name} 
                      <br />
                      {venueEvents.date_of_event}
										</div>
										<img
                    src={deleteButton}
											onClick={() => {
												handleDelete(venueEvents.id);
											}}
											style={{ marginLeft: "auto", maxHeight:"2rem", cursor:"pointer" }} 
										/>
									</div>
								</>
							);
						}
					})}
				</div>
			</div>
			<div>
				<h3>PAST</h3>
				<div className="myBox">
					{venue.venue_events?.map((venueEvents) => {
						if (venueEvents.date_of_event <= date) {
							return (
								<>
									<div
										style={{ marginBottom: "1rem" }}
										className="futureEventFlex"
									>
										<div 
                    style={{textAlign:"start"}}
                    key={venueEvents.id}>
                      {venueEvents.name}
                      <br/>
                      {venueEvents.date_of_event}
                      </div>

										<img
                    
                    src={editButton}
											onClick={() => {
												history.push(`/${stateId}/event/update/${venueEvents.id}`)
											}}
											style={{ marginLeft: "auto", maxHeight:"2rem", cursor:"pointer" }}
										/>
											
										
										<img
                    src={deleteButton}
											onClick={() => {
												handleDelete(venueEvents.id);
											}}
											style={{ marginLeft: "1rem", maxHeight:"2rem", cursor:"pointer" }} 
										/>
											
									</div>
								</>
							);
						}
					})}
				</div>
			</div>
		</>
	);
};
