import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
	useEffect(() => {
		if (!localStorage.getItem("optima-admin-token")) {
			window.location.href = "/login";
		}
	}, []);

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
					Welcome to Optima 2025 Admin Portal
				</h1>
				<Link to="/ca-applicant">
					<Button variant="primary" className="btn-lg">
						CA Applications
					</Button>
				</Link>
				<Link to="/ca-selected">
					<Button variant="primary" className="btn-lg ms-3">
						Selected CAs
					</Button>
				</Link>
				<Link to="/queries">
					<Button variant="primary" className="btn-lg ms-3">
						Queries
					</Button>
				</Link>
				<Link to="/participants">
					<Button variant="primary" className="btn-lg ms-3">
						Participants
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default Home;
