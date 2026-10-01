import Heading from "./Heading";
import Section from "./Section";
import { Gradient } from "./design/Services.jsx";
import TopCaraousal from "./design/TopCaraousal";
import GallerySlot1 from "./design/GallerySlot1";
import GallerySlot2 from "./design/GallerySlot2";
import GuestLec from "./design/GuestLec";
import { BackgroundCircles } from "./design/Hero.jsx";

const Gallery = () => {
	document.title = "Gallery | Optima 2025";
	return (
		<Section id="gallery">
			<div className="container mx-auto px-4 relative z-2">
				<Heading
					className="md:max-w-md lg:max-w-2xl text-center"
					title="Glimpses of Optima"
				/>
				<BackgroundCircles />
				<div className="custom-slider-wrapper">
					<TopCaraousal />
				</div>
				<div className="mt-15">
					<h1 className="flex items-center justify-center text-xl md:text-3xl lg:text-4xl my-5">
						Guest Lectures
					</h1>
					<GuestLec />
				</div>
				<div className="mt-15">
					<h1 className="flex items-center justify-center text-xl md:text-3xl lg:text-4xl my-5">
						Workshops
					</h1>
					<GallerySlot1 />
				</div>
				<div className="mt-15">
					<h1 className="flex items-center justify-center text-xl md:text-3xl lg:text-4xl my-5">
						Competitions
					</h1>
					<GallerySlot2 />
				</div>
			</div>
			<Gradient />
		</Section>
	);
};

export default Gallery;
