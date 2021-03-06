import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "../auth/Auth.css";
import "../../../components/mapContent/events/Event.css";
import loginLogo from "../../../images/VVlogo.png";

export const Login = () => {
	const username = useRef();
	const password = useRef();
	const invalidDialog = useRef();
	const history = useHistory();

	const handleLogin = (e) => {
		e.preventDefault();

		return fetch("http://127.0.0.1:8000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				username: username.current.value,
				password: password.current.value,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if ("valid" in res && res.valid) {
					localStorage.setItem("VV_User", res.token);
					history.push("/");
				} else {
					invalidDialog.current.showModal();
				}
			});
	};

	return (
		<main className="container--login">
			<dialog className="dialog dialog--auth" ref={invalidDialog}>
				<div>Username or password was not valid.</div>
				<button
					className="button--close"
					onClick={(e) => invalidDialog.current.close()}
				>
					Close
				</button>
			</dialog>

			<form className="FormContainer" onSubmit={handleLogin}>
				<img
					className="loginLogo"
					src={loginLogo}
					style={{ maxHeight: "10rem", marginTop: "2rem" }}
				/>
				<div className="FormBox">
					<fieldset>
						<input
							className="FormField"
							style={{ padding: "0.8rem" }}
							ref={username}
							type="text"
							id="username"
							placeholder="Username"
							required
							autoFocus
						/>
					</fieldset>
					<fieldset>
						<input
							className="FormField"
							style={{ padding: "0.8rem" }}
							ref={password}
							type="password"
							id="password"
							placeholder="Password"
							required
						/>
					</fieldset>

					<button
						className="SubmitButton"
						style={{ marginLeft: "0", marginRight: "0", marginTop: "2rem" }}
						type="submit"
					>
						Sign In
					</button>
				</div>
			</form>

			<section>
				<Link style={{ color: "white" }} to="/register">
					Don't have an account yet? Click here to sign up!
				</Link>
			</section>
		</main>
	);
};
