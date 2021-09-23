import React, { useContext, useEffect } from "react";
import {useHistory, useParams} from "react-router-dom";
import { EventImageContext } from "./EventImageProvider";

export const EventImageList = () => {
	const { eventImages, getEventImagesByEventId, getEventImages } =
		useContext(EventImageContext);
	console.log(eventImages);

	const { eventId } = useParams();

  console.log(eventId)

	useEffect(() => {
		getEventImagesByEventId(eventId);
	}, []);

	return (
		<>
			<p style={{ color: "white" }}>YOURE SO CLOSE</p>
      
			{eventImages.map((image) => {
				return (
					<>
						<div>{image.event.name}</div>
					</>
				);
			})}
		</>
	);
};
