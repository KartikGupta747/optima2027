import { features } from "../constants";

const FeatureSection = () => {
  return (
    <div id="overview" className="relative pt-4 mt-10 border-b border-neutral-800">
      {/* Header */}
      <div className="text-center">
        <span className="invisible">- Overview -</span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          What we{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            Offer?
          </span>
        </h2>
      </div>

      {/* Features */}
      <div className="flex flex-wrap mt-10 lg:mt-20 justify-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 flex justify-center"
          >
            <div className="flex max-w-sm">
              <div className="flex ml-6 mr-3 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                {feature.icon}
              </div>
              <div>
                <h5 className="mt-1 mb-3 text-xl">{feature.text}</h5>
                <p className="text-md pr-2 mb-20 text-neutral-500">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;

