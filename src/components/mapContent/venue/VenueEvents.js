import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { EventContext } from "../events/EventProvider";
import { MapContext } from "../MapProvider";

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
										<div value={venueEvents.id} key={venueEvents.id}>
											{venueEvents.name} 
                      <br />
                      {venueEvents.date_of_event}
										</div>
										<button
											onClick={() => {
												handleDelete(venueEvents.id);
											}}
											style={{ marginLeft: "auto" }}
										>
											Delete
										</button>
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
										<div key={venueEvents.id}>
                      {venueEvents.name}
                      <br/>
                      {venueEvents.date_of_event}
                      </div>

										<button
											onClick={() => {
												history.push(`/${stateId}/event/update/${venueEvents.id}`)
											}}
											style={{ marginLeft: "auto" }}
										>
											Update
										</button>
										<button
											onClick={() => {
												handleDelete(venueEvents.id);
											}}
											style={{ marginLeft: "1rem" }}
										>
											Delete
										</button>
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
