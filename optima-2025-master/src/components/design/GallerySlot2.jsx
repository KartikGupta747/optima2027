import React from "react";
import '../OptimaCss/Gallery.css'; // Custom CSS file for styles
import { GradientLight } from "./Benefits";
import CollageGallery from "./CollageGallery";

const GallerySlot2 = () => {
  const images = [
    "/GalleryPhotos/competitions/c1.webp",
    "/GalleryPhotos/competitions/c2.webp",
    "/GalleryPhotos/competitions/c3.webp",
    "/GalleryPhotos/competitions/c4.webp",
    "/GalleryPhotos/competitions/c5.webp",
    "/GalleryPhotos/competitions/c6.webp",
    "/GalleryPhotos/competitions/c7.webp",
    "/GalleryPhotos/competitions/c8.webp",
  ];

  return (
    <CollageGallery images={images}/>
  );
};

export default GallerySlot2;
