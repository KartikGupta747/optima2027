import React from "react";
import "../OptimaCss/Gallery.css";

const guestLectures = [
	{
		id: 1,
		image: "/GalleryPhotos/guest-lecture-images/g1.webp",
		title: "Deeptak Chatterjee",
		description: "Head of Application Development & Innovation, Tata Steel",
	},
	{
		id: 2,
		image: "/GalleryPhotos/guest-lecture-images/g2.webp",
		title: "Dr. Amit Kumar Das",
		description:
			"Head of Operations Technology, Air India Digital and Tech",
	},
	{
		id: 3,
		image: "/GalleryPhotos/guest-lecture-images/g3.webp",
		title: "Bala Srinivasan",
		description: "Director, Operations Reasearch & Data Science at Sabre",
	},
];

const GuestLec = () => {
	return (
		<div className="Guest-container mx-auto px-4 sm:px-8">
			<div className="Guest-grid h-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
				{guestLectures.map((lec) => (
					<div
						key={lec.id}
						className="Guest-card group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
					>
						<img
							src={lec.image}
							alt={lec.title}
							className="Guest-img w-full object-cover transition-transform duration-300 group-hover:scale-110"
						/>
						<div className="Guest-overlay absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-400">
							<div className="Guest-text absolute bottom-4 px-2 text-white">
								<h3 className="text-xl font-bold">
									{lec.title}
								</h3>
								<p className="text-sm mt-2">
									{lec.description}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default GuestLec;
