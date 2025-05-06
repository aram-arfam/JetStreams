import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaTrash, FaEnvelope, FaUser, FaCommentDots, FaCalendarAlt, FaCheck, FaExclamationTriangle } from 'react-icons/fa'; 
import { CgSpinner } from 'react-icons/cg'; 
import { JetContext } from '../context/AppContext'; 

function Suggestions() { 
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backendUrl } = useContext(JetContext);


  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    if (!backendUrl) {
      setError("Backend URL not configured.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${backendUrl}/api/suggestions`, {
        withCredentials: true,
      });
     
      const formattedSuggestions = (response.data || []).map(s => ({ ...s, read: s.read || false }));
      setSuggestions(formattedSuggestions);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch suggestions.");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [backendUrl]);

  const markAsRead = (index) => {
    setSuggestions((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, read: !item.read } : item
      )
    );
    console.warn("Mark as read is currently frontend only.");
  };

  const deleteSuggestion = async (id) => {
     if (!id || !window.confirm("Are you sure you want to delete this suggestion?")) {
      return;
    }
    try {
      await axios.delete(`${backendUrl}/api/suggestions/${id}`, {
         withCredentials: true,
      });
      setSuggestions((prev) => prev.filter((suggestion) => suggestion._id !== id));
    } catch (error) {
      console.error("Error deleting suggestion:", error.response?.data || error);
      setError(error.response?.data?.message || error.message || "Failed to delete suggestion.");
    }
  };

  // --- Helper to format date ---
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
     try {
       return new Date(dateString).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
     } catch(e) { return 'Invalid Date'; }
  };

   // --- Animation Variants ---
   const containerVariants = {
       hidden: { opacity: 0 },
       visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
   };
   const itemVariants = {
       hidden: { opacity: 0, y: 10 },
       visible: { opacity: 1, y: 0 }
   };

  return (
    // Consistent container styling
    <div className="min-h-screen text-gray-800 antialiased pt-28 pb-16">
      <div className="container mx-auto px-4">
        <motion.h1
            className="text-3xl md:text-4xl font-bold text-white mb-8 text-center" // Adjusted color
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          User Suggestions
        </motion.h1>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <CgSpinner className="animate-spin text-blue-600 text-4xl" />
            <span className="ml-3 text-lg text-gray-600">Loading Suggestions...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mb-6 flex items-center justify-center gap-2"
            role="alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FaExclamationTriangle/>
            <span className="block sm:inline">Error: {error}</span>
          </motion.div>
        )}

        {/* Suggestions Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            {suggestions.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No suggestions available.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {/* Added consistent styling and icons */}
                    <th scope="col" className="w-12 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"><FaCheck/></th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"><FaUser className="inline mr-1 mb-0.5"/> Name</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"><FaEnvelope className="inline mr-1 mb-0.5"/> Email</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"><FaCommentDots className="inline mr-1 mb-0.5"/> Suggestion</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"><FaCalendarAlt className="inline mr-1 mb-0.5"/> Date</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <motion.tbody
                    className="bg-white divide-y divide-gray-200"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                  {suggestions.map((suggestion, index) => (
                    <motion.tr
                      key={suggestion._id}
                      variants={itemVariants}
                      // Refined 'read' styling - slightly muted text/background
                      className={`transition-colors duration-300 ${
                        suggestion.read ? "bg-gray-50 text-gray-400" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-4 text-center">
                        <input
                          type="checkbox"
                          onChange={() => markAsRead(index)}
                          checked={suggestion.read}
                          title={suggestion.read ? "Mark as unread" : "Mark as read"}
                          // Basic checkbox styling
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        />
                      </td>
                      <td className={`px-4 py-4 whitespace-nowrap text-sm font-medium ${suggestion.read ? 'text-gray-500' : 'text-gray-900'}`}>{suggestion.name}</td>
                      <td className={`px-4 py-4 whitespace-nowrap text-sm hidden md:table-cell ${suggestion.read ? 'text-gray-400' : 'text-gray-500'}`}>{suggestion.email}</td>
                      {/* Allow message to wrap, but constrain width */}
                      <td className={`px-4 py-4 text-sm max-w-md ${suggestion.read ? 'text-gray-500' : 'text-gray-600'}`}>{suggestion.message}</td>
                      <td className={`px-4 py-4 whitespace-nowrap text-sm hidden sm:table-cell ${suggestion.read ? 'text-gray-400' : 'text-gray-500'}`}>{formatDate(suggestion.date)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => deleteSuggestion(suggestion._id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none p-1 rounded-full hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label={`Delete suggestion from ${suggestion.name}`}
                          title="Delete Suggestion"
                          disabled={suggestion.read} // Optional: Disable delete for read items? Or remove this.
                        >
                          <FaTrash className="w-4 h-4"/>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Suggestions;