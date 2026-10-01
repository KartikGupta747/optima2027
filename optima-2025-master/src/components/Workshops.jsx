import React, { useState, useEffect } from "react";
import { workshops } from "../constants/Workshops";
import Heading from "./Heading";
import Section from "./Section";
import { motion } from "framer-motion";
import { Gradient } from "./design/Services";
import { BackgroundCircles } from "./design/Hero";
import ComingSoon from "./design/ComingSoon";
import { grid } from "../assets";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";
import "../components/OptimaCss/Workshop.css";

// New component for handling workshop text with read more functionality
const WorkshopDescription = ({ text }) => {
  const [showFull, setShowFull] = useState(false);
  const [isLongText, setIsLongText] = useState(false);
  const characterLimit = 300; // Adjust this value based on your needs

  useEffect(() => {
    // Check if text is long enough to need the "Read More" button
    setIsLongText(text && text.length > characterLimit);
  }, [text]);

  const toggleShowFull = () => setShowFull(!showFull);

  if (!text) return null;

  const getDescription = () => {
    if (showFull || !isLongText) {
      return text;
    }
    // Return truncated text with ellipsis
    return text.substring(0, characterLimit);
  };

  return (
    <div>
      <p className="body-1 text-n-3 md:text-n-4 mb-2">
        {getDescription()}
      {isLongText && (
        <button
          onClick={toggleShowFull}
          className="text-purple-400 hover:text-purple-300 mb-6"
        >
          {showFull ? "...Read Less" : "...Read More"}
        </button>
      )}
	  </p>
    </div>
  );
};

const Workshops = () => {
  document.title = "Workshops | Optima 2025";

  return (
    <Section id="workshops">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl text-center"
          title="Workshops"
        />
        <BackgroundCircles />

        {/* <div className="flex justify-center">
          <ComingSoon link="https://2023.optima.org.in/workshops" />
        </div> */}
        <div className="relative grid gap-6 md:grid-cols-2 md:gap-12 md:pb-[7rem]">
          {workshops.map((workshop) => (
            <div className="md:flex even:md:translate-y-[10rem] p-0.25 rounded-[2.5rem] bg-conic-gradient">
              <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500">
                {/* <div className="absolute top-0 left-0 max-w-full">
                  <img
                    className="w-full"
                    src={grid}
                    width={550}
                    height={550}
                    alt="Grid"
                  />
                </div> */}
                <div className="relative z-1">
                  {workshop.animationlink && (
                    <div className="mb-1">
                      <DotLottieReact
                        className="w-[90%] mx-auto rounded-xl"
                        src={workshop.animationlink}
                        loop
                        autoplay
                        width={428}
                        height={326}
                      />
                    </div>
                  )}

                  <h4 className="h2 md:h4 mb-4">{workshop.title}</h4>
                  {workshop.companyLink && (
                    <div className="flex mb-4">
                      <h4 className="text-lg md:text-2xl mr-2.5">by</h4>
                      <Link
                        to={workshop.companyLink}
                        target="_blank"
                        className="text-md md:text-lg rounded-lg p-1 bg-purple-600 hover:bg-purple-500 transition transform-translate duration-200"
                      >
                        {workshop.company}
                      </Link>
                    </div>
                  )}
                  {workshop.text && (
                    <WorkshopDescription text={workshop.text} />
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* waiting animation*/}
          {/* <div className="md:flex even:md:translate-y-[10rem] p-0.25 rounded-[2.5rem] bg-n-7 relative overflow-hidden workshop-shine flex items-center justify-center min-h-[500px] md:min-h-[800px]">
            <div className="relative p-8 rounded-[2.4375rem] overflow-hidden xl:p-15 flex items-center justify-center">
              <div className="h2 md:h4 mb-4 flex items-center justify-center">
                <DotLottieReact
                  className="w-full max-w-[428px] mx-auto rounded-xl opacity-80"
                  src="https://lottie.host/df71c51b-5927-4054-a0b3-9564d8ac7cac/NBte6JOa8o.lottie"
                  loop
                  autoplay
                  width={428}
                  height={428}
                />
              </div>
            </div>
          </div> */}

          <Gradient />
        </div>
      </div>
      <Gradient />
    </Section>
  );
};

export default Workshops;