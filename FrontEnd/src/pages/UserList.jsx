import React, { useEffect, useState, useContext } from "react"; // Added React import
import axios from "axios";
import { motion } from "framer-motion"; // Import motion
import { JetContext } from "../context/AppContext"; // Adjust path if needed
import { FaUserCircle, FaExclamationTriangle } from 'react-icons/fa'; // Icons
import { CgSpinner } from 'react-icons/cg'; // Loading spinner

// Renamed component to PascalCase convention
function UserList() {
  const { backendUrl } = useContext(JetContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error
      if (!backendUrl) {
          setError("Backend URL not configured.");
          setLoading(false);
          return;
      }
      try {
        const response = await axios.get(`${backendUrl}/api/userlist`, {
          withCredentials: true,
        });
        // Ensure response.data.users is an array, default to empty array if not
        setUsers(Array.isArray(response.data?.users) ? response.data.users : []);
      } catch (err) { // Changed error variable name
        console.error("Error fetching users:", err);
        // Set a user-friendly error message
        setError(err.response?.data?.message || err.message || "Failed to fetch user data.");
        setUsers([]); // Clear users on error
      } finally {
        setLoading(false); // Stop loading regardless of success/error
      }
    };

    fetchUsers();
  }, [backendUrl]); // Dependency array

  // Animation Variants for staggering cards
  const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
          opacity: 1,
          transition: {
              staggerChildren: 0.08 // Controls delay between each card animating in
          }
      }
  };

  const itemVariants = {
      hidden: { opacity: 0, y: 20, scale: 0.98 }, // Start slightly below and smaller
      visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
              duration: 0.4,
              ease: "easeOut"
          }
      }
  };

  return (
    // Consistent page layout (light theme like other dashboards)
    <div className=" min-h-screen text-gray-800 antialiased pt-28 pb-16"> {/* Added padding top/bottom */}
      <div className="container mx-auto px-4">
        <motion.h1
            className="text-3xl md:text-4xl font-bold text-white mb-8 text-center" // Adjusted heading color
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          User List
        </motion.h1>

        {/* Loading State Display */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <CgSpinner className="animate-spin text-blue-600 text-4xl" />
            <span className="ml-3 text-lg text-gray-600">Loading Users...</span>
          </div>
        )}

        {/* Error State Display */}
        {error && !loading && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mb-6 flex items-center justify-center gap-2 max-w-2xl mx-auto" // Centered error msg
            role="alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FaExclamationTriangle/>
            <span className="block sm:inline">Error: {error}</span>
          </motion.div>
        )}

        {/* User Grid Display */}
        {!loading && !error && (
          <>
            {users.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No users found.</p>
            ) : (
              <motion.div
                // Responsive grid layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {users.map((user) => (
                  // Individual user card with animation
                  <motion.div
                    key={user._id}
                    variants={itemVariants}
                    // Enhanced Card Styling (light theme)
                    className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex items-center space-x-4 overflow-hidden" // Added overflow-hidden
                  >
                    {/* Avatar or Default Icon */}
                    {user.avatar ? (
                       <img
                        src={user.avatar}
                        alt={user.name || 'User avatar'} // Added fallback alt text
                        // Refined avatar styling
                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-200 flex-shrink-0"
                      />
                    ) : (
                       <FaUserCircle className="w-14 h-14 text-gray-400 flex-shrink-0" /> // Default icon
                    )}

                    {/* User Info Text Block */}
                    <div className="flex-1 min-w-0"> {/* Allow shrinking and prevent overflow */}
                       <h2
                         className="text-base font-semibold text-gray-800 truncate" // Truncate long names
                         title={user.name} // Show full name on hover
                       >
                         {user.name || 'Unnamed User'} {/* Handle missing name */}
                       </h2>
                       <p
                         className="text-gray-500 text-sm truncate" // Truncate long emails
                         title={user.email} // Show full email on hover
                       >
                         {user.email}
                       </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserList; // Use PascalCase for export