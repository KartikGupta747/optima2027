import React, { useState, useEffect } from "react";
import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import { BackgroundCircles } from "./design/Hero";
import { Gradient } from "./design/Services";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { guestLectures, guests } from "../constants/GuestLectures.js";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { MdOutlineLocationOn } from "react-icons/md";
import { LuAlarmClock } from "react-icons/lu";

const GuestLecture = () => {
	document.title = "Guest Lectures | Optima 2025";
	const text = "Many-More-Stars-Are-On-Their-Way!";
	const chars = text.split("");

	return (
		<Section id="guestLecture">
			<div className="container relative z-2">
				<Heading
					className="md:max-w-md lg:max-w-2xl text-center"
					title="Guest Lectures"
				/>
				<BackgroundCircles />
				{/* <div className="flex flex-col md:flex-row w-full"></div> */}

				<div className="grid grid-cols-1 gap-8 ">
					<h1 className="text-3xl md:text-4xl text-center py-2 px-3 bg-gradient-to-r from-orange-500 to-red-300 bg-clip-text text-transparent font-semibold rounded-full w-full">
						Opening Ceremony Guests
					</h1>
					<h2 className="text-2xl md:text-3xl text-center text-n-2">
						04:30 PM, 7th March, Netaji Auditorium
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
						{guests.map((guest) => (
							<div className="flex flex-col items-center justify-center gap-3 bg-conic-gradient p-0.25 rounded-lg">
								<div className="border border-n-11 p-6 flex flex-col items-center justify-center bg-n-8 rounded-lg gap-4 w-full h-full">
									<h1 className="text-xl md:text-2xl text-center font-semibold  bg-gradient-to-r from-orange-500 to-red-300 bg-clip-text text-transparent">
										{guest.title}
									</h1>
									<img
										src={guest.img}
										alt={guest.name}
										className="w-60 rounded-lg"
									/>
									<div className="flex flex-col items-center justify-center gap-1">
										<h2 className="text-lg md:text-xl">{guest.name}</h2>
										<p className="text-md md:text-lg text-center text-n-2">
											{guest.designation}
										</p>
									</div>
									<a
										href={guest.linkedin}
										className="px-6 py-3 bg-transparent border-2 border-purple-600 text-purple-300 hover:bg-purple-600 hover:text-white rounded-lg font-medium flex items-center justify-center transform hover:-translate-y-1 transition-all duration-200"
									>
										Know More
									</a>
								</div>
							</div>
						))}
					</div>
					<h1 className="text-3xl md:text-4xl text-center py-2 px-3 bg-gradient-to-r from-orange-500 to-red-300 bg-clip-text text-transparent font-semibold rounded-full w-full">
						Our Other Honourable Guests
					</h1>
					{guestLectures.map((lecture, index) => (
						<div
							key={index}
							className="md:flex bg-gray-800 rounded-2xl overflow-hidden shadow-xl"
						>
							<div className="relative md:w-1/3">
								<img
									src={lecture.imgUrl}
									alt={lecture.name}
									className="object-cover w-full h-full"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent md:opacity-50"></div>
							</div>

							<div className="p-6 md:w-2/3">
								<h3 className="text-2xl lg:text-4xl font-bold text-white mb-2">
									{lecture.name}
								</h3>
								<p className="text-lg lg:text-2xl text-gray-300 mb-2">
									{lecture.designation}
									{lecture.company && `, ${lecture.company}`}
								</p>
								{lecture.topic && (
									<p className="text-gray-400 lg:text-lg mb-2">
										Topic of Discussion :{" "}
										<span className="text-purple-300">{lecture.topic}</span>
									</p>
								)}
								<LectureDescription desc={lecture.desc} />
								<div className="md:flex mb-4 lg:mb-6 md:gap-2">
									{lecture.date && (
										<div className="flex items-center">
											<LuAlarmClock
												size={27}
												className="text-purple-400 -ml-1"
											/>
											<p className="text-lg lg:text-2xl text-gray-300 ml-1">
												{lecture.date},
											</p>
										</div>
									)}
									{lecture.mode && (
										<div className="flex items-center">
											<MdOutlineLocationOn
												size={27}
												className="text-purple-400 -ml-1.5"
											/>
											<p className="text-lg lg:text-2xl text-gray-300">
												{lecture.mode}
											</p>
										</div>
									)}
								</div>
								<div className="flex flex-wrap gap-4">
									{lecture.linkedin && (
										<button
											onClick={() => window.open(lecture.linkedin, "_blank")}
											className="px-6 py-3 bg-transparent border-2 border-purple-600 text-purple-300 hover:bg-purple-600 hover:text-white rounded-lg font-medium flex items-center justify-center transform hover:-translate-y-1 transition-all duration-200"
										>
											Know More
										</button>
									)}
									{lecture.onlineMeetLink && (
										<button
											onClick={() =>
												window.open(lecture.onlineMeetLink, "_blank")
											}
											className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium flex items-center justify-center transform hover:-translate-y-1 transition-all duration-200"
										>
											Join Meet
										</button>
									)}
								</div>
							</div>
						</div>
					))}

					{/* waiting animation */}
					{/* <div className="flex flex-col items-center justify-center mb-20">
            <DotLottieReact
              className="w-4/5 md:w-1/2"
              src="https://lottie.host/b3097079-bc6f-47ab-9c27-f39e395e8e83/2ptNd6xx7N.lottie"
              loop
              autoplay
            />
            <h1 className="z-10 lg:-mt-12 text-md md:text-4xl lg:text-5xl italic font-bold flex">
              {chars.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 0 }}
                  animate={{ y: [-5, 5, -5] }} // Wave effect
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: (chars.length - index) * 0.1, // Creates the wave effect
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </div> */}
				</div>
			</div>
			<Gradient />
		</Section>
	);
};

const LectureDescription = ({ desc }) => {
	const [showFull, setShowFull] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const characterLimit = windowWidth >= 768 ? 600 : 400; // Responsive character limit

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const toggleShowFull = () => setShowFull(!showFull);

	const getDescription = () => {
		if (showFull) {
			return desc;
		}

		// Check both line count and character count
		const lines = desc.split("\n");
		const previewLines = windowWidth >= 768 ? 7 : 10;

		if (lines.length <= previewLines && desc.length <= characterLimit) {
			return desc;
		}

		if (lines.length > previewLines) {
			return lines.slice(0, previewLines).join("\n");
		}

		return desc.substring(0, characterLimit);
	};

	return (
		<div>
			<p className="text-gray-400 lg:text-lg mb-2 whitespace-pre-line">
				{getDescription()}
				{(desc.split("\n").length > (windowWidth >= 768 ? 7 : 10) ||
					desc.length > characterLimit) && (
					<button
						onClick={toggleShowFull}
						className="text-purple-400 hover:text-purple-300"
					>
						{showFull ? " ...Read Less" : " ...Read More"}
					</button>
				)}
			</p>
		</div>
	);
};

export default GuestLecture;
