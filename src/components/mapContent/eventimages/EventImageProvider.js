import React, { useState } from "react";

export const EventImageContext = React.createContext();

export const EventImageProvider = (props) => {
  const [eventImages, setEventImages] = useState([]);

  const getEventImages = () => {
    return fetch(`http://localhost:8000/eventimages`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("VV_User")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(setEventImages);
  };
  const getEventImagesByEventId = (eventId) => {
    return fetch(`http://localhost:8000/eventimages/${eventId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("VV_User")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(setEventImages);
  };

  return (
    <EventImageContext.Provider
      value={{
        eventImages,
        getEventImages,
        getEventImagesByEventId,
      }}
    >
      {props.children}
    </EventImageContext.Provider>
  );
};
