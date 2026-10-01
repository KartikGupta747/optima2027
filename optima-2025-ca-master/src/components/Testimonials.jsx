import { testimonials } from "../constants";

const Testimonials = () => {
	return (
		<div id="testimonials" className="pt-4 mt-10 tracking-wide">
			<span className="invisible">- testimonials -</span>
			<h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
				What People are saying
			</h2>
			<div className="flex flex-wrap justify-center">
				{testimonials.map((testimonial, index) => (
					<div
						key={index}
						className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2"
					>
						<div className="bg-neutral-900 rounded-md p-6 text-md border border-neutral-800 font-thin">
							<p>{testimonial.text}</p>
							<div className="flex mt-8 items-start">
								<img
									className="w-12 h-12 mr-6 rounded-full border border-neutral-300"
									src={testimonial.image}
									alt=""
								/>
								<div>
									<h6>{testimonial.user}</h6>
									<span className="text-sm font-normal italic text-neutral-600">
										{testimonial.company}
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="m-10 flex flex-col items-center sm:mt-8 md:mt-12 lg:mt-16 space-y-6">
				<p className="text-lg sm:text-xl lg:text-2xl text-center mb-2 text-neutral-300">
					Convinced enough? Let's make it happen!
				</p>
				<div className="m-1 flex justify-center items-center">
					<a
						href="/register"
						className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold 
                   py-4 px-6 mx-3 rounded-lg transform transition-transform 
                   hover:scale-105 
                   sm:py-5 sm:px-10 sm:text-xl 
                   lg:py-6 lg:px-14 lg:text-2xl"
					>
						Register Now
					</a>
				</div>
			</div>
		</div>
	);
};

export default Testimonials;
