import React, { useEffect, useContext } from "react";

import { MapContext } from "./MapProvider";

export const MapMap = () => {

  const { states, getStates } = useContext(MapContext)

  useEffect(() => {
    getStates()
  }, []) 

  return (
    <select>
        {states.map((state) => {
          return(
            <option key={state.id} value={state.id}>{state.name}</option>
          )
        })}
    </select>
  )
}