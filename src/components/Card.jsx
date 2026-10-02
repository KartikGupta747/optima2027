import React from "react";
import "../components/OptimaCss/Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { SiGmail } from "react-icons/si";

const Card = ({ profile }) => {
  const hasFacebook = profile.socialLinks?.facebook && profile.socialLinks.facebook.trim() !== "";
  const hasLinkedin = profile.socialLinks?.linkedin && profile.socialLinks.linkedin.trim() !== "";
  const hasMail = profile.socialLinks?.mail && profile.socialLinks.mail.trim() !== "";

  return (
    <div className="optima-card">
      {/* Front */}
      <div className="optima-card-side optima-card-front text-white">
        <img src={profile.imageUrl} alt={`${profile.name}'s Image`} />
        <h2 className="text-2xl font-semibold text-center">{profile.name}</h2>
        <h3 className="text-xl text-center">{profile.positionName}</h3>
      </div>
      {/* Back */}
      <div className="optima-card-side optima-card-back text-white">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center">
          {profile.name}
        </h2>
        <h3 className="text-xl lg:text-2xl text-center">
          {profile.positionName}
        </h3>
        <p className="optima-card-back-contact">
          {hasFacebook && (
            <a href={profile.socialLinks.facebook} target="_blank" rel="noreferrer">
              <FontAwesomeIcon
                className="text-3xl lg:text-4xl"
                icon={faSquareFacebook}
              />
            </a>
          )}
          {hasLinkedin && (
            <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer">
              <FontAwesomeIcon
                className="text-3xl lg:text-4xl"
                icon={faLinkedin}
              />
            </a>
          )}
          {hasMail && (
            <a href={profile.socialLinks.mail} target="_blank" rel="noreferrer">
              <SiGmail className="text-3xl lg:text-4xl" />
            </a>
          )}
        </p>
      </div>
    </div>
  );
};

export default Card;
