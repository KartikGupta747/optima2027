import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { AnimatePresence } from "framer-motion";
import About from "./components/About";
import ResetPassword from "./components/auth/ResetPassword";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Competitions from "./components/Competitions";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import GuestLecture from "./components/GuestLecture";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import QueryUs from "./components/QueryUs";
import Redirect from "./components/Redirect";
import Spons from "./components/Spons";
import Team from "./components/Team";
import Schedule from "./components/Schedule";
import Workshops from "./components/Workshops";
import Payment from "./components/Payment";
import { competitions } from "./constants";
import { guestLectures } from "./constants/GuestLectures";
import { AuthProvider } from "./context/AuthContext";
import Rules from "./components/Rules";
import WelcomeScreen from "./components/WelcomeScreen";
import GlobalCursor from "./components/common/GlobalCursor";

const App = () => {
	const [showSplash, setShowSplash] = useState(() => {
		const splashPlayed = sessionStorage.getItem("splashPlayed");
		return !splashPlayed;
	});

	const location = useLocation();

	useEffect(() => {
		if (location.hash) {
			const targetId = location.hash.replace("#", "");
			const scrollTimer = setTimeout(() => {
				const elem = document.getElementById(targetId);
				if (elem) {
					elem.scrollIntoView({ behavior: "smooth" });
				}
			}, 100);
			return () => clearTimeout(scrollTimer);
		}
	}, [location.pathname, location.hash]);

	const handleSplashComplete = () => {
		setShowSplash(false);
		sessionStorage.setItem("splashPlayed", "true");
	};

	return (
		<AuthProvider>
			<GlobalCursor />
			<AnimatePresence>
				{showSplash && <WelcomeScreen onComplete={handleSplashComplete} />}
			</AnimatePresence>
			<div className="min-h-screen bg-bg-base text-text-primary font-sans selection:bg-accent-brand selection:text-black overflow-x-clip">
				<Header />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/about" element={<About />} />
					<Route path="/gallery" element={<Navigate to="/#gallery" replace />} />
					<Route path="/schedule" element={<Schedule />}/>
					<Route path="/workshops" element={<Workshops />} />
					<Route path="/competitions" element={<Competitions />} />

					{competitions.map((event) => {
						return (
							<Route
								key={event.id}
								path={event.path}
								element={
									<Redirect
										href={event.unstopLink}
										delay={1000}
										place={event.title}
									/>
								}
							/>
						);
					})}

					{competitions
						.filter((event) => event.whatsAppLink)
						.map((event) => (
							<Route
								key={`wa-${event.id}`}
								path={event.pathToWhatsApp}
								element={
									<Redirect
										href={event.whatsAppLink}
										delay={1000}
										place={"WhatsApp"}
									/>
								}
							/>
						))}

					{competitions
						.filter((event) => event.driveLink)
						.map((event) => (
							<Route
								key={`ps-${event.id}`}
								path={event.pathToPS}
								element={
									<Redirect
										href={event.driveLink}
										delay={1000}
										place={"Google Drive"}
									/>
								}
							/>
						))}

					<Route path="/guest-lectures" element={<GuestLecture />} />
					{guestLectures.map((event) => {
						return (
							<Route
								key={event.id}
								path={event.path}
								element={
									<Redirect
										href={event.onlineMeetLink}
										delay={1000}
										place={"Guest Lecture"}
									/>
								}
							/>
						);
					})}


					<Route path="/sponsors" element={<Spons />} />
					<Route path="/team" element={<Team />} />
					<Route path="/query-us" element={<QueryUs />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/register" element={<SignUp />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="/payment" element={<Payment />} />
					<Route path="/rules" element={<Rules />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
			</div>
		</AuthProvider>
	);
};

export default App;
