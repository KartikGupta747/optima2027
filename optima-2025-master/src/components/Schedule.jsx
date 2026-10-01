import { useState } from "react";
import { BackgroundCircles, Gradient } from "./design/Hero.jsx";
import { useRef } from "react";
("use client");
import "../components/OptimaCss/Schedule.css";
import Day0 from "./Day0.jsx";
import Day1 from "./Day1.jsx";
import Day2 from "./Day2.jsx";
import Heading from "./Heading.jsx";
import Section from "./Section.jsx";
import { GradientLight } from "./design/Benefits.jsx";

const Schedule = () => {
	document.title = "Schedule | Optima 2025";
	const parallaxRef = useRef(null);
	const [day, setDay] = useState(0);
	return (
		<Section id="schedule" className="TL-page">
			<div className="container relative z-2">
				<Heading
					className="md:max-w-md lg:max-w-2xl text-center"
					title="Event Schedule"
				/>
				<BackgroundCircles />
				<div className="rounded-lg p-0.25">
					<div className="relative rounded-lg overflow-hidden flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 lg:gap-10 p-4">
						<button
							onClick={() => {
								setDay(0);
							}}
							className={
								"px-15 py-3 rounded-full transition-all duration-300 font-medium border justify-center flex items-center gap-2 text-center" +
								(day == 0
									? "bg-white text-primary-1 text-orange-500 transform scale-105 border border-orange-500"
									: "text-n-3 hover:bg-n-6 hover:text-purple-500 hover:border-purple-500")
							}
						>
							Day 0
						</button>
						<button
							onClick={() => {
								setDay(1);
							}}
							className={
								"px-15 py-3 rounded-full transition-all duration-300 font-medium border justify-center flex items-center gap-2 text-center" +
								(day == 1
									? "bg-white text-primary-1 text-orange-500 transform scale-105 border border-orange-500"
									: "text-n-3 hover:bg-n-6 hover:text-purple-500 hover:border-purple-500")
							}
						>
							Day 1
						</button>
						<button
							onClick={() => {
								setDay(2);
							}}
							className={
								"px-15 py-3 rounded-full transition-all duration-300 font-medium border justify-center flex items-center gap-2 text-center" +
								(day == 2
									? "bg-white text-primary-1 text-orange-500 transform scale-105 border border-orange-500"
									: "text-n-3 hover:bg-n-6 hover:text-purple-500 hover:border-purple-500")
							}
						>
							Day 2
						</button>
					</div>
				</div>
				{day == 0 ? <Day0 /> : day == 1 ? <Day1 /> : <Day2 />}
			</div>
			<GradientLight />
		</Section>
	);
};

export default Schedule;
