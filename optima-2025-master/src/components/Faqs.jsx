"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { GradientLight } from "./design/Benefits";

const tabs = [
  {
    title: "How do UI components improve UX?",
    description:
      "UI components can improve UX by providing familiar, consistent interactions that make it easy for users to navigate and interact with an application.",
    imageUrl:
      "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format",
  },
  {
    title: "Common UI component design challenges?",
    description:
      "Some common challenges include maintaining consistency across different devices and screen sizes, ensuring compatibility with various browsers and assistive technologies, and balancing flexibility with ease of use.",
    imageUrl:
      "https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1200&auto=format",
  },
  {
    title: "Ensuring UI component responsiveness?",
    description:
      "Developers can ensure the responsiveness of UI components by using techniques such as fluid layouts, flexible grids, and media queries to adapt the components to different screen sizes and orientations.",
    imageUrl:
      "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format",
  },
  {
    title: "Ensuring UI component responsiveness?",
    description:
      "Developers can ensure the responsiveness of UI components by using techniques such as fluid layouts, flexible grids, and media queries to adapt the components to different screen sizes and orientations.",
    imageUrl:
      "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format",
  },
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto pb-5 ">
      <h1 className="text-center text-4xl font-bold pt-2 pb-4">FAQs</h1>

      <div className="h-fit border rounded-lg p-2">
        {tabs.map((tab, index) => (
          <motion.div
            key={index}
            className={`overflow-hidden ${
              index !== tabs.length - 1 ? "border-b" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            <button
              aria-expanded={activeIndex === index}
              aria-controls={`faq-${index}`}
              className={`${
                activeIndex === index
                  ? "text-orange-500 hover:text-orange-500"
                  : "hover:text-purple-500"
              } p-3 px-2 w-full cursor-pointer sm:text-base text-xs items-center transition-all font-semibold  text-gray-100 flex gap-2`}
            >
              <Plus
                className={`${
                  activeIndex === index ? "rotate-45" : "rotate-0"
                } transition-transform ease-in-out w-5 h-5 dark:text-gray-200 text-gray-400`}
              />
              {tab.title}
            </button>
            <AnimatePresence mode="sync">
              {activeIndex === index && (
                <motion.div
                  id={`faq-${index}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut", delay: 0.14 }}
                >
                  <p className=" text-gray-300 p-3 xl:text-base sm:text-sm text-xs pt-0 pl-9 w-[95%]">
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

export default FAQ;
