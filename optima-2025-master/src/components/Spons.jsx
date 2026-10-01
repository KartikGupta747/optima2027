import React, { useState } from "react";
import brackets from "../assets/svg/Brackets";
import { motion } from "framer-motion";
import { BackgroundCircles, BottomLine } from "./design/Hero";
import Heading from "./Heading";
import Section from "./Section";
import { Gradient } from "./design/Services.jsx";
import Button from "./Button.jsx";
import ComingSoon from "./design/ComingSoon.jsx";
import { Link } from "react-router-dom";

// Separate data into a new file: src/data/sponsorsData.js
const SPONSORS_DATA = {
  2025: {
    title: "Optima 2025 Sponsors",
    categories: {
      titleSponsor: {
        name: "Title Sponsor",
        size: "lg",
        sponsors: ["spons-25/Hire3x.webp"],
      },
      coTitleSponsor: {
        name: "Co-Title Sponsor",
        size: "md",
        sponsors: ["spons-25/Adani_Ai_Sirius_Digitech.webp"],
      },
      platinumSponsor: {
        name: "Platinum Sponsor",
        size: "md",
        sponsors: ["spons-25/ONGC.webp"],
      },
      inAssociationWith: {
        name: "In Association With",
        size: "md",
        sponsors: ["spons-25/GAIL.webp"],
      },
      strategicPartners: {
        name: "Strategic Sponsor",
        size: "md",
        sponsors: ["spons-25/OPTYM.webp"],
      },
      majorSponsors: {
        name: "Major Sponsor",
        size: "md",
        sponsors: ["spons-25/blue_yonder.webp"],
      },
      silverSponsors: {
        name: "Silver Sponsor",
        size: "md",
        sponsors: ["spons-25/IEM.webp"],
      },
      poweredBy: {
        name: "Powered By",
        size: "sm",
        sponsors: ["spons-25/Unstop.webp"],
      },
      eventPartner: {
        name: "Event Partners",
        size: "sm",
        sponsors: ["spons-25/Delhivery_Logo.webp", "spons-25/LiveAi.webp", "spons-25/kgts.webp", "spons-25/decisionOptNew.webp"],
      },
      titleMediaPartner: {
        name: "Title Media Partner",
        size: "sm",
        sponsors: ["spons-25/the-times-of-india.webp"],
      },
      mediaPartner: {
        name: "Media Partners",
        size: "sm",
        sponsors: ["spons-25/CampusVarta.webp", "spons-25/InsightSuccess.webp"],
      
      },
      youthMediaPartner: {
        name: "Youth Media Partner",
        size: "sm",
        sponsors: ["spons-25/YouthIncorporated.webp"],
      },
      outreachPartner: {
        name: "Blogger Outreach Partner",
        size: "sm",
        sponsors: ["spons-25/BlogAdda.webp"],
      },
    },
  },
  2023: {
    title: "Optima 2023 Sponsors",
    categories: {
      titleSponsor: {
        name: "Title Sponsor",
        size: "lg",
        sponsors: ["spons-23/OPTYM.webp"],
      },
      majorSponsors: {
        name: "Major Sponsors",
        size: "md",
        sponsors: ["spons-23/AirIndia.webp", "spons-23/FlexSim.webp"],
      },
      strategicPartners: {
        name: "Strategic Partners",
        size: "sm",
        sponsors: ["spons-23/RahulCommerce.webp", "spons-23/Vicon.webp"],
      },
      eventsPartners: {
        name: "Event Partners",
        size: "sm",
        sponsors: [
          "spons-23/ORMAE.webp",
          "spons-23/DCVisionVR.webp",
          "spons-23/Blue_Yonder.webp",
          "spons-23/Delhivery_Logo.webp",
          "spons-23/GFG.webp",
          "spons-23/Sabre.webp",
        ],
      },
      merchandisePartner: {
        name: "Merchandise Partner",
        size: "sm",
        sponsors: ["spons-23/OwlPrints.webp"],
      },
      mediaPartners: {
        name: "Media Partners",
        size: "sm",
        sponsors: ["spons-23/CampusVarta.webp", "spons-23/WomansEra.webp"],
      },
    },
  },
  previous: {
    title: "Previous Sponsors",
    categories: {
      previousSponsors: {
        name: "Previous Sponsors",
        size: "sm",
        sponsors: [
          "spons-prev/ACC.webp",
          "spons-prev/AIBH.webp",
          "spons-prev/Allied_publishers.webp",
          "spons-prev/GE_HealthCare.webp",
          "spons-prev/RP_Industrial_Consultant.webp",
          "spons-prev/Springer.webp",
          "spons-prev/SR_Srinivasan.webp",
          "spons-prev/TATA.webp",
          "spons-prev/Total_Library_Solution.webp",
        ],
      },
    },
  },
};

