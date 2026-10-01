import { curve , heroBackground } from "../assets";
import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine} from "./design/Hero";
import { useRef } from "react";
("use client");
import CarouselComponent from "../components/design/Optima-carousal";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <>
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>


        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3rem] md:mb-[4rem] lg:mb-[4.8rem]">
          <h1 className="h1 mb-6">
            Welcome&nbsp;to
            {` `}
            <span className="inline-block relative">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 text-transparent bg-clip-text">
                Optima 2025
              </span>{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={450}
                height={20}
                alt="Curve"
              />
            </span>
          </h1>

          <p className="max-w-5xl mx-auto mb-6 md:text-lg text-gray-200 lg:mb-8">
            IIT Kharagpur's renowned Techno-Optimization Fest, Optima, is back
            from 7th-9th March 2025, proudly organized by the Department of
            Industrial&nbsp;and&nbsp;Systems Engineering.
          </p>

          {/* <Button href="/" white>
            Register
          </Button> */}

        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-3xl xl:mb-11">
          
          <CarouselComponent />
          

          {/* background blue color  */}

          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[102%]">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>
          
          <BackgroundCircles />

        </div> 
          
      </div>
    
     
      
    </Section>
    </>

  );
};

export default Hero;
