const express = require("express");
const router = express.Router();

const {
  addStudent,
  getStudents,
  searchStudents,
  deleteStudent,
  updateStudent
} = require("../controllers/student.controller");

router.post("/", addStudent);       
router.get("/", getStudents);       
router.get("/search", searchStudents); 
router.delete("/:id", deleteStudent);
router.put("/:id", updateStudent);
module.exports = router;
