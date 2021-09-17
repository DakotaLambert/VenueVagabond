import React, { useContext, useParams, useHistory, useEffect } from "react";
import { EventContext } from "./EventProvider";

export const AllEvents = () => {
  const { events, getEvents} = useContext(EventContext)

  useEffect(() => {
    getEvents()
  },[])

  return(
    <>
    <div>{events.event.name}</div>
    </>
  )
}