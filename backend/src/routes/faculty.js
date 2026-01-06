const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  createFaculty,
  getAllFaculty,
  updateFaculty,
  deleteFaculty,
} = require("../controllers/faculty.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("photo"), createFaculty);
router.get("/", getAllFaculty);
router.put("/:id", upload.single("photo"), updateFaculty);
router.delete("/:id", deleteFaculty);

module.exports = router;
