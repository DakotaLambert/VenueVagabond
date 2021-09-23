import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { EventContext } from "../events/EventProvider";
import { MapContext } from "../MapProvider";
import { EventImageContext } from "../eventimages/EventImageProvider";

import editButton from "../../../images/editButton.png";
import deleteButton from "../../../images/deleteButton.png";

import "../../../components/mapContent/eventimages/EventImageStyles.css";
// import { EventImageList } from "../eventimages/EventImageList";

export const VenueEvents = ({ venue }) => {
	const { getStateById } = useContext(MapContext);
	const { deleteEvent } = useContext(EventContext);
	const { getEventImagesByEventId } = useContext(EventImageContext);

	const [menuActive, setMenuActive] = useState(false);

	const date = new Date().toISOString().slice(0, 10);

	const history = useHistory();
	const { stateId } = useParams();

	const showMenu = () => {
		return (
			<div id="demo-modal" className="modal">
				<div className="modal__content">
					<p>absolutely dude</p>
					<div className="modal__footer">VV ©</div>

					<a
						style={{ cursor: "pointer" }}
						onClick={() => {
							if (menuActive) {
								setMenuActive(false);
							} else {
								setMenuActive(true);
							}
						}}
						className="modal__close"
					>
						&times;
					</a>
				</div>
			</div>
		);
	};

	const handleDelete = (vid) => {
		deleteEvent(vid).then(() => {
			getStateById(stateId);
		});
	};

	// ? check for state-venues length and show something else if 0

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
										<div
											style={{ textAlign: "start", fontSize: "20px" }}
											value={venueEvents.id}
											key={venueEvents.id}
										>
											{venueEvents.name}
											<br />
											{venueEvents.date_of_event}
										</div>
										<img
											src={deleteButton}
											onClick={() => {
												handleDelete(venueEvents.id);
											}}
											style={{
												marginLeft: "auto",
												maxHeight: "2rem",
												cursor: "pointer",
												alignSelf: "center",
											}}
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
											style={{ textAlign: "start", fontSize: "19px" }}
											key={venueEvents.id}
										>
											<div
												value={venueEvents.id}
												onClick={() => {
													// if (menuActive) {
													// 	setMenuActive(false);
													// } else {
													// 	setMenuActive(true);
													// }
													history.push(`/${venueEvents.id}/images`);
												}}
												style={{ color: "white", cursor: "pointer" }}
											>
												{venueEvents.name}
												<br />
												{venueEvents.date_of_event}
											</div>
										</div>

										<img
											src={editButton}
											onClick={() => {
												history.push(
													`/${stateId}/event/update/${venueEvents.id}`
												);
											}}
											style={{
												marginLeft: "auto",
												maxHeight: "2rem",
												cursor: "pointer",
												alignSelf: "center",
											}}
										/>

										<img
											src={deleteButton}
											onClick={() => {
												handleDelete(venueEvents.id);
											}}
											style={{
												marginLeft: "1rem",
												maxHeight: "2rem",
												cursor: "pointer",
												alignSelf: "center",
											}}
										/>
									</div>
								</>
							);
						}
					})}
					{menuActive ? showMenu() : ""}
				</div>
			</div>
		</>
	);
};
