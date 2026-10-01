import React from "react";
import "../components/OptimaCss/Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { SiGmail } from "react-icons/si";

const Card = ({ profile }) => {
  return (
    <div className="optima-card">
      {/* contains two divs: front and back */}
      <div className="optima-card-side optima-card-front text-white">
        <img src={profile.imageUrl} alt={`${profile.name}'s Image`} />
        <h2 className="text-2xl font-semibold text-center">{profile.name}</h2>
        <h3 className="text-xl text-center">{profile.positionName}</h3>
      </div>
      <div className="optima-card-side optima-card-back text-white">
        <h2 className="text-2xl lg:text-4xl font-semibold text-center">
          {profile.name}
        </h2>
        <h3 className="text-2xl lg:text-3xl text-center">
          {profile.positionName}
        </h3>
        <p className="optima-card-back-contact">
          <a href={profile.socialLinks.facebook} target="_blank">
            <FontAwesomeIcon
              className="text-3xl lg:text-4xl"
              icon={faSquareFacebook}
            />
          </a>
          <a href={profile.socialLinks.linkedin} target="_blank">
            <FontAwesomeIcon
              className="text-3xl lg:text-4xl"
              icon={faLinkedin}
            />
          </a>
          <a href={profile.socialLinks.mail} target="_blank">
            <SiGmail className=" text-3xl lg:text-4xl" />
          </a>
        </p>
      </div>
    </div>
  );
};

export default Card;
