const Student = require("../models/student.model");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

exports.addStudent = [
  upload.single("image"),
  async (req, res) => {
    try {
      const student = await Student.create({
        enrollmentNo: req.body.enrollmentNo,

        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,

        dob: req.body.dob,
        gender: req.body.gender,

        phone: req.body.phone,
        email: req.body.email,

        semester: req.body.semester,
        branch: req.body.branch,

        address: req.body.address,
        city: req.body.city,
        state: req.body.state,

        emergencyContact: {
          name: req.body.emergencyName,
          relation: req.body.emergencyRelation,
          phone: req.body.emergencyPhone,
        },

        password: req.body.password,

        image: req.file ? `/uploads/${req.file.filename}` : "",
      });

      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];


exports.updateStudent = [
  upload.single("image"),
  async (req, res) => {
    try {
      const updateData = {
        enrollmentNo: req.body.enrollmentNo,

        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,

        dob: req.body.dob,
        gender: req.body.gender,

        phone: req.body.phone,
        email: req.body.email,

        semester: req.body.semester,
        branch: req.body.branch,

        address: req.body.address,
        city: req.body.city,
        state: req.body.state,

        emergencyContact: {
          name: req.body.emergencyName,
          relation: req.body.emergencyRelation,
          phone: req.body.emergencyPhone,
        },
      };

      if (req.body.password) {
        updateData.password = req.body.password;
      }

      if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
      }

      const student = await Student.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.status(200).json(student);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

// ---------------- DELETE STUDENT ----------------
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
};

exports.searchStudents = async (req, res) => {
  try {
    const { enrollmentNo, name, semester, branch } = req.query;

    let filter = {};

    if (enrollmentNo) filter.enrollmentNo = enrollmentNo;

    if (name) {
      filter.$or = [
        { firstName: { $regex: name, $options: "i" } },
        { lastName: { $regex: name, $options: "i" } },
      ];
    }

    if (semester) filter.semester = semester;
    if (branch) filter.branch = branch;

    const students = await Student.find(filter);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};
