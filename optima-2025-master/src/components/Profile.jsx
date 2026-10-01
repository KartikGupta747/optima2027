import React, { useState, useEffect } from "react";
import Section from "./Section";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { Gradient } from "./design/Services";
import { BackgroundCircles } from "./design/Hero";
import Loading from "./design/Loading";
import { PiNoteFill } from "react-icons/pi";
import { TbWorldQuestion } from "react-icons/tb";
import { TbHandFingerLeft } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
	document.title = "Profile | Optima 2025";
	const navigate = useNavigate();
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [withAccommodation, setWithAccommodation] = useState(false);

	const { logout } = useAuth();

	// const registeredEvents = [
	// 	{
	// 		id: 1,
	// 		name: "Roborace",
	// 		image: "/images/competitions/roborace.jpg",
	// 		date: "2024-04-15",
	// 		status: "Registered",
	// 	},
	// 	{
	// 		id: 2,
	// 		name: "Robosoccer",
	// 		image: "/images/competitions/robosoccer.jpg",
	// 		date: "2024-04-16",
	// 		status: "Registered",
	// 	},
	// 	{
	// 		id: 3,
	// 		name: "Drone Workshop",
	// 		image: "/images/workshops/drone.jpg",
	// 		date: "2024-04-14",
	// 		status: "Registered",
	// 	},
	// ];

	const fetchUserData = async () => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/signin");
			return;
		}
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/user/profile`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				if (response.status === 401) {
					logout();
					navigate("/signin");
				}
				throw new Error("Failed to fetch user data");
			}

			const data = await response.json();
			setUserData(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<Section>
			<div className="container relative z-2">
				<div className="max-w-[1000px] mx-auto">
					{error && (
						<div className="text-red-500 text-center mb-4">
							{error}
						</div>
					)}
					{/* Basic Info Section */}
					<div className="bg-n-6/80 rounded-t-2xl p-6 mb-1">
						<h2 className="text-3xl font-bold mb-4 text-center">
							Participant Information
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<p className="text-n-4">Full Name</p>
								<p className="font-medium">
									{userData?.fullName}
								</p>
							</div>
							<div>
								<p className="text-n-4">Email</p>
								<p className="font-medium">{userData?.email}</p>
							</div>
							<div>
								<p className="text-n-4">Phone</p>
								<p className="font-medium">{userData?.phone}</p>
							</div>
							<div>
								<p className="text-n-4">Age</p>
								<p className="font-medium">{userData?.age}</p>
							</div>
							<div>
								<p className="text-n-4">College</p>
								<p className="font-medium">
									{userData?.college}
								</p>
							</div>
							<div>
								<p className="text-n-4">City</p>
								<p className="font-medium">{userData?.city}</p>
							</div>
							<div>
								<p className="text-n-4">State</p>
								<p className="font-medium">{userData?.state}</p>
							</div>
							<div>
								<p className="text-n-4">Year of Study</p>
								<p className="font-medium">
									{userData?.yearOfStudy}
								</p>
							</div>
							<div>
								<p className="text-n-4">Gender</p>
								<p className="font-medium">
									{userData?.gender.toUpperCase()}
								</p>
							</div>
							<div>
								<p className="text-n-4">My OP ID</p>
								<div className="flex items-center gap-2">
									<button
										className="px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
										onClick={() => {
											if (userData?.OPID) {
												navigator.clipboard.writeText(
													userData.OPID
												);
												alert(
													"OPID copied to clipboard!"
												);
											}
										}}
									>
										{userData?.OPID}
									</button>
									<div className="flex items-center gap-[3px] font-medium text-gray-500">
										<TbHandFingerLeft size={18} />
										<p> click to copy</p>
									</div>
								</div>
							</div>
							{userData?.caID && (
								<div>
									<p className="text-n-4">Referal CA ID</p>
									<p className="font-medium">
										{userData?.caID}
									</p>
								</div>
							)}
						</div>
					</div>
					{/* Payment Status Section */}
					<div className="bg-n-6/80 rounded-b-2xl p-6 mb-6">
						<h2 className="text-2xl font-bold mb-4">
							Payment Status
						</h2>
						<div className="mb-4">
							{userData?.paymentStatus ? (
								<>
									<p className="text-n-4">Status</p>
									<p className="font-medium text-green-500">
										Paid
									</p>
									<p className="font-medium text-n-4">
										Payment Amount:
									</p>
									<p className="font-medium text-green-500">
										₹{userData?.paymentAmount}
									</p>
								</>
							) : (
								<div className="md:flex justify-between">
									<div className="mb-2">
										<p className="text-n-4">Status</p>

										<p className="font-medium text-yellow-500">
											Incomplete
										</p>
									</div>
									<div>
										<p className="font-medium text-n-4">
											Please proceed to payment to
											complete the registration.
											<br />
											If payment has been made, please
											wait! Changes will be reflected within 48 hours.
										</p>
									</div>
								</div>
							)}
						</div>

						<div className="flex items-center justify-center md:justify-end">
							<div className="md:flex items-center gap-4">
								{!userData?.paymentStatus && (
									<Button href="/payment" className={"mb-2"}>
										Proceed to Payment
									</Button>
								)}
								<div className="flex gap-4 items-center justify-center">
									<Link
										to="/rules"
										className="flex items-center gap-[3px] text-purple-400 hover:text-purple-200 transition-colors"
									>
										<PiNoteFill className="text-xl" />
										<div className="text-lg font-semibold">
											Rules
										</div>
									</Link>
									<Link
										to="/query-us"
										className="flex items-center gap-[3px] text-purple-400 hover:text-purple-200 transition-colors"
									>
										<TbWorldQuestion className="text-xl" />
										<div className="text-lg font-semibold">
											Contact Us
										</div>
									</Link>
								</div>

								{/* <Button href="/rules" className={'mb-2'}>Rules</Button>
								<Button href="/query-us" className={'mb-2'}>Contact Us</Button> */}
							</div>
						</div>
					</div>

					{/* Registered Events Section
					<div className="bg-n-8/80 rounded-2xl p-6">
						<h2 className="text-2xl font-bold mb-4">
							Registered Events
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{registeredEvents.map((event) => (
								<div
									key={event.id}
									className="bg-n-7 rounded-lg p-4 flex flex-col"
								>
									<img
										src={event.image}
										alt={event.name}
										className="w-full h-40 object-cover rounded-lg mb-3"
									/>
									<h3 className="font-bold mb-2">
										{event.name}
									</h3>
									<p className="text-n-4 text-sm mb-2">
										Date: {event.date}
									</p>
									<p className="text-green-500 text-sm mb-3">
										{event.status}
									</p>
									<Button
										className="mt-auto"
										href={`/events/${event.id}`}
									>
										View Details
									</Button>
								</div>
							))}
						</div>
					</div> */}
				</div>
			</div>
			<Gradient />
		</Section>
	);
};

export default Profile;
