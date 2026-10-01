import React from 'react';
import { Mail, Linkedin, Facebook, Instagram } from 'lucide-react';

const ContactUs = () => {
  const members = [
    {
      name: 'Sumanta Ku. Behera',
      role: 'Public Relations & Media Outreach Head',
      image: '/sumanta.jpg',
      description:
        "Welcome to the Campus Ambassador Program for Optima 2025, IIT Kharagpur. Should you have any queries regarding the program, feel free to reach out to me for assistance.",
      socials: {
        mail: 'behera.sumanta.iitkgp@gmail.com',
        linkedin: 'https://www.linkedin.com/in/sumanta-kumar-behera-74763526b',
        facebook: 'https://www.facebook.com/sumanta.iitkgp',
        instagram: 'https://www.instagram.com/sumanta.iitkgp'
      },
    },
    {
      name: 'Manasvi Shekhar',
      role: 'Sponsorship Head',
      image: '/manasvi.jpeg',
      description:
        'Greetings and welcome to the Optima 2025 Campus Ambassador Program at IIT Kharagpur! For any questions or clarifications regarding the program, please don’t hesitate to contact me.',
      socials: {
        mail: 'manasvi.shekhar.iitkgp@gmail.com',
        linkedin: 'https://www.linkedin.com/in/manasvi-shekhar-1a193a257',
        facebook: 'https://www.facebook.com/profile.php?id=100087888134515',
        instagram: 'https://www.instagram.com/manasvi_sn'
      },
    },
  ];

  return (
    <div
      id="contact"
      className="flex flex-col items-center mt-20 max-w-7xl mx-auto px-2 space-y-10"
    >
      <span className="my-1 invisible">gap</span>
      {/* Title Section */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-4 lg:mt-10 tracking-wide leading-tight">
          Feel Free to{' '}
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            Reach Us
          </span>
        </h2>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-18">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 max-w-[430px] mx-auto flex flex-col h-auto md:h-[450px]"
          >
            {/* Card Header */}
            <div className="w-full h-[130px] md:h-[160px] bg-orange-700 flex items-center justify-center">
              <div className="w-[100px] h-[100px] rounded-full bg-white relative overflow-hidden shadow-md">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Card Content */}
            <div className="flex-grow py-4 md:py-8 px-6 space-y-6">
              {/* User Info */}
              <div className="flex flex-col items-center text-center">
                <h3 className="text-2xl font-semibold text-orange-700">{member.name}</h3>
                <p className="font-medium text-gray-600">{member.role}</p>
              </div>

              {/* Description */}
              <p className="text-center text-gray-500 text-sm leading-relaxed">
                {member.description}
              </p>

              {/* Social Icons */}
              <div className="flex justify-center space-x-4">
                {member.socials.mail && (
                  <a
                    href={`mailto:${member.socials.mail}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-orange-600 hover:bg-orange-800 transition"
                  >
                    <Mail/>
                  </a>
                )}
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-orange-600 hover:bg-orange-800 transition"
                  >
                    <Linkedin/>
                  </a>
                )}
                {member.socials.facebook && (
                  <a
                    href={member.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-orange-600 hover:bg-orange-800 transition"
                  >
                    <Facebook/>
                  </a>
                )}
                {member.socials.instagram && (
                  <a
                    href={member.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-orange-600 hover:bg-orange-800 transition"
                  >
                    <Instagram/>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
