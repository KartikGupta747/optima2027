import { Link } from "react-router-dom";
import { heroBackground } from "../../assets";
import Section from "../Section";

export default function Loading() {
	return (
		<Section className="pt-[5rem] -mt-[5.25rem] ">
			<div className="container relative z-2 min-h-[25rem] flex flex-col items-center justify-center text-center lg:mt-10">
				<h2 className="h2 mb-4">Loading...</h2>
				<p className="body-2 mb-8 text-500">
					Please wait while we fetch your data.
				</p>
				<Link
					to="/"
					className="button button-gradient px-8 py-4 hover:scale-105 transition-transform"
				>
					Back to Homepage
				</Link>
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
		</Section>
	);
}
