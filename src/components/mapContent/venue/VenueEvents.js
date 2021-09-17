import React, { useContext, useHistory, useEffect } from "react";
import { useParams } from "react-router";
import { EventContext } from "../events/EventProvider";
import { MapContext } from "../MapProvider";
export const VenueEvents = ({ venue }) => {

	const {getStateById } = useContext(MapContext);
  const {deleteEvent } = useContext(EventContext)

	const date = new Date().toISOString().slice(0, 10);

	const { stateId } = useParams();

  const handleDelete = (vid) => {
    deleteEvent(vid).then(()=> {
      getStateById(stateId)
    })
  }

// ? state of events not updating when deleted

	return (
		<>
			<div>
					<h3>PAST</h3>
				<div className="myBox">
					{venue.venue_events?.map((venueEvents) => {
						if (venueEvents.date_of_event <= date) {
							return <div style={{marginBottom:"1rem"}} key={venueEvents.id}>{venueEvents.name}</div>;
						}
					})}
				</div>
				<div>
					<h3>FUTURE</h3>
          <div className="myBox">
					{venue.venue_events?.map((venueEvents) => {
						if (venueEvents.date_of_event >= date) {
							return (
								<>
									<div className="futureEventFlex">
										<div value={venueEvents.id} key={venueEvents.id}>{venueEvents.name}</div>
										<button onClick={() => {
                      handleDelete(venueEvents.id)
                      
                    }}style={{marginLeft:"1rem"}}>Delete</button>
									</div>
								</>
							);
						}
					})}
          </div>
				</div>
			</div>
		</>
	);
};
