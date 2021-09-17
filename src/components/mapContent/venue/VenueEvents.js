import React, { useContext, useParams, useHistory, useEffect } from "react";
import { EventContext } from "../events/EventProvider";
import { MapContext } from "../MapProvider";
export const VenueEvents = ({ venue }) => {

  const {deleteEvent } = useContext(EventContext)
	const date = new Date().toISOString().slice(0, 10);

// ? state of events not updating when deleted
	return (
		<>
			<div>
				<div>
					<h3>PAST</h3>
					{venue.venue_events?.map((venueEvents) => {
						if (venueEvents.date_of_event <= date) {
							return <div key={venueEvents.id}>{venueEvents.name}</div>;
						}
					})}
				</div>
				<div>
					<h3>FUTURE</h3>
					{venue.venue_events?.map((venueEvents) => {
						if (venueEvents.date_of_event >= date) {
							return (
								<>
									<div className="futureEventFlex">
										<div value={venueEvents.id} key={venueEvents.id}>{venueEvents.name}</div>
										<button onClick={() => {
                      deleteEvent(venueEvents.id)
                      
                    }}style={{marginLeft:"1rem"}}>Delete</button>
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
