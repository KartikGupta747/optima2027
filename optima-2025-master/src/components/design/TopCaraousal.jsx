import React from "react";
import Slider from "react-slick";
import "../OptimaCss/Gallery.css"; // Custom CSS file for styles

function TopCaraousal() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true, // Enables auto-sliding
		autoplaySpeed: 3000, // Auto-slide interval in milliseconds
		arrows: false, // Hides navigation arrows
		appendDots: (dots) => (
			<div style={{ bottom: "-20px" }}>
				<ul> {dots} </ul>
			</div>
		), // Moves dots into slider parent
		responsive: [
			{
				breakpoint: 768, // For tablets
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 480, // For mobile devices
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	const images = [
		"/GalleryPhotos/day0-images/4.webp",
		"/GalleryPhotos/day0-images/6.webp",
		"/GalleryPhotos/day0-images/8.webp",
		"/GalleryPhotos/day0-images/9.webp",
		"/GalleryPhotos/day0-images/10.webp",
		"/GalleryPhotos/day0-images/11.webp",
		"/GalleryPhotos/day0-images/12.webp",
		"/GalleryPhotos/day0-images/13.webp",
		"/GalleryPhotos/day0-images/14.webp",
		"/GalleryPhotos/day0-images/IMG_2518.webp",
	];

	return (
		<div className="gallery-slider-container">
			<Slider {...settings}>
				{images.map((image, index) => (
					<div key={index} className="gallery-slide-item">
						<img
							src={image}
							alt={`Slide ${index + 1}`}
							className="gallery-slide-image"
						/>
					</div>
				))}
			</Slider>
		</div>
	);
}

export default TopCaraousal;
