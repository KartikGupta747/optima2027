import React, { useEffect } from "react";
import Section from "./Section";
import { Link, useNavigate } from "react-router-dom";
import { heroBackground } from "../assets";
import { BackgroundCircles } from "./design/Hero";

export default function Redirect({ href, delay, place }) {
	//   const navigate = useNavigate();

	//   useEffect(() => {
	//     const timer = setTimeout(() => {
	//       // Open in new tab
	//       window.open(href, '_blank');

	//       navigate('/competitions');
	//     }, delay ? delay : 2000);

	//     return () => clearTimeout(timer);
	//   }, [href, delay, navigate]);

	useEffect(() => {
		setTimeout(
			() => {
				window.location.href = href;
			},
			delay ? delay : 1000
		);
	}, []);

	return (
		<Section className="pt-[5rem] -mt-[5.25rem] ">
			<div className="container relative z-2 min-h-[25rem] flex flex-col items-center justify-center text-center lg:mt-10">
				<h2 className="h2 mb-4">Redirecting...</h2>
				<p className="body-2 mb-8 text-500">
					You will be redicted to the {place} page in a moment.
				</p>
				<Link
					to="/"
					className="button button-gradient px-8 py-4 hover:scale-105 transition-transform"
				>
					Back to Homepage
				</Link>

				{/* Background decorative elements */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] opacity-10 pointer-events-none">
					<div className="absolute inset-0 rotate-45 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl"></div>
					<div className="absolute inset-0 -rotate-45 bg-gradient-to-l from-primary to-secondary rounded-full blur-3xl"></div>
				</div>
			</div>
			<div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[102%]">
				<img
					src={heroBackground}
					className="w-full"
					width={1440}
					height={1800}
					alt="hero"
				/>
			</div>
			<BackgroundCircles />
		</Section>
	);
}
