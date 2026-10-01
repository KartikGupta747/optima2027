import React, { useEffect, useState } from "react";
import { callBackend } from "./callBackend.js";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const CASelected = () => {
	const [students, setStudents] = useState([]); // State to hold all students
	const [loading, setLoading] = useState(true); // Loading state

	// Fetch all students on component mount
	const loadStudents = async () => {
		if (!localStorage.getItem("optima-admin-token")) {
			window.location.href = "/login";
		}
		callBackend({
			method: "GET",
			endpoint: "/admin/selected-cas",
			data: "",
			setLoading,
			onSuccess: (res) => {
				setStudents(res.data);
			},
		});
	};

	useEffect(() => {
		loadStudents();
	}, []);

	if (loading) {
		return (
			<div className="admin-container">
				<h1 className="admin-heading">Selected Campus Ambassadors</h1>
				<Spinner animation="border" variant="primary" />
			</div>
		);
	}

	return (
		<div className="admin-container">
			<h1 className="admin-heading">Selected CAs</h1>
			Total Selected: {students.length}
			{students.length > 0 ? (
				<table className="table table-bordered table-striped">
					<thead className="thead-dark">
						<tr>
							<th style={{ width: "300px" }}>CA ID</th>
							<th style={{ width: "150px" }}>First Name</th>
							<th style={{ width: "150px" }}>Last Name</th>
							<th style={{ width: "100px" }}>Gender</th>
							<th style={{ width: "200px" }}>College</th>
							<th style={{ width: "350px" }}>Email</th>
							<th style={{ width: "150px" }}>Phone</th>
							<th style={{ width: "150px" }}>City</th>
							<th style={{ width: "150px" }}>State</th>
							<th style={{ width: "300px" }}>Registrations</th>
							<th style={{ width: "100px" }}>
								Registration Link
							</th>
						</tr>
					</thead>
					<tbody>
						{students.map((student, index) => (
							<tr key={index}>
								<td
									style={{
										width: "300px",
										wordBreak: "break-word",
									}}
								>
									{student.caID}
								</td>
								<td
									style={{
										width: "150px",
										wordBreak: "break-word",
									}}
								>
									{student.firstName}
								</td>
								<td
									style={{
										width: "150px",
										wordBreak: "break-word",
									}}
								>
									{student.lastName}
								</td>
								<td
									style={{
										width: "100px",
										textAlign: "center",
									}}
								>
									{student.gender}
								</td>
								<td
									style={{
										width: "200px",
										wordBreak: "break-word",
									}}
								>
									{student.college}
								</td>
								<td
									style={{
										width: "350px",
										wordBreak: "break-word",
									}}
								>
									<a href={`mailto:${student.email}`}>
										{student.email}
									</a>
								</td>
								<td
									style={{
										width: "150px",
										textAlign: "center",
									}}
								>
									<a href={`tel:${student.phone}`}>
										{student.phone}
									</a>
									<FaWhatsapp
										className="CaDashboard-icon"
										onClick={() =>
											window.open(
												`https://wa.me/${student.phone}`
											)
										}
									/>
								</td>
								<td
									style={{
										width: "150px",
										wordBreak: "break-word",
									}}
								>
									{student.city}
								</td>
								<td
									style={{
										width: "150px",
										wordBreak: "break-word",
									}}
								>
									{student.state}
								</td>
								<td
									style={{
										width: "300px",
										wordBreak: "break-word",
									}}
								>
									Registrations: {student.participants.length}
									<br />
									Payments:{" "}
									{
										student.participants.filter(
											(part) => part.paymentStatus
										).length
									}
									<br />
									<br />
									{student.participants.map((part, idx) => (
										<Link
											key={idx}
											to={`/participant/${part.OPID}`}
											style={{
												display: "block",
												marginBottom: "5px",
											}}
										>
											{part.OPID}{" "}
											{part.paymentStatus ? "✅" : ""}
										</Link>
									))}
								</td>
								<td
									style={{
										width: "100px",
										textAlign: "center",
									}}
								>
									<button
										className="btn btn-primary"
										onClick={(e) => {
											navigator.clipboard.writeText(
												`https://optima.org.in/register?caID=${student.caID}`
											);
											e.target.innerText = "Copied!";
											setTimeout(() => {
												e.target.innerText =
													"Copy Link";
											}, 1000);
										}}
									>
										Copy
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No students have been selected yet.</p>
			)}
		</div>
	);
};

export default CASelected;
