
import { Shirt, Bed, Gift, Trophy, ScrollText, ShieldCheck } from 'lucide-react';

import user1 from "/t1.jpg";
import user2 from "/t2.jpg";
import user3 from "/t3.jpg";

export const navItems = [
  { label: "Home", href: "/#" },
  { label: "Overview", href: "/#overview" },
  { label: "FAQs", href: "/#faq"},
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Sponsors", href: "https://optima.org.in/sponsors", target: "_blank", rel: "noopener noreferrer" },
  { label: "Contact Us", href: "/#footer"},
];

export const testimonials = [
  {
    user: "Pritish Ku. Panda",
    company: "PMEC, Berhampur",
    image: user1,
    text: "I am totally satisfied with the fest management. The team was responsive, professional, and delivered decent attitude towards each participants.",
  },
  {
    user: "Himanshu Panda",
    company: "OUTR, Bhubaneswar",
    image: user2,
    text: "Totally worth it to participate in the competitions. It was a great experience to compete against such talented minds. The problems given there were very much challenging.",
  },
  {
    user: "Tej Prakash",
    company: "IIT(ISM) Dhanbad",
    image: user3,
    text: "It was great to attend Optima 2023. Competitions were very much engaging and will definately participate next year too.",
  },
];

export const features = [
  {
    icon: <Shirt />,
    text: "Merchandise",
    description:
      "Exclusive Optima-branded merchandise.",
  },
  {
    icon: <Bed />,
    text: `Free Registration${'*'}`,
    description:
      "Stay at IIT Kharagpur during the fest without any registration fees!",
  },
  {
    icon: <Gift />,
    text: "Goodies Galore",
    description:
      "Receive amazing goodies as a token of appreciation.",
  },
  {
    icon: <Trophy />,
    text: "Trophies for Excellence",
    description:
      "The top Campus Ambassadors will be awarded trophies for their exceptional efforts.",
  },
  {
    icon: <ScrollText />,
    text: "Certificates",
    description:
      "Gain a certificate recognizing your contributions to Optima.",
  },
  {
    icon: <ShieldCheck />,
    text: `Internship Opportunities${'*'}`,
    description:
      "Top performers may stand a chance to be offered internship opportunities through our partner companies!",
  },
];

export const checklistItems = [
  {
    title: "Promoting Optima",
    description:
      "Spread awareness about our events and the fest in general in your campus.",
  },
  {
    title: "Driving Student Participation",
    description:
      "Encourage students to register and participate in our exciting competitions and workshops.",
  },
  {
    title: "Social Media Outreach",
    description:
      "Publicize Optima's social media handles among the students to grow our online community.",
  },
  // {
  //   title: "Coordinating with Authorities",
  //   description:
  //     "The Campus Ambassador may coordinate with the fest authorities to extensively circulate the message regarding the conduction of Optima 2025 events and initatives.",
  // },
];

