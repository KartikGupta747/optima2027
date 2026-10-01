import Heading from "./Heading";
import { useState } from "react";
import Section from "./Section";
import { BackgroundCircles } from "./design/Hero";
import { Gradient } from "./design/Services.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faSquareFacebook,
  faSquareInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { submitQuery } from "../utils/api"; // ✅ Import API function

const QueryUs = () => {
  document.title = "Contact | Optima 2025";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const queryData = { name, email, phone, query };

    try {
      await submitQuery(queryData); // ✅ Send data to backend
      setMessage({ type: "success", text: "Query raised successfully!" });

      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setQuery("");
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to submit query. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="query-us">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl text-center"
          title="Have Any Query? Let us know"
        />
        <BackgroundCircles />
        <div className="rounded-lg p-0.25 bg-conic-gradient">
          <div className="relative rounded-lg overflow-hidden bg-n-8 min-h-96 flex flex-col md:flex-row lg:flex-row">
            <div className=" flex flex-col justify-center items-start md:w-1/2 lg:w-1/2 p-4 md:p-8 text-lg lg:text-xl">
              <a
                href="https://maps.app.goo.gl/7t9fs2Z4KE2Dqjnb6"
                target="_blank"
                className="mb-4"
              >
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ color: "#9333ea" }}
                />{" "}
                Department of Industrial and Systems Engineering,
                <br/> 
                IIT Kharagpur - 721302
              </a>
              <div className="flex flex-col gap-0 mb-4">
                <a href="tel:+916370708967">
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ color: "#9333ea" }}
                  />
                  <span className="pl-2">+91 6370708967</span>
                </a>
                <a href="tel:+917027000295">
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ color: "#9333ea" }}
                  />
                  <span className="pl-2">+91 7027000295</span>
                </a>
              </div>
              <div className="flex flex-col gap-0 mb-4">
                <a href="mailto:sumanta@optima.org.in">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ color: "#9333ea" }}
                  />{" "}
                  sumanta@optima.org.in
                </a>
                <a href="mailto:baranwalsanchay01@gmail.com">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ color: "#9333ea" }}
                  />{" "}
                  sanchay@optima.org.in
                </a>
              </div>
              <h1 className="mb-3">Get connected with us:</h1>
              <div className="flex flex-row justify-center gap-5 md:gap-8 min-w-full items-start text-4xl">
                <a
                  className="hover:text-purple-500 transition-all duration-300 ease-in-out transform hover:scale-110"
                  href="https://www.facebook.com/optima.iitkharagpur"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faSquareFacebook} />
                </a>
                <a
                  className="hover:text-purple-500 transition-all duration-300 ease-in-out transform hover:scale-110"
                  href="https://www.instagram.com/optima.iitkgp?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faSquareInstagram} />
                </a>
                <a
                  className="hover:text-purple-500 transition-all duration-300 ease-in-out transform hover:scale-110"
                  href="https://www.linkedin.com/company/optima-iitkgp/"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                  className="hover:text-purple-500 transition-all duration-300 ease-in-out transform hover:scale-110"
                  href="https://youtube.com/@optima.iitkgp?si=awtEARkQ8C7UUDxi"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </div>
            </div>
            <div className=" md:w-1/2 lg:w-1/2 p-4 md:p-8">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-between items-start text-lg lg:text-xl gap-4"
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full px-3 py-2 outline-none outline outline-1 outline-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800"
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full px-3 py-2 outline-none outline outline-1 outline-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800"
                  placeholder="Email"
                  required
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full px-3 py-2 outline-none outline outline-1 outline-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800"
                  placeholder="Phone No"
                  required
                />
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="mt-2 w-full px-3 py-2 outline-none outline outline-1 outline-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800"
                  placeholder="Share your queries here..."
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 w-full outline-none rounded-lg bg-purple-500 transition-all duration-300 ease-in-out transform  hover:bg-purple-800"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
                {message && (
                  <div
                    className={
                      message.type === "success"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {message.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Gradient />
    </Section>
  );
};

export default QueryUs;
