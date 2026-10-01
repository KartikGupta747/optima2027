import { CheckCircle2 } from "lucide-react";
import { checklistItems } from "../constants";

const Workflow = () => {
  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
          Responsibilities
        </span>
      </h2>
      <div className="flex flex-wrap justify-center">
        <div className="p-4 flex items-center justify-center w-2/3 lg:w-1/3">
          <img src={'/respond.png'} alt="Coding" />
        </div>
        <div className="md:pt-10 w-full lg:w-2/3">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex mb-12">
              <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md text-neutral-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
