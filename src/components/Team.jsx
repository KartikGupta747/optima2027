import { useState, useRef } from "react";
import Heading from "./Heading";
import Section from "./Section";
import Button from "./Button";
import "../components/OptimaCss/Team.css";
import Card from "../components/Card.jsx";

import {
	Executives,
	CoreHeads,
	PreviousYearHeads,
} from "../constants/Team.js";

import { BackgroundCircles } from "./design/Hero.jsx";
import { Gradient } from "./design/Services.jsx";

const Team = () => {
	document.title = "Team | Optima 2027";
	const parallaxRef = useRef(null);
	const [show2025Team, setShow2025Team] = useState(false);

	return (
		<Section id="team">
			<div
				className="w-full max-w-[1360px] mx-auto px-4 relative z-2 rounded-3xl"
				ref={parallaxRef}
			>
				<BackgroundCircles />
				<div className="optima-team-container w-full mx-auto mt-0">
					{/* CURRENT HEADS (4 IN A LINE) */}
					<div className="optima-team-core-heads mb-12">
						<Heading
							className="md:max-w-md lg:max-w-2xl text-center"
							title="Heads"
						/>
						<div className="optima-team-members">
							{CoreHeads.map((profile) => (
								<Card key={profile.id} profile={profile} />
							))}
						</div>
					</div>

					{/* TOGGLE BUTTON FOR 2025 TEAM */}
					<div className="flex justify-center items-center my-10">
						<Button
							onClick={() => setShow2025Team((prev) => !prev)}
							className="text-base font-semibold"
						>
							{show2025Team ? "Hide Optima 2025 Team" : "View Optima 2025 Team"}
						</Button>
					</div>

					{/* OPTIMA 2025 TEAM (HIDDEN BY DEFAULT) */}
					{show2025Team && (
						<div className="w-full transition-opacity duration-300">
							{/* 2025 EXECUTIVES */}
							<div className="optima-team-executives mb-24">
								<Heading
									className="md:max-w-md lg:max-w-2xl text-center"
									title="Optima 2025 Executives"
								/>
								<div className="optima-team-members">
									{Executives.map((profile) => (
										<Card key={profile.id} profile={profile} />
									))}
								</div>
							</div>

							{/* 2025 HEADS */}
							<div className="optima-team-core-heads mb-12">
								<Heading
									className="md:max-w-md lg:max-w-2xl text-center"
									title="Optima 2025 Heads"
								/>
								<div className="optima-team-members">
									{PreviousYearHeads.map((profile) => (
										<Card key={profile.id} profile={profile} />
									))}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<Gradient />
		</Section>
	);
};

export default Team;
