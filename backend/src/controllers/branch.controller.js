const Branch = require("../models/branch.model");

// @desc    Create a new branch
// @route   POST /api/branches
// @access  Public
exports.createBranch = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Branch name is required" });
    }

    const lastBranch = await Branch.findOne().sort({ branchId: -1 });
    let newBranchId = "1";
    if (lastBranch && !isNaN(parseInt(lastBranch.branchId))) {
      newBranchId = (parseInt(lastBranch.branchId) + 1).toString();
    }

    const branch = new Branch({
      branchId: newBranchId,
      name,
    });

    await branch.save();
    res.status(201).json(branch);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Branch name must be unique" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all branches
// @route   GET /api/branches
// @access  Public
exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find().sort({ createdAt: -1 });
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a branch
// @route   DELETE /api/branches/:id
// @access  Public
exports.deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);

    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    res.json({ message: "Branch removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
