import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./NavBar.css";
import Logo from "../../../images/VVlogo.png";
import logoutDoor from "../../../images/logoutButton.png";
export const NavBar = () => {
	const history = useHistory();
	const [menuActive, setMenuActive] = useState(false);

	const showMenu = () => {
		return (
			
				<ul className="menu">
					<li style={{ marginBottom: ".5rem" }}>
						<Link
							onClick={() => {
								setMenuActive(false);
							}}
							to="/venuemanager"
						>
							Venue Manager
						</Link>
					</li>
					<li style={{ marginBottom: ".5rem" }}>
						<Link
							onClick={() => {
								setMenuActive(false);
							}}
							to="/eventtypemanager"
						>
							Event Type Manager
						</Link>
					</li>
					{/* <li>
						<Link
							onClick={() => {
								setMenuActive(false);
							}}
							to="/allevents"
						>
							All Events
						</Link>
					</li> */}
				</ul>
			
		);
	};

	return (
		<>
			<ul className="navbar">
				<div className="navSpace"></div>
				<li className="">
					<Link
						to="/"
						onClick={() => {
							setMenuActive(false);
						}}
					>
						<img className="navbar__logo" src={Logo} />
					</Link>
				</li>
				<div
					onClick={() => {
						if (menuActive) {
							setMenuActive(false);
						} else {
							setMenuActive(true);
						}
					}}
					className="navbar__item menuProfileImage"
					style={{ backgroundColor: "white", cursor: "pointer" }}
				></div>
				{localStorage.getItem("VV_User") !== null ? (
					<li className="navbar__item">
						<img
							onClick={() => {
								localStorage.removeItem("VV_User");
								history.push("/");
							}}
							style={{ maxHeight: "2.5rem", cursor: "pointer" }}
							className="logoutButton nav-link fakeLink"
							src={logoutDoor}
						/>
					</li>
				) : (
					<>
						<li className="nav-item">
							<Link className="nav-link" to="/login">
								Login
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/register">
								Register
							</Link>
						</li>
					</>
				)}{" "}
				<div className="navSpace"></div>
			</ul>
			{menuActive ? showMenu() : ""}
		</>
	);
};
