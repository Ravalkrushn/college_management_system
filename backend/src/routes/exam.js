const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getAllExamsController,
  addExamController,
  updateExamController,
  deleteExamController,
} = require("../controllers/exam.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ================= EXAM ROUTES ================= */

// Get all exams
router.get("/", getAllExamsController);

// Add new exam
router.post("/", upload.single("file"), addExamController);

// Update exam
router.put("/:id", upload.single("file"), updateExamController);

// Delete exam
router.delete("/:id", deleteExamController);

module.exports = router;
