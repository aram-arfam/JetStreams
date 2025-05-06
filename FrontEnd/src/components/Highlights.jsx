import { assets } from "../assets/assets";

const Highlights = () => {
  return (
    <div className="w-full flex items-center justify-center px-6 py-16 bg-gray-100">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8">
        {/* Image on the Left */}
        <div className="w-full lg:w-2/5 flex justify-center">
          <img
            src={assets.highlights}
            alt="highlights"
            className="w-full max-w-lg object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Text Section on the Right */}
        <div className="w-full lg:w-3/5">
          {/* Heading */}
          <h2 className="text-5xl font-bold text-left mb-4">
            <span className="text-black">JSI </span>
            <span className="text-yellow-500">Highlights</span>
          </h2>

          {/* Subtext */}
          <p className="text-lg text-gray-600 mb-6">
            Experience world-class aviation services with unmatched expertise.
          </p>

          {/* Bullet List */}
          <ul className="list-disc list-outside text-gray-700 text-xl space-y-3 pl-5">
            <li>Ground handling for Government & Head of State flight.</li>
            <li>
              Provide group charters for sports teams, athletes, sponsors, and
              fans alike.
            </li>
            <li>Special charters for Hajj and Umrah to the holy land.</li>
            <li>Scenic and tourism charters including seaplane.</li>
            <li>Diplomatic charters and special military flights.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
