import MessageModel from "../Models/msgModel.js";
import Message from "../Models/msgModel.js";
import mongoose from "mongoose";

export const createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const newMessage = new MessageModel({ name, email, subject, message });
    await newMessage.save();
    return res.json({ success: true, message: "Message Sent" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    res.json({ message: "Error fetching messages", error: error.message });
  }
};
export const delMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await MessageModel.findByIdAndDelete(id);

    if (!deletedMessage) {
      console.error("Message not found:", id);
      return res.status(404).json({ error: "Message not found" });
    }

    console.log("Successfully deleted:", deletedMessage);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res
      .status(500)
      .json({ error: "Error deleting message", details: error.message });
  }
};


