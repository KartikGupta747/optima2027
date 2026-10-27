import React from "react";
import Hero from "./Hero";
import AboutLeadership from "./AboutLeadership";
import Competitions from "./Competitions";
import GuestLecture from "./GuestLecture";
import Schedule from "./Schedule";
import Gallery from "./Gallery";
import Spons from "./Spons";
import Team from "./Team";

const Homepage = () => {
  document.title = "Optima 2027 | IIT Kharagpur";
  return (
    <main className="w-full bg-[#030305]">
      {/* 1. The Initiation */}
      <Hero />

      {/* 2. The Context (About & Leadership + Endorsements) */}
      <AboutLeadership />

      {/* 3. The Arena (Competitions Bento Grid) */}
      <Competitions />

      {/* 4. The Minds (Guest Lectures Horizontal Scroll) */}
      <GuestLecture />

      {/* 5. The Blueprint (Schedule Timeline) */}
      <Schedule />

      {/* 6. The Optical Archive (The Velocity Parallax Matrix) */}
      <Gallery />

      {/* 7. The Network (Sponsors Hierarchy) */}
      <Spons />

      {/* 7. The Architects (Team Database Table) */}
      <Team />
    </main>
  );
};

export default Homepage;
