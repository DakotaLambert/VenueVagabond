import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { MapMap } from "../MapMap";
import "./Auth.css";

export const Register = (props) => {
	const firstName = useRef();
	const lastName = useRef();
	const stateId = useRef();
	const username = useRef();
	const password = useRef();
	const image_url = useRef();
	const email = useRef();
	const verifyPassword = useRef();
	const passwordDialog = useRef();
	const history = useHistory();
	const [currentPicture, setCurrentPicture] = useState({});
	const [stateIdChange, setStateIdChange] = useState({});

	const handleStateIDChange = (selectBox) => {
		const newStateId = { ...stateIdChange };
		newStateId[selectBox.target.name] = selectBox.target.value;
		setStateIdChange(newStateId);
	};

	const getBase64 = (file, callback) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => callback(reader.result));
		reader.readAsDataURL(file);
	};

	const createUserImageString = (event) => {
		getBase64(event.target.files[0], (base64ImageString) => {
			setCurrentPicture(base64ImageString);
		});
	};

	const handleRegister = (e) => {
		e.preventDefault();
		if (password.current.value === verifyPassword.current.value) {
			const newUser = {
				username: username.current.value,
				first_name: firstName.current.value,
				last_name: lastName.current.value,
				email: email.current.value,
				password: password.current.value,
				image_url: currentPicture,
				stateId: parseInt(stateIdChange.stateId),
			};

			return fetch("http://127.0.0.1:8000/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(newUser),
			})
				.then((res) => res.json())
				.then((res) => {
					localStorage.setItem("VV_User", res.token);
					history.push("/");
				});
		} else {
			passwordDialog.current.showModal();
		}
	};

	return (
		<main style={{ textAlign: "center", marginTop:"7rem" }}>
			<dialog className="dialog dialog--password" ref={passwordDialog}>
				<div>Passwords do not match</div>
				<button
					className="button--close"
					onClick={(e) => passwordDialog.current.close()}
				>
					Close
				</button>
			</dialog>

			<h1 className="h3 mb-3 font-weight-normal">Register</h1>
			<form className="form--login--wrap" >
				<div className="registerColumn1 form--login">
					<fieldset>
						<input
							ref={firstName}
							type="text"
							name="firstName"
							className="form-control-firstName"
							placeholder="First name"
							required
							autoFocus
						/>
					</fieldset>
					<fieldset>
						<input
							ref={lastName}
							type="text"
							name="lastName"
							className="form-control-lastName"
							placeholder="Last name"
							required
						/>
					</fieldset>
					<fieldset>
						<input
							ref={email}
							type="email"
							name="email"
							className="form-control"
							placeholder="Email address"
							required
						/>
					</fieldset>
				</div>
				<div className="registerColumn2 form--login">
					<fieldset>
						<input
							ref={username}
							type="username"
							name="username"
							className="form-control-username"
							placeholder="Username"
							required
						/>
					</fieldset>
					<fieldset>
						<input
							ref={password}
							type="password"
							name="password"
							className="form-control"
							placeholder="Password"
							required
						/>
					</fieldset>
					<fieldset>
						<input
							ref={verifyPassword}
							type="password"
							name="verifyPassword"
							className="form-control"
							placeholder="Verify password"
							required
						/>
					</fieldset>
					<fieldset>
						<MapMap handleControlledInputChange={handleStateIDChange} />
					</fieldset>
					<fieldset>
          <label for="image_url" class="custom-file-upload">
            UPLOAD PHOTO
            </label>
						<input
							type="file"
							id="image_url"
							ref={image_url}
							onChange={createUserImageString}
						/>
					</fieldset>
				</div>
			</form>
      <button onClick={handleRegister}className="registerButton" type="submit">
				
					Register
				
        </button>
			<section >
      <Link style={{color:"white"}}to="/login">Already registered? Login</Link>
			</section>
		</main>
	);
};
