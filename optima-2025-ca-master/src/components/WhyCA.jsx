import React from "react";

const WhyCA = () => {
	return (
		<div className="flex flex-col lg:flex-row mt-6 lg:mt-20 items-center max-w-7xl mx-auto px-4">
			{/* Text Section */}
			<div className="lg:w-1/2 text-center flex flex-col items-center lg:items-center space-y-6">
				<h1 className="text-4xl sm:text-6xl lg:text-7xl tracking-wide leading-tight">
					<div className="text-[clamp(1.5rem,_4vw,_4rem)]">Why</div>
					<div className="bg-gradient-to-r p-2 pl-0 from-orange-500 to-red-800 text-transparent bg-clip-text text-[clamp(2rem,_5vw,_5rem)]">
						Campus Ambassador
					</div>
					<div className="text-[clamp(1.5rem,_4vw,_4rem)]">
						Program?
					</div>
				</h1>
				<p className="text-lg text-neutral-500 max-w-4xl text-center">
					Join Optima 2025, IIT Kharagpur as a Campus Ambassador! Lead
					events and promote techno-optimization through exciting
					competitions, while honing your leadership, communication,
					and event management skills in a dynamic environment.
				</p>
			</div>

			{/* Image Section */}
			<div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
				<img
					src="/whycaP.png"
					alt="Campus Ambassador Program"
					className="w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg rounded-lg shadow-md"
				/>
			</div>
		</div>
	);
};

export default WhyCA;
