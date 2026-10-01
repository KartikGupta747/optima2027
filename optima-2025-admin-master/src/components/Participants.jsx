import React, { useEffect, useState } from "react";
import { callBackend } from "./callBackend.js";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

// New halls mapping for filtering
const halls = {
	NA: "Non-Accomodation",
	RP: "RP",
	RK: "RK",
	AZ: "Azad",
	MT: "MT",
	SNVH: "SNVH",
};

const Participants = () => {
	const [participants, setParticipants] = useState([]); // State to hold all participants
	const [loading, setLoading] = useState(true); // Loading state

	const [onlyPaid, setOnlyPaid] = useState(0);
	// 0 for all
	// 1 non-paid
	// 2 for paid without accommodation - 1000
	// 3 for paid with accommodation - 1200
	// 4 for all paid

	// New state for searchTerm
	const [searchTerm, setSearchTerm] = useState("");
	// New state for reported filter: "all", "reported", "notReported"
	const [reportedFilter, setReportedFilter] = useState("all");
	// New state for hall filter (applies when reportedFilter is "reported")
	const [hallFilter, setHallFilter] = useState("");

	// Fetch all participants on component mount
	const loadStudents = async () => {
		if (!localStorage.getItem("optima-admin-token")) {
			window.location.href = "/login";
		}
		callBackend({
			method: "GET",
			endpoint: "/admin/participants/",
			data: "",
			setLoading,
			onSuccess: (res) => {
				if (onlyPaid === 1) {
					setParticipants(
						res.data.filter((participant) => participant.paymentAmount === 0)
					);
				} else if (onlyPaid === 2) {
					setParticipants(
						res.data.filter((participant) => participant.paymentAmount === 1000)
					);
				} else if (onlyPaid === 3) {
					setParticipants(
						res.data.filter((participant) => participant.paymentAmount === 1200)
					);
				} else if (onlyPaid === 4) {
					setParticipants(
						res.data.filter(
							(participant) =>
								participant.paymentAmount === 1000 ||
								participant.paymentAmount === 1200
						)
					);
				} else {
					setParticipants(res.data);
				}
			},
		});
	};

	useEffect(() => {
		loadStudents();
	}, [onlyPaid]);

	// Apply filters: search, reported status and hall filter
	const filteredParticipants = participants
		.filter((participant) => {
			const term = searchTerm.toLowerCase();
			return (
				participant.OPID.toLowerCase().includes(term) ||
				participant.fullName.toLowerCase().includes(term)
			);
		})
		.filter((participant) => {
			if (reportedFilter === "reported") {
				return participant.accomodationHostel;
			} else if (reportedFilter === "notReported") {
				return !participant.accomodationHostel;
			}
			return true;
		})
		.filter((participant) => {
			if (reportedFilter === "reported" && hallFilter) {
				return participant.accomodationHostel === hallFilter;
			}
			return true;
		});

	if (loading) {
		return (
			<div className="admin-container">
				<h1 className="admin-heading">Optima 2025 Registrations</h1>
				<Spinner animation="border" variant="primary" />
			</div>
		);
	}

	return (
		<div className="admin-container">
			<h1 className="admin-heading">Optima 2025 Registrations</h1>
			{/* New search input */}
			<div className="mb-2">
				<input
					type="text"
					className="form-control"
					style={{ maxWidth: "300px" }}
					placeholder="Search by OPID or Name"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<div className="mb-2">
				<select
					className="form-select"
					style={{ maxWidth: "300px" }}
					value={onlyPaid}
					onChange={(e) => setOnlyPaid(Number(e.target.value))}
				>
					<option value={0}>All Registrations</option>
					<option value={1}>Non-Paid Registrations</option>
					<option value={2}>Paid without Accommodation (Rs. 1000)</option>
					<option value={3}>Paid with Accommodation (Rs. 1200)</option>
					<option value={4}>All Paid Registrations</option>
				</select>
			</div>
			{/* New reported filter dropdown */}
			<div className="mb-2">
				<select
					className="form-select"
					style={{ maxWidth: "300px" }}
					value={reportedFilter}
					onChange={(e) => {
						setReportedFilter(e.target.value);
						setHallFilter(""); // Reset hall filter when reported filter changes
					}}
				>
					<option value="all">All Participants</option>
					<option value="reported">Reported Participants</option>
					<option value="notReported">Not Reported Participants</option>
				</select>
			</div>
			{/* Conditional hall filter for reported participants */}
			{reportedFilter === "reported" && (
				<div className="mb-2">
					<select
						className="form-select"
						style={{ maxWidth: "300px" }}
						value={hallFilter}
						onChange={(e) => setHallFilter(e.target.value)}
					>
						<option value="">All Halls</option>
						{Object.keys(halls).map((key) => (
							<option key={key} value={key}>
								{halls[key]}
							</option>
						))}
					</select>
				</div>
			)}
			<p>
				Total{" "}
				{onlyPaid === 0
					? "All Registrations"
					: onlyPaid === 1
					? "Non-Paid Registrations"
					: onlyPaid === 2
					? "Paid without Accommodation"
					: onlyPaid === 3
					? "Paid with Accommodation"
					: "All Paid Registrations"}{" "}
				Participants: {filteredParticipants.length}
			</p>
			{filteredParticipants.length > 0 ? (
				<table className="table table-bordered table-striped">
					<thead className="thead-dark">
						<tr>
							<th style={{ width: "300px" }}>OPID</th>
							<th style={{ width: "150px" }}>Full Name</th>
							<th style={{ width: "100px" }}>Gender</th>
							<th style={{ width: "200px" }}>College</th>
							<th style={{ width: "350px" }}>City</th>
							<th style={{ width: "350px" }}>Email</th>
							<th style={{ width: "150px" }}>Phone</th>
							<th style={{ width: "300px" }}>CA ID</th>
							<th style={{ width: "300px" }}>Payment Status</th>
						</tr>
					</thead>
					<tbody>
						{filteredParticipants.map((participant, index) => (
							<tr key={index}>
								<td>
									<Link to={"/participant/" + participant.OPID} target="_blank">
										{participant.OPID}
									</Link>
								</td>
								<td>{participant.fullName}</td>
								<td>{participant.gender}</td>
								<td>{participant.college}</td>
								<td>{participant.city}</td>
								<td>
									<a href={`mailto:${participant.email}`}>
										{participant.email}
									</a>
								</td>
								<td>
									<a href={`tel:${participant.phone}`}>{participant.phone}</a>
									<FaWhatsapp
										className="CaDashboard-icon"
										onClick={() =>
											window.open(`https://wa.me/+91${participant.phone}`)
										}
									/>
								</td>
								<td>{participant.caID}</td>
								<td>{"" + participant.paymentStatus}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No participants found.</p>
			)}
		</div>
	);
};

export default Participants;
