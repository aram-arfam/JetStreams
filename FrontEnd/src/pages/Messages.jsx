import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaTrash, FaEnvelope, FaUser, FaFileAlt, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa'; // Icons
import { CgSpinner } from 'react-icons/cg'; // Loading spinner
import { JetContext } from '../context/AppContext'; // Adjust path if needed

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backendUrl } = useContext(JetContext);

  // Fetch messages from the backend
  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    if (!backendUrl) {
        setError("Backend URL not configured.");
        setLoading(false);
        return;
    }
    try {
      const response = await axios.get(`${backendUrl}/api/messages`, {
        withCredentials: true,
      });
      setMessages(response.data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch messages.");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages on component mount and when backendUrl changes
  useEffect(() => {
    fetchMessages();
  }, [backendUrl]);

  // Handle deleting a message
  const handleDelete = async (id) => {
    if (!id) return;

    // Confirmation dialog
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      await axios.delete(`${backendUrl}/api/messages/${id}`, {
        withCredentials: true,
      });
      fetchMessages();
    } catch (err) {
      console.error("Error deleting message:", err);
      setError(err.response?.data?.message || err.message || "Failed to delete message.");
    }
  };

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
       return new Date(dateString).toLocaleString(undefined, {
         dateStyle: 'medium',
         timeStyle: 'short',
       });
    } catch (e) {
        return 'Invalid Date';
    }
  };

   // Animation Variants
   const containerVariants = {
       hidden: { opacity: 0 },
       visible: { opacity: 1, transition: { staggerChildren: 0.05 } } // Stagger rows
   };
   const itemVariants = {
       hidden: { opacity: 0, y: 10 },
       visible: { opacity: 1, y: 0 }
   };


  return (
    // Using a container similar to other pages for consistency
    <div className=" min-h-screen text-gray-800 antialiased pt-28 pb-16"> 
      <div className="container mx-auto px-4">
        <motion.h1
            className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          Contact Messages Dashboard
        </motion.h1>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <CgSpinner className="animate-spin text-blue-600 text-4xl" />
            <span className="ml-3 text-lg text-gray-600">Loading Messages...</span>
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

        {/* Messages Table/List */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No messages found.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"><FaCalendarAlt className="inline mr-1 mb-0.5"/> Date</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"><FaUser className="inline mr-1 mb-0.5"/> Name</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"><FaEnvelope className="inline mr-1 mb-0.5"/> Email</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"><FaFileAlt className="inline mr-1 mb-0.5"/> Subject</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <motion.tbody
                    className="bg-white divide-y divide-gray-200"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                  {messages.map((msg) => (
                    <motion.tr key={msg._id} variants={itemVariants} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{formatDate(msg.date)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{msg.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{msg.email}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{msg.subject || '-'}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 max-w-sm truncate">{msg.message}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => handleDelete(msg._id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none p-1 rounded-full hover:bg-red-100"
                          aria-label={`Delete message from ${msg.name}`}
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

export default Messages;