import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  const socialLinks = [
    { icon: <MdEmail />, url: "mailto:sumanta@optima.org.in" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/optima.iitkgp" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/company/optima-iitkgp" },
    { icon: <FaFacebook />, url: "https://www.facebook.com/optima.iitkharagpur" },
  ];

  const quickLinks = [
    { path: "#", label: "Home" },
    { path: "#overview", label: "Overview" },
    { path: "#faq", label: "FAQs" },
    { path: "#testimonials", label: "Testimonials" },
  ];

  return (
    <footer id="footer" className="mt-20 md:m-10 border-t border-neutral-700">
      <div className="container mx-auto px-6 py-6 md:py-8 lg:py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Part - Branding and Copyright */}
        <div className="flex flex-col justify-center items-center md:pr-20 space-y-6">
          <div className="flex items-center flex-shrink-0">
            <img
              className="h-14 w-14 mr-3"
              src={"/logo-optima.png"}
              alt="Logo"
            />
            <span className="text-3xl tracking-tight ">Optima 2025</span>
          </div>
          <p className="text-gray-500 text-center md:text-left text-sm md:text-md">
            © Optima {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>

        {/* Right Part - Quick Links and Social Media */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl text-white mb-4">Contact Us</h3>
            <p className="flex items-center text-gray-400 mb-3 text-md md:text-sm lg:text-md"> <FiPhoneCall className="mr-1"/> +91 6370708967</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target={social.url.startsWith("mailto:") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-3xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