const imgToUrl = {
  "spons-prev/ACC.webp": "https://www.acclimited.com/",
  "spons-prev/AIBH.webp": "https://www.aibh.in/",
  "spons-prev/Allied_publishers.webp": "https://www.alliedpublishers.com/",
  "spons-prev/GE_HealthCare.webp": "https://www.gehealthcare.com/",
  "spons-prev/RP_Industrial_Consultant.webp": "https://www.rpic.in/",
  "spons-prev/Springer.webp": "https://www.springer.com/",
  "spons-prev/SR_Srinivasan.webp": "https://www.srsrinivasan.com/",
  "spons-prev/TATA.webp": "https://www.tata.com/",
  "spons-prev/Total_Library_Solution.webp": "https://tlsgroup.co.in/",
  "spons-25/OPTYM.webp": "https://www.optym.com/",
  "spons-25/Unstop.webp": "https://unstop.com/",
  "spons-25/InsightSuccess.webp": "https://www.insightssuccess.in/",
  "spons-25/CampusVarta.webp": "https://www.campusvarta.com/",
  "spons-25/BlogAdda.webp": "https://www.blogadda.com/",
  "spons-25/YouthIncorporated.webp": "https://youthincmag.com/",
  "spons-25/Hire3x.webp": "https://hire3x.com/",
  "spons-25/Adani_Ai_Sirius_Digitech.webp": "https://www.linkedin.com/company/sirius-digitech/",
  "spons-25/ONGC.webp": "https://ongcindia.com/",
  "spons-25/GAIL.webp": "https://gailonline.com/",
  "spons-25/blue_yonder.webp": "https://www.blueyonder.com/",
  "spons-25/the-times-of-india.webp": "https://timesofindia.indiatimes.com/",
  "spons-25/IEM.webp": "http://www.iem.edu.in/",
  "spons-25/Delhivery_Logo.webp": "https://www.delhivery.com/",
  "spons-25/LiveAi.webp": "https://www.liveai.eu/",
  "spons-25/kgts.webp": "https://www.linkedin.com/company/the-kgts/?originalSubdomain=in",
  "spons-25/decisionOptNew.webp": "https://decisionopt.com/",
  "spons-23/OPTYM.webp": "https://www.optym.com/",
  "spons-23/AirIndia.webp": "https://www.airindia.in/",
  "spons-23/FlexSim.webp": "https://www.flexsim.com/",
  "spons-23/RahulCommerce.webp": "http://rahulcom.com/",
  "spons-23/Vicon.webp": "https://www.vicon.com/",
  "spons-23/ORMAE.webp": "https://www.ormae.com/",
  "spons-23/DCVisionVR.webp": "https://dcvision.in/",
  "spons-23/Blue_Yonder.webp": "https://www.blueyonder.com/",
  "spons-23/Delhivery_Logo.webp": "https://www.delhivery.com/",
  "spons-23/GFG.webp": "https://www.geeksforgeeks.org/",
  "spons-23/Sabre.webp": "https://www.sabre.com/",
  "spons-23/OwlPrints.webp": "https://www.owlprints.in/",
  "spons-23/CampusVarta.webp": "https://www.campusvarta.com/",
  "spons-23/WomansEra.webp": "https://www.womansera.com/",
};

