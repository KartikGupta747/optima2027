import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { callBackend } from "./callBackend";
import { Button, Spinner } from "react-bootstrap";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("optima-admin-token")) {
			navigate("/");
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email && password) {
			callBackend({
				method: "POST",
				endpoint: "/admin/login",
				setLoading,
				data: { email, password },
				onSuccess: (res) => {
					localStorage.setItem("optima-admin-token", res.token);
					navigate("/");
				},
			});
		} else {
			toast.error("Please fill all the fields");
		}
	};

	return (
		<div
			className="container-fluid d-flex justify-content-center align-items-center"
			style={{ height: "80vh" }} // Dark background
		>
			<div
				className="w-100 text-center p-4 rounded shadow"
				style={{
					maxWidth: "700px",
					backgroundColor: "#2c2c2c", // Darker card background
					color: "#f0f0f0", // Light text
				}}
			>
				<h1 className="mb-4 display-5" style={{ color: "#ff8c00" }}>
					{" "}
					{/* Orange heading */}
					Login to Admin Portal
				</h1>

				<form
					onSubmit={handleSubmit}
					style={{ maxWidth: "400px", margin: "0 auto" }}
				>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<Button variant="primary" type="submit">
						{loading ? (
							<Spinner animation="border" size="sm" />
						) : (
							"Login"
						)}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Login;
