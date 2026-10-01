import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import WhyCA from "./WhyCA";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-7">
      <h1 className="text-2xl sm:text-4xl lg:text-5xl text-center tracking-wide leading-tight md:leading-snug  sm:px-6 lg:px-12 max-w-screen-lg mx-auto whitespace-normal break-words">
        Join the
        <span className="block p-2 text-4xl sm:text-6xl lg:text-7xl bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          Campus Ambassador Program!
        </span>
        Optima 2025
      </h1>

      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Unleash the power of optimization! Step up and pioneer new avenues for
        techno-optimization, driving innovation and shaping the technological
        future of your campus!
      </p>

      <div className="flex my-10 w-auto">
        {/* Left Part */}
        <div className="flex justify-center ">
          <a
            href="/register"
            className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md hover:from-orange-600 hover:to-orange-900"
          >
            Register Now
          </a>
        </div>

        {/* Right Part */}
        <div className="flex justify-center ">
          <a
            href="https://optima.org.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md transform transition-transform duration-300  relative overflow-hidden"
            style={{
              display: "inline-block",
              position: "relative",
              background:
                "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "0% 0",
              transition: "background-position 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundPosition = "0% 0"; // Trigger shine effect on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundPosition = "-100% 0"; // Reset shine effect when not hovering
            }}
          >
            Visit Optima {">"}
          </a>
        </div>
      </div>

      <div className="flex mt-4 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <WhyCA />
    </div>
  );
};

export default HeroSection;