// Component for sponsor category section
const SponsorCategory = ({ name, sponsors, size = "sm" }) => {
  const sizeClasses = {
    sm: "max-w-[18rem] p-1",
    md: "max-w-[32rem] p-2",
    lg: "max-w-[42rem] p-3",
  };

  return (
    <div className="mb-10">
      <h2
        className={`font-bold mb-6 text-center ${
          size === "lg" ? "text-4xl mt-12" : "text-2xl"
        }`}
      >
        {name}
      </h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {sponsors.map((spons) => (
          <a
            key={spons}
            href={imgToUrl[spons]}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={`relative rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300 ${sizeClasses[size]} group`}
            >
              <SponsCard imageUrl={`/assets/spons/${spons}`} size={size} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

// Updated SponsCard component
const SponsCard = ({ imageUrl, size = "sm" }) => {
  const heightClasses = {
    sm: "h-40",
    md: "h-56 md:h-72",
    lg: "h-[250px] md:h-[400px]",
  };

  const widthClasses = {
    sm: "w-40",
    md: "w-56 md:w-72",
    lg: "w-[250px] md:w-[400px]",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`${heightClasses[size]} ${widthClasses[size]} bg-white rounded-lg shadow-md flex items-center justify-center overflow-hidden relative z-10`}
    >
      <motion.img
        src={imageUrl}
        alt="Sponsor"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="h-full w-auto object-contain p-2"
      />
    </motion.div>
  );
};

// Main Spons component
// const Spons = () => {
//   const [activeTab, setActiveTab] = useState("2025");
//   const tabs = [
//     { id: "2025", label: "2024-2025" },
//     { id: "2023", label: "2023-2024" },
//     { id: "previous", label: "Previous" },
//   ];

//   return (
//     <Section
//       id="spons"
//     >
//       <div className="relative z-10">
//         <BackgroundCircles />
//       </div>
//       <div className="container mx-auto relative z-20">
//         <Heading
//           className="md:max-w-md lg:max-w-2xl text-center "
//           title="Our Esteemed Sponsors"
//         />

//         <div className="flex flex-col md:flex-row  w-72 mx-auto md:w-auto md:justify-center gap-4 mb-8">
//           {tabs.map((tab) => (
//             // <TabButton
//             //   key={tab.id}
//             //   active={activeTab === tab.id}
//             //   onClick={() => setActiveTab(tab.id)}
//             //   label={tab.label}
//             // />
//             <Button
//               key={tab.id}
//               active={activeTab === tab.id}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               {tab.label}
//             </Button>
//           ))}
//         </div>

//         {activeTab === "previous" ? (
//           <div className="flex flex-wrap gap-10 mb-10 items-center justify-center">
//             {SPONSORS_DATA.previous.sponsors.map((spons) => (
//               <div
//                 key={spons}
//                 className="relative p-4 rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300 md:max-w-[18rem] group"
//               >
//                 <SponsCard imageUrl={`/assets/spons/spons-prev/${spons}`} />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-10">
//             {Object.entries(SPONSORS_DATA[activeTab].categories).map(
//               ([key, category]) => (
//                 <SponsorCategory
//                   key={key}
//                   name={category.name}
//                   sponsors={category.sponsors}
//                   size={category.size}
//                 />
//               )
//             )}
//           </div>
//         )}
//       </div>

//       <Gradient />
//     </Section>
//   );
// };

const Spons = () => {
  document.title = "Sponsors | Optima 2025";
  const [activeTab, setActiveTab] = useState("2025");

  return (
    <Section id="spons">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl text-center"
          title="Our Esteemed Sponsors"
        />
        <BackgroundCircles />
        <div className="flex flex-col md:flex-row w-36  mx-auto md:w-auto md:justify-center gap-4 mb-8">
          <SelectButton
            active={activeTab === "2025"}
            onClick={() => setActiveTab("2025")}
          >
            2024-2025
          </SelectButton>
          <SelectButton
            active={activeTab === "2023"}
            onClick={() => setActiveTab("2023")}
          >
            2023-2024
          </SelectButton>
          <SelectButton
            active={activeTab === "previous"}
            onClick={() => setActiveTab("previous")}
          >
            Previous
          </SelectButton>
        </div>
        {/* Hardcoded Content Based on Selection */}
        {activeTab === "2025" && (
          // <div className="flex justify-center z-0">
          // 	<ComingSoon /> {/* dummy */}
          // </div>
          <div className="space-y-10">
            {Object.entries(SPONSORS_DATA["2025"].categories).map(
              ([key, category]) => (
                <SponsorCategory
                  key={key}
                  name={category.name}
                  sponsors={category.sponsors}
                  size={category.size}
                />
              )
            )}
          </div>
        )}

        {activeTab === "2023" && (
          <div className="space-y-10">
            {Object.entries(SPONSORS_DATA["2023"].categories).map(
              ([key, category]) => (
                <SponsorCategory
                  key={key}
                  name={category.name}
                  sponsors={category.sponsors}
                  size={category.size}
                />
              )
            )}
          </div>
        )}
        {activeTab === "previous" && (
          <div className="space-y-10">
            {Object.entries(SPONSORS_DATA["previous"].categories).map(
              ([key, category]) => (
                <SponsorCategory
                  key={key}
                  name={category.name}
                  sponsors={category.sponsors}
                  size={category.size}
                />
              )
            )}
          </div>
        )}
      </div>

      <Gradient />
    </Section>
  );
};


const SelectButton = ({ active, href, onClick, children }) => {
	const classes = `
    px-3 md:px-6 py-3 rounded-full transition-all duration-300
    ${
      active
        ? "bg-white text-primary-1 text-black shadow-lg transform scale-105"
        : "bg-n-8/80 text-n-3 hover:bg-n-6 hover:text-white"
    }
    font-medium border border-n-6 justify-center
    flex items-center gap-2
    text-center
  `
	const spanClasses = "relative z-10";

	const renderButton = () => (
		<button className={classes} onClick={onClick}>
			<span className={spanClasses}>{children}</span>
		</button>
	);

	const renderLink = () =>
		href.startsWith("/") ? (
			<Link to={href} className={classes}>
				<span className={spanClasses}>{children}</span>
			</Link>
		) : (
			<a href={href} className={classes} target="_blank">
				<span className={spanClasses}>{children}</span>
			</a>
		);

	return href ? renderLink() : renderButton();
};

export default Spons;
