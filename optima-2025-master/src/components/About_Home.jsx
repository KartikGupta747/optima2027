import { check } from "../assets";
import { collabApps, collabContent } from "../constants";
import Button from "./Button";
import { LeftCurve, RightCurve } from "./design/About_Home";
import { useNavigate } from "react-router-dom";

const About_home = () => {
	return (
		<div className="my-20 mx-3 md:mx-6">
			<div className="container mx-auto lg:px-12 flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 lg:space-x-16">
				{/* Left Section */}
				<div className="w-full lg:w-1/2 max-w-[28rem] text-center lg:text-left space-y-6">
					<div>
						<h2 className="text-2xl md:text-3xl font-bold">
							Optima 2025
						</h2>
						<h3 className="text-xl mt-1 md:text-xl font-semibold text-gray-300">
							Department of Industrial and Systems Engineering
						</h3>
					</div>

					<ul className="space-y-4 mx-auto lg:mx-0">
						{collabContent.map((item) => (
							<li
								className="flex items-center space-x-4"
								key={item.id}
							>
								<img
									src={check}
									width={24}
									height={24}
									alt="check"
								/>
								<h6 className="text-lg">{item.title}</h6>
							</li>
						))}
					</ul>

					<Button href="/about">About Us</Button>
				</div>

				{/* Right Section */}
				<div className="w-full lg:w-1/3 flex justify-center">
					<div className="relative flex items-center justify-center w-[12rem] sm:w-[14rem] md:w-[18rem] lg:w-[22rem] aspect-square border border-gray-300 rounded-full">
						<div className="flex items-center justify-center w-[6rem] sm:w-[8rem] md:w-60 aspect-square border border-gray-300 rounded-full">
							<div className="w-[3rem] sm:w-[4rem] md:w-[6rem] aspect-square bg-gray-100 flex items-center justify-center rounded-full">
								<img
									src="/logo-optima.webp"
									width={70}
									height={70}
									alt="logo-optima"
									className="p-1"
								/>
							</div>
						</div>

						{/* Circles with Apps */}
						<ul>
							{collabApps.map((app, index) => (
								<li
									key={app.id}
									className="absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom"
									style={{
										transform: `rotate(${index * 45}deg)`,
									}}
								>
									<div
										className="relative -top-[1.6rem] flex w-[2.4rem] sm:w-[2.8rem] md:w-[3.2rem] h-[2.4rem] sm:h-[2.8rem] md:h-[3.2rem] rounded-full bg-gray-200 items-center justify-center"
										style={{
											transform: `rotate(-${
												index * 45
											}deg)`,
										}}
									>
										<img
											className="m-auto"
											width={app.width}
											height={app.height}
											alt={app.title}
											src={app.icon}
										/>
									</div>
								</li>
							))}
						</ul>

						<LeftCurve />
						<RightCurve />
					</div>
				</div>
			</div>
		</div>
	);
};

export default About_home;
