import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./NavBar.css";
import Logo from "../../../images/VVlogo.png";
import logoutDoor from "../../../images/logoutButton.png";
import menuBurg from "../../../images/menuButton.png"


export const NavBar = () => {
	const history = useHistory();
	const [menuActive, setMenuActive] = useState(false);

	const showMenu = () => {
		return (
			<div id="demo-modal" className="modal">
				<div className="modal__content">
					<h1>Menu</h1>

					<p>
						<Link
							style={{ fontSize: "20px" }}
							onClick={() => {
								setMenuActive(false);
							}}
							to="/venuemanager"
						>
							Venue Manager
						</Link>
					</p>
					<p>
						<Link
							style={{ fontSize: "20px" }}
							onClick={() => {
								setMenuActive(false);
							}}
							to="/eventtypemanager"
						>
							Event Type Manager
						</Link>
					</p>
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

	return (
		<>
			<ul className="navbar">
				<div className="navSpace"></div>
				
					<Link
						to="/"
						onClick={() => {
							setMenuActive(false);
						}}
					>
						<img className="navbar__logo" src={Logo} />
					</Link>
				
				<button
          className="navbar__item eventListButton"
					onClick={() => {
						if (menuActive) {
							setMenuActive(false);
						} else {
							setMenuActive(true);
						}
					}}
					
				><img src={menuBurg} style={{maxHeight:"1rem"}}/></button>
				{localStorage.getItem("VV_User") !== null ? (
					
						<img
							onClick={() => {
								localStorage.removeItem("VV_User");
								history.push("/");
							}}
							style={{ maxHeight: "2.5rem", cursor: "pointer" }}
							className="logoutButton nav-link fakeLink"
							src={logoutDoor}
						/>
					
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
