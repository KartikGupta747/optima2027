import Section from "./Section";
import hod from "../assets/HodMessage/hod.webp";
import chair from "../assets/HodMessage/chairman.webp";
import cochair from "../assets/HodMessage/cochairman.webp";
import { Gradient } from "./design/Services";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";

const HodMessage = () => {
  return (
    <Section id="how-to-use">
      <div className="container">
        <div className="relative">
          {/* Containing 3 divs */}
          <div className="relative z-1 grid gap-12 lg:grid-cols-[60%,35%]">
            {/* larger div */}
            <div className="p-3 border border-n-1/10 flex flex-col justify-between items-center rounded-3xl transition-all duration-300 hover:shadow-md hover:shadow-purple-500">
              <h1 className="text-2xl lg:text-3xl m-3 font-semibold">
                Message from Head of the Department
              </h1>
              <div className="min-w-full flex justify-center items-center rounded-3xl">
                <img src={hod} alt="hod" className="rounded-3xl w-40 lg:w-48" />
              </div>
              <h1 className="text-xl lg:text-2xl font-semibold mt-2">
                Prof. Jhareshwar Maiti
              </h1>
              <p className="p-4 text-n-2 md:text-lg lg:p-8">
                {/* <span className="text-purple-500 font-semibold text-4xl">
                  ✎...{" "}
                </span> */}
                "As the Department of Industrial and Systems Engineering marks
                its 52th anniversary, I am delighted to present to you Optima 2025,
                the techno-optimization fest of IIT Kharagpur, meticulously
                organised by our department. Optima offers a distinctive
                platform for students to delve into this domain and experience
                world-class research, while providing brands with an opportunity
                to engage with one of the most astute and diverse audiences
                accross various domains. I extend a heartfelt invitation to all
                of you to become integral participants in the journey of IIT
                Kharagpur and the Department of Industrial and Systems
                Engineering."
              </p>
              {/* <div className="flex gap-5">
                <a
                  className="text-3xl hover:text-purple-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl hover:shadow-white "
                  href="mailto:jhareswar.maiti@gmail.com"
                  target="_blank"
                >
                  <FaEnvelope />
                </a>
                <a
                  className="text-3xl hover:text-purple-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl hover:shadow-white"
                  href="https://www.linkedin.com/in/jhareswar-maiti-9a269973/?originalSubdomain=in"
                  target="_blank"
                >
                  <FaLinkedin />
                </a>
              </div> */}
            </div>
            {/* another div containing two smaller divs */}
            <div className="flex flex-col gap-5 justify-between items-center">
              {/* first smaller div */}
              <div className="h-1/2 w-full border border-n-1/10 flex flex-col items-center justify-evenly rounded-3xl gap-3 p-3 transition-all duration-300 hover:shadow-md hover:shadow-purple-500">
                <h1 className="text-2xl lg:text-3xl font-semibold">Chairman</h1>
                <img
                  src={chair}
                  alt="hod"
                  className="rounded-3xl w-40 lg:w-48"
                />
                <h1 className="">Prof. Goutam Sen</h1>
                <div className="flex gap-5">
                  <a
                    className="text-3xl hover:text-purple-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl hover:shadow-white"
                    href="mailto:gsen@iem.iitkgp.ac.in"
                    target="_blank"
                  >
                    <FaEnvelope />
                  </a>
                  <a
                    className="text-3xl hover:text-purple-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl hover:shadow-white"
                    href="https://www.linkedin.com/in/goutam-a-sen-71512712b/"
                    target="_blank"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
              {/* second smaller div */}
              <div className="h-1/2 w-full border border-n-1/10 flex flex-col items-center justify-evenly rounded-3xl gap-3 p-3 transition-all duration-300 hover:shadow-md hover:shadow-purple-500">
                <h1 className="text-2xl lg:text-3xl font-semibold">
                  Co-Chairman
                </h1>
                <img
                  src={cochair}
                  alt="hod"
                  className="rounded-3xl w-40 lg:w-48"
                />
                <h1>Prof. Abhishek Sharma</h1>
                <div className="gap-5 flex">
                  <a
                    className="text-3xl hover:text-purple-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl hover:shadow-white"
                    href="mailto:abhishek@iem.iitkgp.ac.in"
                    target="_blank"
                  >
                    <FaEnvelope />
                  </a>
                  <a
                    className="text-3xl hover:text-purple-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl hover:shadow-white"
                    href="https://www.linkedin.com/in/abhishek-sharma-44797884/?originalSubdomain=in"
                    target="_blank"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Gradient/>
        </div>
      </div>
    </Section>
  );
};

export default HodMessage;