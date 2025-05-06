import SuggestionModel from "../Models/suggModel.js";
import Suggestion from "../Models/suggModel.js";
import mongoose from "mongoose";

export const createSuggestion = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const newSuggestion = new SuggestionModel({ name, email, message });
    await newSuggestion.save();
    return res.json({ success: true, message: "Suggestion Saved" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const getSuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ date: -1 }); // Use "Suggestion"
    res.json(suggestions);
  } catch (error) {
    res.json({ message: "Error fetching suggestions", error: error.message });
  }
};
export const delSuggestions = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSuggestion = await SuggestionModel.findByIdAndDelete(id);

    if (!deletedSuggestion) {
      console.error("Suggestion not found:", id);
      return res.status(404).json({ error: "Suggestion not found" });
    }

    console.log("Successfully deleted:", deletedSuggestion);
    res.status(200).json({ message: "Suggestion deleted successfully" });
  } catch (error) {
    console.error("Error deleting suggestion:", error);
    res
      .status(500)
      .json({ error: "Error deleting suggestion", details: error.message });
  }
};

// console.log("Attempting to delete suggestion with ID:", id);
// if (!mongoose.Types.ObjectId.isValid(id)) {
//   console.error("❌ Invalid ObjectId:", id);
//   return res.status(400).json({ error: "Invalid suggestion ID" });
// }

// Convert string to ObjectId
// const objectId = new mongoose.Types.ObjectId(id);

// Attempt deletion
