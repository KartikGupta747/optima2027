import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWandMagicSparkles,
  faPersonPraying,
} from "@fortawesome/free-solid-svg-icons";
import AnimationComingSoon from "./AnimationComingSoon";
const ComingSoon = ({ link }) => {
  return (
    <div
      className="max-w-[700px] flex flex-col justify-center items-center rounded-3xl gap-5 p-5 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(125deg, rgba(56, 20, 96, 0.8), rgba(11, 11, 58, 0.95))",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <h1 className="text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
        Coming Soon
      </h1>
      <div>
        <AnimationComingSoon />
      </div>
      <p className="text-center text-gray-300">
        Stay tuned! Something exciting and more
        <span className="text-purple-400 font-semibold">
          {" "}
          optimized{" "}
          <FontAwesomeIcon
            icon={faWandMagicSparkles}
            fade
            style={{ color: "#a855f7" }}
          />{" "}
        </span>
        is on the way.
      </p>
      {link && (
        <div className="text-sm md:text-2xl text-center mt-6 p-2">
          <a
            href={link}
            className=" p-2 rounded-md cursor-pointer"
            target="_blank"
            style={{
              background:
                "linear-gradient(125deg, rgba(58, 16, 106, 0.8), rgba(10, 10, 94, 0.95))",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            Visit Our past Edition
          </a>
        </div>
      )}
    </div>
  );
};

export default ComingSoon;
