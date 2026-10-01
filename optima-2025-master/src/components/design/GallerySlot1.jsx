import React from "react";
import '../OptimaCss/Gallery.css'; // Custom CSS file for styles
import CollageGallery from "./CollageGallery";

const GallerySlot1 = () => {
  const images = [
    "/GalleryPhotos/workshops/w5.webp",
    "/GalleryPhotos/workshops/w3.webp",
    "/GalleryPhotos/workshops/w4.webp",
    "/GalleryPhotos/workshops/w1.webp",
    "/GalleryPhotos/workshops/w2.webp",
  ];

  return (
    <CollageGallery images={images} />
  );
};

export default GallerySlot1;
