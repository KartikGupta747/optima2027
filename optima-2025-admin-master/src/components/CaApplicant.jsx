import React, { useEffect, useState } from "react";
import { MdCall, MdCheckCircle } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { callBackend } from "./callBackend";
import { Button, Spinner } from "react-bootstrap";

const CaDashboard = () => {
	const [students, setStudents] = useState([]);
	const [isMailCopied, setIsMailCopied] = useState(null);
	const [loading, setLoading] = useState(true);

	const loadStudents = async () => {
		if (!localStorage.getItem("optima-admin-token")) {
			window.location.href = "/login";
		}
		callBackend({
			method: "GET",
			endpoint: "/admin/ca-applicant",
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

	const handleMailCopy = (email, id) => {
		navigator.clipboard
			.writeText(email)
			.catch((err) => alert("Failed to copy text:", err));
		setIsMailCopied(id);
		setTimeout(() => {
			setIsMailCopied(null);
		}, 2000);
	};

	const handleStatusChange = async (id, status) => {
		callBackend({
			method: "POST",
			endpoint: `/admin/ca-applicant/${id}`,
			data: { selected: status },
			setLoading,
			onSuccess: (res) => {
				loadStudents();
			},
		});
	};

	if (loading) {
		return (
			<div className="admin-container">
				<h1 className="admin-heading">CA Selection Panel</h1>
				<Spinner animation="border" variant="primary" />
			</div>
		);
	}

	return (
		<div className="admin-container">
			<h1 className="admin-heading">CA Selection Panel</h1>
			<div className="CaDashboard-grid">
				{students.map((student) => (
					<div
						className="CaDashboard-card"
						key={student._id}
						data-selected={student.selected}
					>
						<h1 className="CaDashboard-name">
							{student.firstName} {student.lastName}
						</h1>
						<p className="CaDashboard-description">
							<strong>Gender:</strong> {student.gender}
						</p>
						<p className="CaDashboard-description">
							<strong>College:</strong> {student.college}
						</p>
						<p className="CaDashboard-description">
							<strong>City:</strong> {student.city}
						</p>
						<p className="CaDashboard-description">
							<strong>State:</strong> {student.state}
						</p>
						<p className="CaDashboard-description">
							<strong>Reason:</strong> {student.reason}
						</p>
						<p className="CaDashboard-description">
							<MdCall size={22} /> {student.phone}
						</p>
						<div className="CaDashboard-contacts">
							{isMailCopied === student._id ? (
								<MdCheckCircle
									style={{
										color: "#777879",
										fontSize: "2rem",
									}}
								/>
							) : (
								<IoMailOutline
									onClick={() =>
										handleMailCopy(
											student.email,
											student._id
										)
									}
									className="CaDashboard-icon"
								/>
							)}
							{/* <p className="CaDashboard-copytext">
                {" "}
                {"<<"} click to copy email
              </p> */}
							<FaWhatsapp
								className="CaDashboard-icon"
								onClick={() =>
									window.open(
										`https://wa.me/${student.phone}`
									)
								}
							/>
						</div>
						<div className="CaDashboard-btn-container">
							{student.selected ? (
								<Button
									variant="danger"
									onClick={() =>
										handleStatusChange(student._id, false)
									}
								>
									De-Select
								</Button>
							) : (
								<Button
									variant="success"
									onClick={() =>
										handleStatusChange(student._id, true)
									}
								>
									Select
								</Button>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CaDashboard;
