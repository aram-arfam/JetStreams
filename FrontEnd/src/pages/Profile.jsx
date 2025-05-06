import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { JetContext } from "../context/AppContext";
import { FaUserCircle, FaEnvelope, FaPhoneAlt, FaRegEdit, FaSave, FaTimes, FaSignOutAlt, FaCamera, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhone, setEditedPhone] = useState("");
  const [editedBio, setEditedBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const { backendUrl } = useContext(JetContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (!backendUrl) {
        setError("Backend URL not configured.");
        setLoading(false);
        return;
    }
    axios
      .get(`${backendUrl}/api/profile`, { withCredentials: true })
      .then((response) => {
        if (response.data.success && response.data.userData) {
          setUserData(response.data.userData);
          setEditedPhone(response.data.userData.phone || "");
          setEditedBio(response.data.userData.bio || "");
        } else {
          setError("Failed to fetch profile data.");
          toast.error("Failed to fetch profile data");
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err.response?.data || err.message);
        setError(err.response?.data?.message || err.message || "Error fetching profile.");
        if (err.response?.status === 401 || err.response?.status === 403) {
            toast.info("Please log in to view your profile.");
            navigate("/login");
        } else {
             toast.error("Error fetching profile");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [backendUrl, navigate]);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedPhone(userData?.phone || "");
      setEditedBio(userData?.bio || "");
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const updatedData = { phone: editedPhone.trim(), bio: editedBio.trim() };
      const response = await axios.put(`${backendUrl}/api/profile`, updatedData, {
        withCredentials: true,
      });

      if (response.data.success) {
        setUserData((prev) => ({ ...prev, ...response.data.userData }));
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
         setError(response.data.message || "Failed to update profile.");
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
      const errorMsg = err.response?.data?.message || err.message || "Error updating profile";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/logout`, {}, { withCredentials: true });
      toast.success("Logged out successfully!");
      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to logout");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen  flex justify-center items-center p-6">
        <CgSpinner className="animate-spin text-blue-600 text-5xl" />
      </div>
    );
  }

  if (error && !userData) {
     return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6 text-center">
         <FaExclamationTriangle className="text-red-500 text-5xl mb-4"/>
         <p className="text-red-600 font-medium mb-4">Could not load profile.</p>
         <p className="text-gray-600 text-sm mb-6">{error}</p>
         <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 px-6 py-2 rounded-lg shadow-md text-white font-bold hover:bg-blue-700 transition duration-200"
         >
            Go to Login
         </button>
      </div>
     );
  }

   if (!userData) return null;

  return (
    <div className="min-h-screen  flex justify-center items-center p-4 md:p-6 pt-28 pb-16">
      <motion.div // <<<--- This is the opening tag
        className="bg-white p-6 md:p-10 rounded-xl shadow-xl border border-gray-200 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* --- Top Section: Avatar, Name, Edit Button --- */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-8 pb-6 border-b border-gray-200 gap-6">
           {/* ... Avatar/Name/Email Div ... */}
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5">
                <div className="relative group flex-shrink-0">
                    {userData.avatar ? ( <img src={userData.avatar} alt="Profile Avatar" className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-md object-cover" /> ) : ( <FaUserCircle className="w-24 h-24 text-gray-400" /> )}
                    <button onClick={() => toast.info("Avatar upload feature coming soon!")} className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" aria-label="Change profile picture" title="Change profile picture (coming soon)" >
                        <FaCamera className="w-4 h-4"/>
                    </button>
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{userData.name}</h2>
                    <p className="text-gray-500 flex items-center gap-1.5 mt-1"> <FaEnvelope className="text-gray-400"/> {userData.email} </p>
                </div>
            </div>
          {/* Edit/Save/Cancel Buttons Div */}
           {!isEditing ? (
                <motion.button onClick={handleEditToggle} className="flex-shrink-0 inline-flex items-center gap-2 bg-blue-600 px-5 py-2 rounded-lg shadow-md text-white font-semibold hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} >
                    <FaRegEdit /> Edit Profile
                </motion.button>
            ) : (
                <div className="flex flex-shrink-0 space-x-3">
                    <motion.button onClick={handleSave} disabled={isSaving} className={`inline-flex items-center gap-2 ${isSaving ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} px-5 py-2 rounded-lg shadow-md text-white font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:cursor-not-allowed`} whileHover={!isSaving ? { scale: 1.03 } : {}} whileTap={!isSaving ? { scale: 0.98 } : {}} >
                        {isSaving ? <CgSpinner className="animate-spin mr-1"/> : <FaSave />} {isSaving ? 'Saving...' : 'Save'}
                    </motion.button>
                    <motion.button onClick={handleEditToggle} disabled={isSaving} className="inline-flex items-center gap-2 bg-gray-500 px-5 py-2 rounded-lg shadow-md text-white font-semibold hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-70" whileHover={!isSaving ? { scale: 1.03 } : {}} whileTap={!isSaving ? { scale: 0.98 } : {}} >
                        <FaTimes /> Cancel
                    </motion.button>
                </div>
            )}
        </div>

        {/* Display Update Error Message */}
        {error && isEditing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 text-sm flex items-center gap-2" role="alert" >
                <FaExclamationTriangle/> <p><span className="font-medium">Update failed:</span> {error}</p>
            </motion.div>
        )}

        {/* --- Profile Details Section --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isEditing ? 'edit' : 'view'} // Key change triggers animation
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
             {/* Phone */}
             <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <label className="flex-shrink-0 w-full sm:w-24 text-sm font-medium text-gray-500 flex items-center gap-1.5 pt-2"><FaPhoneAlt/> Phone</label>
                {isEditing ? ( <input type="tel" value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} className="flex-grow w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Enter phone number" /> ) : ( <p className="flex-grow text-gray-800 pt-2">{userData.phone || <span className="text-gray-400 italic">Not provided</span>}</p> )}
            </div>
             {/* Bio */}
             <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <label className="flex-shrink-0 w-full sm:w-24 text-sm font-medium text-gray-500 flex items-center gap-1.5 pt-2"><FaInfoCircle/> Bio</label>
                {isEditing ? ( <textarea value={editedBio} onChange={(e) => setEditedBio(e.target.value)} className="flex-grow w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" rows="4" placeholder="Tell us a bit about yourself" ></textarea> ) : ( <p className="flex-grow text-gray-800 pt-2 whitespace-pre-line">{userData.bio || <span className="text-gray-400 italic">No bio available</span>}</p> )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* --- Logout Button --- */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
          <motion.button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 bg-red-600 px-5 py-2 rounded-lg shadow-md text-white font-semibold hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
          >
            <FaSignOutAlt /> Logout
          </motion.button>
        </div>

      {/* ===>> CORRECTED: Added Missing Closing Tag <<=== */}
      </motion.div>

    </div>
  );
}

export default Profile;