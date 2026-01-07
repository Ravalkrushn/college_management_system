const express = require("express");
const router = express.Router();
const {
  createBranch,
  getAllBranches,
  deleteBranch,
} = require("../controllers/branch.controller");

router.post("/", createBranch);
router.get("/", getAllBranches);
router.delete("/:id", deleteBranch);

module.exports = router;
