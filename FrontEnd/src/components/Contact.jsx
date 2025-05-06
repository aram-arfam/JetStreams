import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16 bg-gray-100">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-yellow-500">Contact Us</h1>
      <div className="w-full">
        <h2 className="text-lg text-gray-800 mt-2 text-center">
          Get in touch with us and let us know what you need. We're here 24/7
          and ready to serve.
        </h2>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-4xl w-full">
        {/* Phone Section */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
          <FaPhoneAlt className="text-yellow-500 text-4xl mb-2" />
          <h3 className="text-xl font-semibold">Phone</h3>
          <a
            href="tel:+971556177253"
            className="text-gray-700 hover:text-yellow-500"
          >
            Work: +971 556177253
          </a>
          <a
            href="tel:+919163839544"
            className="text-gray-700 hover:text-yellow-500"
          >
            Mobile: +91 9163839544
          </a>
          <a
            href="tel:+916283454898"
            className="text-gray-700 hover:text-yellow-500"
          >
            Mobile: +91 6283454898
          </a>
        </div>

        {/* Email Section */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
          <FaEnvelope className="text-yellow-500 text-4xl mb-2" />
          <h3 className="text-xl font-semibold">Email</h3>
          <a
            href="mailto:sops@jsid.aero"
            className="text-gray-700 hover:text-yellow-500"
          >
            sops@jsid.aero
          </a>
          <a
            href="mailto:ops.india@jsid.aero"
            className="text-gray-700 hover:text-yellow-500"
          >
            ops.india@jsid.aero
          </a>
          <a
            href="mailto:sales@jsid.aero"
            className="text-gray-700 hover:text-yellow-500"
          >
            sales@jsid.aero
          </a>
          <a
            href="mailto:sales.india@jsid.aero"
            className="text-gray-700 hover:text-yellow-500"
          >
            sales.india@jsid.aero
          </a>
        </div>

        {/* Address Section */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
          <FaMapMarkerAlt className="text-yellow-500 text-4xl mb-2" />
          <h3 className="text-xl font-semibold">Address</h3>
          <p className="text-gray-700">
            Premises # 22912, DDP Building A2, Dubai Silicon Oasis Dubai, United
            Arab Emirates
          </p>
          <p className="text-gray-700">India - MOHALI | NEW DELHI</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
