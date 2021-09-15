import React from "react";


export const VenueEvents = ({venue}) => {

	return (
		<>
        {venue.venue_events?.map((event) => {
          return (
          <div key={event.id} style={{color:"white"}}>
            {event.name}
            {event.date_of_event}
          </div>
          )
        })}
        
		</>
	);
};
