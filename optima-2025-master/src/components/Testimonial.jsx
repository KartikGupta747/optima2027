
import React from "react";
import Section from "./Section";
import { BottomLine } from "./design/Hero";
const Testimonial = () => {
  return (
    <section className="pt-[1rem] mt-[3rem] mb-4 mx-2">
      <div className="mx-auto max-w-screen-2xl px-3 py-3 sm:px-6 lg:px-8 lg:py-5">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-150 sm:text-4xl text-center">
            Endorsements and Reviews
          </h2>
        </div>

        <div className="m-4 py-4 mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 rounded-3xl">
          {/** Example review blocks */}
          {reviews.map((review, index) => (
            <ReviewBlock key={index} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewBlock = ({ review }) => {
  return (
    <blockquote className="flex h-full flex-col justify-between p-4 md:m-2 shadow-sm border border-n-1/10 rounded-3xl  transition-all duration-300 hover:shadow-md hover:shadow-purple-500">
      <div>
        <div className="flex  text-purple-500">
          {Array.from({ length: review.stars }).map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>
        <div className="mt-3">
          <p className="text-1xl font-bold bg-gradient-to-r from-orange-500 to-red-200 bg-clip-text text-transparent sm:text-2xl">
            {review.title}
          </p>
          <p className="mt-2 leading-relaxed text-gray-150">{review.content}</p>
        </div>
      </div>
      <footer className="mt-2 text-sm font-medium text-gray-400 sm:mt-3">
        &mdash; {review.author}
      </footer>
      <BottomLine />
    </blockquote>
  );
};

const StarIcon = () => (
  <svg
    className="size-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Example data for reviews
const reviews = [
  {
    title: "Learning & fun!",
    content:
      "Optima was a brilliant fest! The events were well-curated, with a perfect balance of learning and fun. The workshops, in particular, were highly insightful and engaging.",
    author: "Rajesh Sharma",
    stars:5
  },
  {
    title: "Evident commitment",
    content:
      "Optima was a delightful fest! The team's professionalism and commitment were evident in every aspect. Their ability to handle queries promptly was commendable. Looking forward to the next edition!",
    author: "Priya Gupta",
    stars:4
  },
  {
    title: "Amazing Service!",
    content:
      "I am totally satisfied with the fest management. The team was responsive, professional, and delivered decent attitude towards each participants.",
    author: "Pritish Kumar Panda",
    stars:5
  },
  {
    title: "Would recommend",
    content:
      "Optima exceeded my expectations. The organizers made sure all participants felt valued and included. Their dedication and hard work truly reflected in the success of the fest.",
    author: "Sneha Kulkarni",
    stars:4
  },
  {
    title: "Satisfactory Experience",
    content:
      "Totally worth it to participate in the competitions. It was a great experience to compete against such talented minds. The problems given there were very much challenging.",
    author: "Himanshu Panda",
    stars:5
  },
  {
    title: "Would recommend",
    content:
      "It was great to attend Optima 2023. Competitions were very much engaging and will definately participate next year too.",
    author: "Tej Prakash",
    stars:4
  },
];

export default Testimonial;