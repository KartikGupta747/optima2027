import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const tabs = [
  {
    title: "What are the eligibilities of a Campus Ambassador?",
    description:
      "Campus Ambassadors should be enrolled in college, passionate about the optimization, have strong communication, leadership, and networking skills, be active on social media, and manage time effectively while promoting the Optima",
    imageUrl:
      "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format",
  },
  {
    title: "As a Campus Ambassador, What my responsibilities are?",
    description:
      "As a campus Ambassador, you'll promote the Optima, organize events, engage on social media, network, recruit participants, create content, provide feedback, and track engagement to enhance the Optima’s presence in your campus",
    imageUrl:
      "https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1200&auto=format",
  },
  {
    title: "How can I be a Campus Ambassador?",
    description:
      " After registration, you will get a mail for an interview. After clearing interview, Congrats! you are having a designation as a Campus Ambassador, Optima 2025",
    imageUrl:
      "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format",
  },
  {
    title: "How does the CA program works?",
    description:
      "CAs are the first point of contact to any student in their colleges for providing any kind of information about Optima. They are Optima representatives in their respective colleges. Optima is connected with CAs throughout the program.",
    imageUrl:
      "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format",
  },
];

function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItem, setActiveItem] = useState(tabs[0]);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
    const newActiveItem = tabs.find((_, i) => i === index);
    setActiveItem(newActiveItem);
  };

  return (
    <div id="faq" className="container mx-auto pt-4 mt-10">
      <div className="text-center">
        <span className="invisible">
          - Overview -
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            FAQs
          </span>
        </h2>
      </div>
      <div className="h-fit border rounded-lg p-2 mt-10">
        {tabs.map((tab, index) => (
          <motion.div
            key={index}
            className={`overflow-hidden ${
              index !== tabs.length - 1 ? "border-b" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            <button
              className={`p-3 px-2 w-full cursor-pointer md:text-xl text-base items-center transition-all text-white flex gap-2`}
            >
              <Plus
                className={`${
                  activeIndex === index ? "rotate-45" : "rotate-0"
                } transition-transform ease-in-out w-5 h-5 text-white`}
              />
              {tab.title}
            </button>
            <AnimatePresence mode="sync">
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: 0.14,
                  }}
                >
                  <p className="text-gray-400 italic p-3 pl-8 md:text-base text-sm pt-0 w-[90%]">
                    {tab.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default FaqSection;
