import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { JetContext } from "../context/AppContext"; // Adjust path if needed
import { assets } from "../assets/assets"; // Adjust path if needed
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { backendUrl } = useContext(JetContext);

  // --- Dynamic Scroll Effect ---
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('page-hero-section');
      const scrollThreshold = heroSection ? heroSection.offsetHeight : 100;
      setIsScrolled(window.scrollY > scrollThreshold);
    };
    handleScroll(); // Check initial scroll position
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [location.pathname]);

  // --- Authentication Check Effect ---
  useEffect(() => {
    const checkAuth = async () => {
      if (!backendUrl) return;
      try {
        const response = await axios.get(`${backendUrl}/api/profile`, { withCredentials: true });
        if (response.data.success) setUser(response.data);
        else setUser(null);
      } catch (error) {
        if (error.response && error.response.status === 401) setUser(null);
        else setUser(null); // console.error("Auth Check Error:", error);
      }
    };
    checkAuth();
  }, [backendUrl]);

  // --- Event Handlers ---
  const handleIconClick = () => {
    if (user) navigate("/profile");
    else navigate("/login");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // --- Navigation Links Data ---
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Concierge", path: "/concierge" },
    { name: "Charters", path: "/charters" },
    { name: "Career", path: "/career" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  // --- Mobile Menu Variants ---
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -30, transition: { duration: 0.3, ease: "easeOut" } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <div
      className={`montserrat fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled || menuOpen ? "bg-[#0a0f24] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <img src={assets.logo} className="h-10 w-auto" alt="Jetstream Logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-6 lg:space-x-8 text-lg">
            {navLinks.map((link) => (
              <li key={link.name}>
                {/* --- CORRECTED NavLink Structure --- */}
                <NavLink
                  to={link.path}
                  end // Use end prop for exact matching if needed (e.g., for Home)
                  className={({ isActive }) =>
                    // Add 'group' and the conditional 'nav-active' class
                    `relative py-2 text-white hover:text-yellow-400 transition-colors duration-200 group ${
                      isActive ? "text-yellow-500 font-semibold nav-active" : "font-medium"
                    }`
                  }
                >
                  {/* Link Text */}
                  {link.name}
                  {/* Underline Span - Controlled by group state */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 w-0 bg-yellow-500 transition-all duration-300 ease-out group-hover:w-full group-[.nav-active]:w-full`} // Target .nav-active class on group
                  ></span>
                </NavLink>
                {/* --- End of Correction --- */}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Profile Icon */}
        <div className="hidden md:flex items-center ml-6">
          <button onClick={handleIconClick} className="focus:outline-none rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0f24] focus:ring-yellow-500">
            {user?.avatar ? (
              <img src={user.avatar} alt="User Profile" className="w-10 h-10 rounded-full border-2 border-yellow-500 object-cover hover:opacity-90 transition-opacity"/>
            ) : (
              <FaUserCircle className="w-10 h-10 text-gray-400 hover:text-yellow-400 transition-colors border-2 border-gray-500 rounded-full p-0.5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className={`p-2 rounded-md text-white hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 transition-colors duration-200`} onClick={toggleMenu} aria-label={menuOpen ? "Close main menu" : "Open main menu"} aria-expanded={menuOpen} >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu using AnimatePresence */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden absolute top-full left-0 w-full bg-[#0a0f24] shadow-lg rounded-b-lg overflow-hidden"
          >
            <div className="px-5 pt-5 pb-6 space-y-4">
              {navLinks.map((link) => (
                <NavLink key={link.name} to={link.path} className={({ isActive }) => `block text-center rounded-md py-2 px-3 text-base font-medium text-white hover:bg-gray-700/50 hover:text-yellow-400 transition ${ isActive ? "bg-yellow-500/20 text-yellow-400" : "" }`} onClick={closeMenu} >
                  {link.name}
                </NavLink>
              ))}
              <div className="mt-6 pt-5 border-t border-gray-700">
                <div className="flex items-center justify-center space-x-3">
                  <button onClick={handleIconClick} className="focus:outline-none rounded-full">
                    {user?.avatar ? ( <img src={user.avatar} alt="User Profile" className="w-10 h-10 rounded-full border-2 border-yellow-500 object-cover"/> ) : ( <FaUserCircle className="w-10 h-10 text-gray-400 border-2 border-gray-500 rounded-full p-0.5" /> )}
                  </button>
                  {user?.name ? ( <span className="text-base font-medium text-white">{user.name}</span> ) : ( <button onClick={handleIconClick} className="text-base font-medium text-yellow-400 hover:underline">Login / Sign Up</button> )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;