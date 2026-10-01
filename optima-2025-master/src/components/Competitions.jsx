import { competitions } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import Button from "./Button";
import { FaWhatsapp } from "react-icons/fa";
import unstopIcon from "../assets/unstop-icon.png";
import ComingSoon from "./design/ComingSoon";
import { BackgroundCircles } from "./design/Hero";
import { Gradient } from "./design/Services";
import { grid } from "../assets";
import { PiNoteDuotone } from "react-icons/pi";

const Competitions = () => {
	document.title = "Competitions | Optima 2025";
	return (
		<Section id="competitions">
			<div className="container relative z-2">
				{/* Section Heading */}
				<Heading
					className="md:max-w-md lg:max-w-2xl text-center"
					title="Competitions"
				/>
				<BackgroundCircles />

				{/* <div className="flex justify-center">
					<ComingSoon link="https://2023.optima.org.in/competitions" />
				</div> */}

				<div className="flex flex-wrap gap-10 mb-10 items-center justify-center">
					{competitions.map((item) => (
						<div
							className="block relative bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
							style={{
								backgroundImage: `url('/svg/card-1.svg')`,
							}}
							key={item.id}
						>
							<div className="relative z-2 flex flex-col min-h-[28rem] md:min-h-[30rem] min-w-[18rem] md:min-w-[23rem] p-[1rem] md:p-[2rem]">
								<div className="flex justify-center mb-2">
									{item.photoUrl ? (
										<img
											src={item.photoUrl}
											alt={`${item.title} Photo`}
											className="rounded-lg text-white opacity-80 filter brightness-110"
											style={{ maxWidth: "350px", maxHeight: "180px" }}
										/>
									) : (
										<img
											src={
												"/assets/competitions-card-images/hacktank-image.png"
											}
											alt={`${item.title} Photo`}
											className="rounded-lg opacity-80 text-white filter brightness-110"
											style={{ maxWidth: "350px", maxHeight: "180px" }}
										/>
									)}
								</div>

								<h5 className="h4 text-center font-semibold">{item.title}</h5>

								{item.subTitle && (
									<h6 className="text-sm text-center mb-2 h2">
										{item.subTitle}
									</h6>
								)}

								{item.text && (
									<p className="body-2 mb-2 text-n-3 text-center">
										{item.text}
									</p>
								)}

								<div className="flex flex-col items-center gap-1 mt-auto justify-center">
									{item.unstopLink && (
										<a
											href={item.unstopLink}
											target="_blank"
											rel="noopener noreferrer"
											//className="cursor-pointer hover:scale-[105%] border border-n-2 rounded-md px-5 py-1.5 md:py-2 flex items-center transition-transform duration-200"
											className="cursor-pointer hover:scale-[105%] border border-n-2 rounded-md px-5 py-1.5 md:py-2 flex items-center transition-transform duration-200 
               											bg-gradient-to-r from-purple-500 to-sky-400 text-white"
										>
											<p className="ml-auto font-code text-md font-bold uppercase">
												Register
											</p>
										</a>
									)}

									<div className="md:flex justify-center w-full gap-x-1">
										{item.driveLink && (
											<a
												href={item.driveLink}
												target="_blank"
												rel="noopener noreferrer"
												className="cursor-pointer hover:scale-[105%] md:max-w-[50%] p-1.5 md:p-2 flex items-center transition-transform duration-200"
											>
												<PiNoteDuotone
													className="text-[2.2rem]"
													color="#FCA510"
												/>
												<p className="font-code ml-1 text-n-2 cursor-pointer">
													<p className="text-sm md:text-md">{item.title}</p>
													<p className="text-xs opacity-70">
														Problem Statement
													</p>
												</p>
											</a>
										)}

										{item.whatsAppLink && (
											<a
												href={item.whatsAppLink}
												target="_blank"
												rel="noopener noreferrer"
												//className="flex cursor-pointer hover:scale-[110%] transition transition:translate duration-200"
												className="cursor-pointer hover:scale-[105%] md:max-w-[50%] p-1.5 md:p-2 flex items-center transition-transform duration-200"
											>
												<FaWhatsapp className="text-[2rem]" color="#25D366" />
												<p className="font-code ml-1 text-n-2 cursor-pointer">
													<p className="text-sm md:text-md">{item.title}</p>
													<p className="text-xs opacity-70">WhatsApp Group</p>
												</p>
											</a>
										)}
									</div>
								</div>
							</div>

							{/* {item.light && <GradientLight />} */}

							<div
								className="absolute inset-0.5 opacity-50 bg-gradient-to-b from-n-4 to-black"
								style={{ clipPath: "url(#benefits)" }}
							>
								<div className="absolute inset-0 transition-opacity">
									<img
										src={grid}
										alt={item.title}
										className="w-full h-full object-cover"
									/>
								</div>
							</div>

							<ClipPath />
						</div>
					))}
				</div>
			</div>
			<Gradient />
		</Section>
	);
};

export default Competitions;
