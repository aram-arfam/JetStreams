import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { assets } from "../assets/assets"; // Update this path as needed

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-12">
      {/* Full-Width Logo with Fixed Height */}
      <div className="flex justify-center">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-full h-[175px] object-contain"
        />
      </div>

      {/* Footer Text */}
      <p className="mt-6 text-gray-300 max-w-3xl mx-auto px-6 text-lg leading-relaxed">
        Re-defining global aviation standards with attention to detail while
        tackling the biggest industry challenges.
      </p>

      {/* Social Media Icons - Enlarged to text-4xl & reordered */}
      <div className="flex justify-center gap-10 mt-6 text-4xl">
        <a
          href="https://www.linkedin.com/company/jetstream-international-fzco/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="hover:text-yellow-500 transition" />
        </a>
        <a
          href="https://www.instagram.com/jetstream.international/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="hover:text-yellow-500 transition" />
        </a>
        <a
          href="https://twitter.com/jetstreamfz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="hover:text-yellow-500 transition" />
        </a>
      </div>

      {/* Copyright Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-gray-400 text-sm">
        © 2025 All rights reserved Jetstream International
      </div>
    </footer>
  );
};

export default Footer;
