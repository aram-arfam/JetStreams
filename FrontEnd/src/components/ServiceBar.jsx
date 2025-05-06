import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const services = [
  {
    title: "Permits and Navigation",
    imgSrc: assets.permits_navigation_servicebar,
    alt: "permits and navigation",
    link: "/permits-navigation",
  },
  {
    title: "Flight Planning & Dispatch",
    imgSrc: assets.flight_planning_servicebar,
    alt: "Flights Planning & Dispatch",
    link: "/flights-planning",
  },
  {
    title: "Ground Handling & Airport Supervision",
    imgSrc: assets.ground_handling_servicebar,
    alt: "ground-handling",
    link: "/ground-handling",
  },
];

const Services = () => {
  return (
    <section className="bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center bg-transparent shadow-lg rounded-xl p-6 w-full"
            >
              {/* Service Image */}
              <Link
                to={service.link}
                className="w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 bg-gray-200 rounded-full overflow-hidden"
              >
                <img
                  src={service.imgSrc}
                  alt={service.alt}
                  className="w-full h-full object-cover"
                />
              </Link>

              {/* Service Title */}
              <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-yellow-500 leading-tight">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
