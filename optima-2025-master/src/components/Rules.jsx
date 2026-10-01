import React from "react";
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
const Rules = () => {
	document.title = "Rules | Optima 2025";
	return (
		<Section id="rules">
			<div className="container relative z-2">
				<BackgroundCircles />
				<div className="rounded-lg p-0.25 bg-conic-gradient w-full">
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
				</div>
			</div>
			<Gradient />
		</Section>
	);
};

export default Rules;
