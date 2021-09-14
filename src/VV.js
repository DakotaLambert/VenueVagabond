import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AppViews } from "../src/AppView";
import { Login } from "../src/components/mapContent/auth/Login";
import { Register } from "../src/components/mapContent/auth/Register";
import { MapProvider } from "./components/mapContent/MapProvider";

export const VV = () => (
	<>
  <MapProvider>
		<Route
			render={() => {
				if (localStorage.getItem("VV_User")) {
					return (
						<>
							<AppViews />
						</>
					);
				} else {
					return <Redirect to="/login" />;
				}
			}}
		/>

		<Route
			path="/login"
			render={() => {
				if (localStorage.getItem("VV_User")) {
					return <Redirect to="/" />;
				} else {
					return <Login />;
				}
			}}
		/>

		<Route
			path="/register"
			render={() => {
				if (localStorage.getItem("VV_User")) {
					return <Redirect to="/" />;
				} else {
					return <Register />;
				}
			}}
		/>
    </MapProvider>
	</>
);
