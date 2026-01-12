const Notice = require("../models/Notice");

// 1. Get All Notices
const getNotices = async (req, res) => {
  try {
    // Sort by createdAt descending (newest first)
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 2. Add New Notice
const addNotice = async (req, res) => {
  try {
    const { title, description, type, link } = req.body;

    if (!title || !description || !type) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const newNotice = new Notice({
      title,
      description,
      type,
      link,
    });

    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 3. Update Notice
const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNotice = await Notice.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
    });

    if (!updatedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.status(200).json(updatedNotice);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 4. Delete Notice
const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    await Notice.findByIdAndDelete(id);
    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getNotices,
  addNotice,
  updateNotice,
  deleteNotice,
};
