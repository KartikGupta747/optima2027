import Hero from "./Hero";
import FAQs from "./Faqs";
import HodMessage from "./HodMessage";
import About_home from "./About_Home";
import Testimonial from "./Testimonial";
import Section from "./Section";
const Homepage = () => {
	document.title = "Optima 2025 | IIT Kharagpur";
	return (
		<>
			<Section className="pt-[5rem] -mt-[5.25rem]" id="hero">
				<div>
					<Hero />
				</div>
				<HodMessage />
				<About_home />
				<Testimonial />
				{/* <div className="relative z-10">
          <FAQs />
         </div> */}
			</Section>
		</>
	);
};
export default Homepage;
