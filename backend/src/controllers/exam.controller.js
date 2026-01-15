const Exam = require("../models/exam.model");

/* ================= GET ALL EXAMS ================= */
const getAllExamsController = async (req, res) => {
  try {
    const { examType = "", semester = "" } = req.query;

    const query = {};
    if (semester) query.semester = Number(semester);
    if (examType) query.examType = examType;

    const exams = await Exam.find(query).sort({ date: -1 });

    if (!exams || exams.length === 0) {
      return res.status(200).json([]); // Return empty array instead of 404 for better frontend handling
    }

    return res.status(200).json(exams);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================= ADD EXAM ================= */
const addExamController = async (req, res) => {
  try {
    const formData = { ...req.body };

    if (req.file) {
      formData.timetableLink = req.file.filename;
    }

    const exam = await Exam.create(formData);
    return res.status(201).json(exam);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE EXAM ================= */
const updateExamController = async (req, res) => {
  try {
    const formData = { ...req.body };

    if (req.file) {
      formData.timetableLink = req.file.filename;
    }

    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      formData,
      { new: true }
    );

    if (!exam) {
      return res.status(404).json({ message: "Exam Not Found" });
    }

    return res.status(200).json(exam);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE EXAM ================= */
const deleteExamController = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);

    if (!exam) {
      return res.status(404).json({ message: "Exam Not Found" });
    }

    return res.status(200).json({ message: "Exam Deleted Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllExamsController,
  addExamController,
  updateExamController,
  deleteExamController,
};
