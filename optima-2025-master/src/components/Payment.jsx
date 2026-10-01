import React, { useEffect, useState } from "react";
import Section from "./Section";
import Heading from "./Heading";
import { BackgroundCircles } from "./design/Hero";
import {
	payment,
	benefitsForParticipants,
	registration,
	accomo,
	catfour,
} from "../constants/Rules";
import { Gradient } from "./design/Roadmap";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./design/Loading";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Payment = () => {
	document.title = "Payment | Optima 2025";

	const navigate = useNavigate();
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

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
			if (data.paymentStatus) {
				navigate("/profile");
			}
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
		<Section id="rules">
			<div className="container relative z-2">
				<div className="h2 md:h4 mb-4 flex items-center justify-center">
					<DotLottieReact
						className="w-full max-w-[428px] mx-auto rounded-xl opacity-80"
						src="https://lottie.host/8f19a5fc-91fe-471f-b929-59b0d06ec114/TuGaJRAs5z.lottie"
						loop
						autoplay
						width={428}
						height={428}
					/>
				</div>
				
				<Heading
					className="md:max-w-md lg:max-w-2xl text-center pt-15"
					title="What you missed this year?"
				/>
				<div className="rounded-lg p-0.25 w-full">
					{error && (
						<div className="text-red-500 text-center mb-4">{error}</div>
					)}
					<div className="rounded-lg overflow-hidden relative  w-full p-4 pt-0 gap-4 flex flex-col mb-8">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
							{benefitsForParticipants.map((items) => (
								<div className="flex gap-3 p-3 items-start rounded-md bg-white/10 backdrop-blur-md">
									<img
										src={items.img}
										alt=""
										className="w-6 md:w-7 lg:w-8 rounded-md"
									/>
									<div className="flex gap-2 flex-col">
										<h1 className="text-xl font-semibold lg:text-2xl">
											{items.title}
										</h1>
										<div className="opacity-80 pr-2 md:pr-3">{items.desc}</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-md p-3">
						<div className="border-2 border-white/20 rounded-md p-3">
							<Link to="/competitions" className="flex flex-col items-center">
								<DotLottieReact
									className="w-full max-w-[428px] mx-auto rounded-xl opacity-80"
									src="https://lottie.host/0db02718-dcbe-44bd-bbc4-5d8ec2e6f457/rU7LETqSNV.lottie"
									loop
									autoplay
									width={428}
									height={428}
								/>
								<h1 className="text-xl font-semibold lg:text-2xl">
								8 Thrilling Competitions
								</h1>
							</Link>
						</div>
						<div className="border-2 border-white/20 rounded-md p-3">
						<Link to="/guest-lectures" className="flex flex-col items-center">
							<DotLottieReact
								className="w-full max-w-[428px] mx-auto rounded-xl opacity-80"
								src="https://lottie.host/50e17415-74d1-4549-98aa-bd11e53bc9c7/o4m3UuWVAl.lottie"
								loop
								autoplay
								width={428}
								height={428}
							/>
							<h1 className="text-xl font-semibold lg:text-2xl">
								Inspiring Guest Lectures
							</h1>
						</Link>
						</div>
						<div className="border-2 border-white/20 rounded-md p-3">
						<Link to="/workshops" className="flex flex-col items-center">
							<DotLottieReact
								className="w-full max-w-[428px] mx-auto rounded-xl opacity-80"
								src="https://lottie.host/5e55b28e-d44a-497a-8122-c176a19c0c0a/rkLW4MdNXj.lottie"
								loop
								autoplay
								width={428}
								height={428}
							/>
							<h1 className="text-xl font-semibold lg:text-2xl">An Immersive Workshop Series</h1>
						</Link>
						</div>
					</div>
				</div>
				{/* <div className="rounded-lg p-0.25 bg-conic-gradient mb-6 w-full">
					<div className="rounded-lg bg-n-8 overflow-hidden relative w-full flex flex-col p-4 gap-4 h-full">
						<h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-semibold mb-2">
							Payment Instructions
						</h1>
						{payment.map((item) => (
							<div className="flex gap-4">
								<div className="min-w-3 max-h-3 rounded-full bg-purple-500 translate-y-1.5"></div>
								<div className="opacity-80">{item.text}</div>
							</div>
						))}
						<Gradient />
					</div>
				</div> */}
				{/* <div className="mb-6 w-full">
					<div className="rounded-lg bg-none overflow-hidden relative flex items-center justify-center mb-8 w-full h-full pb-4">
						<a
							href={
								"https://docs.google.com/forms/d/e/1FAIpQLSdzfCEholwyzqmtr3PrZbUI3sVF2wXmvFVFkR_3esQPus-nSg/viewform?usp=pp_url&entry.457358849=" +
								userData?.fullName +
								"&entry.1494407877=" +
								userData?.email +
								"&entry.1954823963=" +
								userData?.phone +
								"&entry.878903541=" +
								userData?.college +
								"&entry.1033247168=" +
								userData?.city +
								"&entry.848564609=" +
								userData?.OPID +
								"&entry.1961204696=" +
								userData?.caID
							}
							target="_blank"
							rel="noopener noreferrer"
						>
							<button className="group flex justify-center items-center rounded-lg bg-gradient-to-b from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 font-semibold p-4 w-72 h-16 transition-all duration-200 shadow-lg transform active:translate-y-1">
								<h1 className="text-center text-xl md:text-2xl lg:text-3xl bg-transparent text-white drop-shadow-md">
									Pay Here
								</h1>
							</button>
						</a>
					</div>
				</div> */}
				{/* <div className="rounded-lg p-0.25 bg-conic-gradient w-full">
					<div className="rounded-lg bg-n-8 overflow-hidden relative w-full flex flex-col p-4 gap-4 h-full">
						<h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-semibold mb-2">
							Accomodation Rules
						</h1>
						{accomo.map((item) => (
							<div className="flex gap-4">
								<div className="min-w-3 max-h-3 rounded-full bg-purple-500 translate-y-1.5"></div>
								<div className="opacity-80">{item.text}</div>
							</div>
						))}
						<Gradient />
					</div>
				</div> */}
			</div>
			<Gradient />
		</Section>
	);
};

export default Payment;
