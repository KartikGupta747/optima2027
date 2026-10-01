import React from "react";
import { grid } from "../assets";
import Heading from "./Heading";
import Section from "./Section";
import { Gradient } from "./design/Roadmap";
import Button from "./Button";
import { BackgroundCircles } from "./design/Hero";

const About = () => {
	document.title = "About | Optima 2025";
	return (
		<Section id="about">
			<div className="container md:pb-10">
				<Heading
					className="md:max-w-md lg:max-w-2xl text-center mb-6"
					title="Optima 2025"
				/>
				<BackgroundCircles />

				<div className="relative grid gap-6 md:grid-cols-2 md:gap-12 md:pb-[7rem]">
					<div className="md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] bg-conic-gradient">
						<div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
							<div className="absolute top-0 left-0 max-w-full">
								<img
									className="w-full"
									src={grid}
									width={550}
									height={550}
									alt="Grid"
								/>
							</div>
							<div className="relative z-1">
								<div className="mb-2 md:mb-5 lg:mb-8 -my-10 -mx-15 p-10">
									<img
										className="w-[80%] mx-auto bg-gray-300 rounded-xl"
										src="/assets/optima.webp"
										width={428}
										height={326}
										alt={"Optima's Logo"}
									/>
								</div>
								<h4 className="h2 md:h4 mb-4">
									Optima - IIT Kharagpur's Techno-Optimization
									Fest
								</h4>
								<p className="body-1 text-n-3 md:text-n-4 mb-8 tracking-tighter">
									A nexus of innovation, problem-solving, and
									interdisciplinary collaboration, Optima is
									orchestrated by the esteemed Department of
									Industrial and Systems Engineering. With a
									focal point on technology-optimization
									synergy, Optima addresses real-world
									challenges across sectors like supply chain
									management, production line optimization,
									and more. The event, from 7th - 9th March
									2025, offers a rich mix of competitions,
									workshops, seminars, and interactive
									sessions, driving sustainable advancements,
									efficiencies, and productivity.
								</p>
								<div className="flex justify-center">
									<Button href="https://2023.optima.org.in/">
										Visit Optima 2023
									</Button>
								</div>
							</div>
						</div>
					</div>

					<div className="md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] bg-conic-gradient">
						<div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15 ">
							<div className="absolute top-0 left-0 max-w-full">
								<img
									className="w-full"
									src={grid}
									width={550}
									height={550}
									alt="Grid"
								/>
							</div>
							<div className="relative z-1">
								<div className="mb-2 md:mb-5 lg:mb-8 -my-10 -mx-15 p-10">
									<img
										className="w-[80%] mx-auto bg-gray-300 rounded-xl"
										src="/assets/ise.webp"
										width={628}
										height={426}
										alt={"gdg"}
									/>
								</div>
								<h4 className="h2 md:h4 mb-4">
									Department of Industrial and Systems
									Engineering - IIT Kharagpur
								</h4>
								<p className="body-1 text-n-3 md:text-n-4 mb-8 tracking-tighter">
									With its inception in 1973, the Department
									of Industrial and Systems Engineering at IIT
									Kharagpur embarked on a remarkable journey
									that has left an indelible mark on the
									landscape of engineering education and
									research.
									<br />
									The Department caters to a broad spectrum of
									domains, showcasing its versatility and
									applicability in fields like: Data
									Analytics, Quality Engineering and Process
									Transformations, Information Systems and
									E-Business, Logistics and Supply Chain
									Management, System Thinking and Policy
									Planning, Human Factors Engineering and
									Ergonomics, Operations Research and
									Optimization, Safety Analytics and Virtual
									Reality
								</p>
								<div className="flex justify-center">
									<Button href="http://www.iem.iitkgp.ac.in/">
										More About ISE
									</Button>
								</div>
							</div>
						</div>
					</div>
					<Gradient />
				</div>
			</div>
		</Section>
	);
};

export default About;
