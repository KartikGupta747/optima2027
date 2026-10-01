import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";

function NavScrollExample() {
	const navigate = useNavigate();

	return (
		<Navbar
			expand="lg"
			style={{
				backgroundColor: "#1a1a1a", // Dark theme
				borderBottom: "2px solid #ff8c00", // Orange border
			}}
			variant="dark" // Dark text theme for Navbar
			fixed="top"
		>
			<Container fluid>
				<Navbar.Brand
					as={Link}
					to="/"
					style={{
						color: "#ff8c00", // Orange brand text
						fontSize: "1.5rem",
					}}
				>
					Optima 2025 Admin Portal
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls="navbarScroll"
					style={{ borderColor: "#ff8c00" }} // Orange toggle border
				/>
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						navbarScroll
						style={{ alignItems: "center" }}
					>
						<Nav.Link
							as={Link}
							to="/ca-applicant"
							style={{
								color: "#f0f0f0",
								fontSize: "1.2rem",
								margin: "0 10px",
							}}
							className="nav-link-hover"
						>
							CA Applications
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="/ca-selected"
							style={{
								color: "#f0f0f0",
								fontSize: "1.2rem",
								margin: "0 10px",
							}}
							className="nav-link-hover"
						>
							Selected CA
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="/queries"
							style={{
								color: "#f0f0f0",
								fontSize: "1.2rem",
								margin: "0 10px",
							}}
							className="nav-link-hover"
						>
							Queries
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="/participants"
							style={{
								color: "#f0f0f0",
								fontSize: "1.2rem",
								margin: "0 10px",
							}}
							className="nav-link-hover"
						>
							Participants
						</Nav.Link>
					</Nav>
					{localStorage.getItem("optima-admin-token") && (
						<Button
							variant="danger"
							className="ms-2"
							onClick={(e) => {
								e.preventDefault();
								localStorage.removeItem("optima-admin-token");
								navigate("/login");
							}}
						>
							<i className="fas fa-sign-out-alt" /> Logout
						</Button>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavScrollExample;
