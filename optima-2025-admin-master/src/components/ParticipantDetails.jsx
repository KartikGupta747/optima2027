import React, { useEffect, useState } from "react";
import { callBackend } from "./callBackend.js";
import { Spinner, Card, Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { set } from "mongoose";

const halls = {
	NA: "Non-Accomodation",
	RP: "RP",
	RK: "RK",
	AZ: "Azad",
	MT: "MT",
	SNVH: "SNVH",
};

const tshirtEnum = ["XS", "S", "M", "L", "XL", "XXL"];

const ParticipantDetails = () => {
	const params = useParams();
	const { OPID } = params;

	const [participant, setParticipant] = useState(null);
	const [loading, setLoading] = useState(true);
	const [role, setRole] = useState(0);

	const [paymentForm, setPaymentForm] = useState({
		paymentAmount: 0,
		paymentTime: null,
	});

	const [hall, setHall] = useState("");
	const [tshirtSize, setTshirtSize] = useState("");

	const loadDetails = async () => {
		if (!localStorage.getItem("optima-admin-token")) {
			window.location.href = "/login";
		}
		callBackend({
			method: "GET",
			endpoint: "/admin/participant/" + OPID,
			data: "",
			setLoading,
			onSuccess: (res) => {
				setParticipant(res.data);
				setRole(res.token);
				setLoading(false);
			},
		});
	};

	useEffect(() => {
		loadDetails();
	}, []);

	if (loading) {
		return (
			<div className="admin-container">
				<h1 className="admin-heading">Participant Details - {OPID}</h1>
				<Spinner animation="border" variant="primary" />
			</div>
		);
	}

	return (
		<div className="admin-container">
			<h1 className="admin-heading">Participant Details</h1>
			<Card className="mx-auto" style={{ maxWidth: "600px" }}>
				<Card.Header>
					<h2>
						{participant.fullName} - {OPID}
					</h2>
				</Card.Header>
				{role > 2 && (
					<>
						{role >= 3 && (
							<Card.Body>
								<h3>Update Payment Status</h3>
								{participant.paymentStatus ? (
									<Button
										variant="warning"
										onClick={() => {
											confirm(
												"Are you sure you want to mark this payment as pending?"
											) &&
												callBackend({
													method: "POST",
													endpoint: "/admin/participant/payment/" + OPID,
													data: {
														paymentStatus: false,
														paymentAmount: 0,
														paymentTime: null,
													},
													onSuccess: (res) => {
														loadDetails();
													},
												});
										}}
									>
										Remove Payment
									</Button>
								) : (
									<div>
										<h6>Payment Amount (in INR):</h6>
										<input
											type="number"
											value={paymentForm.paymentAmount}
											onChange={(e) =>
												setPaymentForm({
													...paymentForm,
													paymentAmount: e.target.value,
												})
											}
										/>
										<h6>Payment Time:</h6>
										<input
											type="datetime-local"
											value={paymentForm.paymentTime}
											onChange={(e) =>
												setPaymentForm({
													...paymentForm,
													paymentTime: e.target.value,
												})
											}
										/>

										<br />
										<br />
										<Button
											variant="success"
											onClick={() => {
												if (
													paymentForm.paymentAmount > 0 &&
													!isNaN(paymentForm.paymentAmount) &&
													paymentForm.paymentTime
												) {
													confirm(
														"Are you sure you want to mark this payment as paid?"
													) &&
														callBackend({
															method: "POST",
															endpoint: "/admin/participant/payment/" + OPID,
															data: {
																paymentStatus: true,
																paymentAmount: paymentForm.paymentAmount,
																paymentTime: paymentForm.paymentTime,
															},
															setLoading,
															onSuccess: (res) => {
																loadDetails();
															},
														});
												} else {
													alert(
														"Please enter a valid payment amount and time."
													);
												}
											}}
										>
											Mark as Paid
										</Button>
									</div>
								)}
							</Card.Body>
						)}
						{participant.paymentStatus && (
							<>
								<Card.Body>
									<h3>Report at RegDek and Hall Allocation</h3>
									{participant.accomodationHostel ? (
										<div>
											<strong>Already reported at RegDek</strong>
											<br />
											Hall Assigned: {halls[participant.accomodationHostel]}
										</div>
									) : (
										<div>
											<h6>Hall:</h6>
											<select
												value={hall}
												onChange={(e) => setHall(e.target.value)}
											>
												<option value="">Select Hall</option>
												{Object.keys(halls).map((key) => (
													<option value={key}>{halls[key]}</option>
												))}
											</select>
											<br />
											<br />
											<Button
												variant="warning"
												onClick={() => {
													confirm(
														"Are you sure you want to report this participant at RegDek (Give ID Card and assign Hall " +
															hall +
															")?"
													) &&
														callBackend({
															method: "POST",
															endpoint: "/admin/participant/report/" + OPID,
															data: {
																hall: hall,
															},
															onSuccess: (res) => {
																loadDetails();
															},
														});
												}}
											>
												Report at RegDek
											</Button>
										</div>
									)}
								</Card.Body>
								{participant.accomodationHostel && (
									<Card.Body>
										<h3>Participant Merch</h3>
										{participant.tShirtSize && participant.tShirtSize !== "" ? (
											<div>
												<strong>T-Shirt Size:</strong> {participant.tShirtSize}
											</div>
										) : (
											<div>
												<h6>T-Shirt Size:</h6>
												<select
													value={participant.tShirtSize}
													onChange={(e) => setTshirtSize(e.target.value)}
												>
													<option value="">Select T-Shirt Size</option>
													{tshirtEnum.map((size) => (
														<option value={size}>{size}</option>
													))}
												</select>
												<br />
												<br />
												<Button
													variant="warning"
													onClick={() => {
														confirm(
															"Are you sure you want to give this T-Shirt to the participant (size: " +
																tshirtSize +
																")?"
														) &&
															callBackend({
																method: "POST",
																endpoint: "/admin/participant/tshirt/" + OPID,
																data: {
																	tShirtSize: tshirtSize,
																},
																onSuccess: (res) => {
																	loadDetails();
																},
															});
													}}
												>
													Provide T-Shirt
												</Button>
											</div>
										)}
									</Card.Body>
								)}
							</>
						)}
					</>
				)}
				<Card.Body>
					<p>
						<strong>Email:</strong>{" "}
						<a href={`mailto:${participant.email}`}>{participant.email}</a>
					</p>
					<p>
						<strong>Phone:</strong>{" "}
						<a href={`tel:${participant.phone}`}>{participant.phone}</a>
					</p>
					<p>
						<strong>College:</strong> {participant.college}
					</p>
					<p>
						<strong>City:</strong> {participant.city}
					</p>
					<p>
						<strong>State:</strong> {participant.state}
					</p>
					<p>
						<strong>Gender:</strong> {participant.gender}
					</p>
					<p>
						<strong>Year of Study:</strong> {participant.yearOfStudy}
					</p>
					<p>
						<strong>Age:</strong> {participant.age}
					</p>
					<p>
						<strong>CA ID:</strong> {participant.caID}
					</p>
					<p>
						<strong>T-Shirt Provided:</strong>{" "}
						{participant.tShirtProvided ? "Yes" : "No"}
					</p>
					<p>
						<strong>Payment Status:</strong>{" "}
						{participant.paymentStatus ? "Completed" : "Pending"}
					</p>
					<p>
						<strong>Payment Amount:</strong> ₹{participant.paymentAmount}
					</p>
					<p>
						<strong>Payment Time:</strong>{" "}
						{participant.paymentTime
							? new Date(participant.paymentTime).toLocaleString()
							: "Not Paid"}
					</p>
					<p>
						<strong>Registered on:</strong>{" "}
						{new Date(participant.createdAt).toLocaleString()}
					</p>
					<p>
						<strong>Last Updated:</strong>{" "}
						{new Date(participant.updatedAt).toLocaleString()}
					</p>
				</Card.Body>
			</Card>
		</div>
	);
};

export default ParticipantDetails;
