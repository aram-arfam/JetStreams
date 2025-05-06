import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const benefitsData = [
  {
    title: "PROFESSIONAL COMMITMENT & RESPONSIBILITY",
    text: "We are a team of expertly trained and seasoned aviation professionals which you can rely on our expertise in a given situation, 24/7 globally. Being one of the major player in the global aviation industry, we are passionate about helping and serving our customers. You can always rely on us to be there when you need us.",
    icon: (
      <img
        src={assets.armchair_benefits}
        alt="Armchair Icon"
        className="w-12 h-12"
      />
    ),
  },
  {
    title: "EXPERIENCE WITH THE EXPERIENCED",
    text: "It's no secret that the aviation industry is a difficult one to operate in, but we make a team of experienced professionals and with decades of experience, we have a large network in place, .and assure you hassle-free service and provide instant solutions to any uninvited discomfort",
    icon: (
      <img
        src={assets.shield_benefits}
        alt="Shield Icon"
        className="w-12 h-12"
      />
    ),
  },
  {
    title: "AROUND THE WORLD",
    text: "Jetstream International goes the extra mile to make sure that your experience is easy and hassle-free. We have contacts and partners across the world to ensure that you are able to operate at the required level of efficiency. Contact us now with any questions or queries.",
    icon: (
      <img
        src={assets.travelling_benefits}
        alt="Plane Icon"
        className="w-12 h-12"
      />
    ),
  },
  {
    title: "CRYSTAL CLEAR BILLING SERVICE",
    text: "Jetstream International is the most affordable and transparent invoicing and pricing that you can find. With JSID, there are never any hidden fees or surprises. You know exactly what you're going to be paying up front.",
    icon: (
      <img src={assets.map_benefits} alt="Map Icon" className="w-12 h-12" />
    ),
  },
];

const Benefits = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center px-6 py-10 bg-gray-200">
      {/* Centered Heading & Subtitle */}
      <div className="text-center max-w-5xl px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-black">
          JETSTREAM INTERNATIONAL BENEFITS
        </h1>
        <h2 className="text-lg md:text-xl text-gray-700 mt-3">
          Jetstream International is your one-stop solution for all travel
          needs. We offer premium international trip support and charter
          services, partnering with expert vendors to ensure top-quality
          services worldwide.
        </h2>
      </div>

      {/* Cards + Image Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mt-10 w-full max-w-7xl">
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-2/3">
          {benefitsData.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg flex flex-col items-center text-center h-auto w-full"
            >
              {benefit.icon}
              <h3 className="text-lg md:text-xl font-semibold mt-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 mt-3">{benefit.text}</p>
            </div>
          ))}
        </div>

        {/* Image Section (on large screens it sits beside cards, on small screens it moves below) */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <img
            src={assets.img_benefit}
            alt="Benefits"
            className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto object-contain"
          />
        </div>
      </div>

      {/* Button Section */}
      <div className="mt-8">
        <Link to="/charters">
          <button className="px-8 md:px-12 py-3 md:py-4 bg-yellow-400 text-black text-lg md:text-xl font-medium rounded-full hover:bg-yellow-500 transition duration-300">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Benefits;
