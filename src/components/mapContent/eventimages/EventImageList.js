import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { EventContext } from "../events/EventProvider";
import { EventImageContext } from "./EventImageProvider";

import "../eventimages/EventImageStyles.css";
import backButton from "../../../images/backButton.png";

export const EventImageList = () => {
	const { events, getEventById } = useContext(EventContext);
	const [eventImages, setEventImages] = useState([]);
	console.log(eventImages);

	const { eventId } = useParams();

	const history = useHistory();

	useEffect(() => {
		getEventById(eventId).then((eventObj) => {
			const images = eventObj.event.eventimage_set.map((image) => {
				return image.image;
			});
			setEventImages(images);
		});
	}, []);

	return (
		<>
			<div style={{textAlign:"center", marginTop:"2rem"}}>
				<img
          className="backButton"
					style={{ maxHeight: "3rem", cursor: "pointer" }}
					src={backButton}
					onClick={() => {
						history.goBack([1]);
					}}
				/>
			</div>
			<div className="myImageBox">
				{eventImages.map((image) => {
					return (
						<>
							<div className="imageFlex">
								<img
									className="imageImage"
									style={{ maxHeight: "30rem", margin: "1rem" }}
									src={image}
								/>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
};
