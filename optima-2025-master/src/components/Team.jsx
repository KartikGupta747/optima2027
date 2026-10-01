import Heading from "./Heading";
import Section from "./Section";
import "../components/OptimaCss/Team.css";
import Card from "../components/Card.jsx";
import { Executives, CoreHeads } from "../constants/Team.js";
import { BackgroundCircles } from "./design/Hero.jsx";
import { useRef } from "react";
import { Gradient } from "./design/Services.jsx";
("use client");

const Team = () => {
	document.title = "Team | Optima 2025";
	const parallaxRef = useRef(null);
	return (
		<Section id="team">
			<div
				className="container relative z-2 rounded-3xl"
				ref={parallaxRef}
			>
				<BackgroundCircles />
				<div className="optima-team-container max-w-[1280px] mx-auto mt-0">
					<div className="optima-team-executives mb-24">
						<Heading
							className="md:max-w-md lg:max-w-2xl text-center"
							title="Executives"
						/>
						<div className="optima-team-members grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
							{Executives.map((profile) => (
								<Card key={profile.id} profile={profile} />
							))}
						</div>
					</div>

					<div className="optima-team-core-heads">
						<Heading
							className="md:max-w-md lg:max-w-2xl text-center"
							title="Heads"
						/>
						<div className="optima-team-members grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
							{CoreHeads.map((profile) => (
								<Card key={profile.id} profile={profile} />
							))}
						</div>
					</div>
				</div>
			</div>
			<Gradient />
		</Section>
	);
};

export default Team;
