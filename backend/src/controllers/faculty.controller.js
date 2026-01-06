const Faculty = require("../models/faculty.model");

/* ================= CREATE FACULTY ================= */
exports.createFaculty = async (req, res) => {
  try {
    console.log("======= FACULTY CREATE =======");
    console.log("BODY 👉", req.body);
    console.log("FILE 👉", req.file);

    /* 🔐 HARD VALIDATION (NO BLIND 500) */
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "gender",
      "dob",
      "designation",
      "joiningDate",
      "salary",
      "address",
      "city",
      "state",
      "pinCode",
      "branch",
    ];

    for (const field of requiredFields) {
      if (!req.body[field] || req.body[field].toString().trim() === "") {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    /* 🔢 AUTO EMPLOYEE ID */
    const lastFaculty = await Faculty.findOne().sort({ employeeId: -1 });
    const employeeId = lastFaculty ? lastFaculty.employeeId + 1 : 1001;

    /* 📸 PROFILE IMAGE */
    const profile = req.file ? `/uploads/${req.file.filename}` : "";

    /* 💾 CREATE FACULTY */
    const faculty = new Faculty({
      employeeId,
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim(),
      phone: req.body.phone.trim(),
      gender: req.body.gender.toLowerCase(),
      dob: req.body.dob,
      bloodGroup: req.body.bloodGroup,
      designation: req.body.designation.trim(),
      joiningDate: req.body.joiningDate,
      salary: Number(req.body.salary),
      address: req.body.address.trim(),
      city: req.body.city.trim(),
      state: req.body.state.trim(),
      pinCode: req.body.pinCode.trim(),
      branch: req.body.branch.trim(),
      profile,
      emergencyContact: {
        name: req.body.emergencyName,
        relationship: req.body.emergencyRelation,
        phone: req.body.emergencyPhone,
      },
      password: "faculty@123",
    });

    await faculty.save();

    res.status(201).json({
      success: true,
      message: "Faculty added successfully",
    });
  } catch (err) {
    console.error("FACULTY CREATE ERROR 👉", err);

    /* ✅ MONGOOSE VALIDATION ERROR */
    if (err.name === "ValidationError") {
      const firstError = Object.values(err.errors)[0]?.message;
      return res.status(400).json({
        success: false,
        message: firstError || "Validation failed",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* ================= GET ALL FACULTY ================= */
exports.getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({ createdAt: -1 });
    res.json(faculty);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= UPDATE FACULTY ================= */
exports.updateFaculty = async (req, res) => {
  try {
    const updateData = {
      firstName: req.body.firstName?.trim(),
      lastName: req.body.lastName?.trim(),
      email: req.body.email?.trim(),
      phone: req.body.phone?.trim(),
      gender: req.body.gender?.toLowerCase(),
      dob: req.body.dob,
      bloodGroup: req.body.bloodGroup,
      designation: req.body.designation?.trim(),
      joiningDate: req.body.joiningDate,
      salary: Number(req.body.salary),
      address: req.body.address?.trim(),
      city: req.body.city?.trim(),
      state: req.body.state?.trim(),
      pinCode: req.body.pinCode?.trim(),
      branch: req.body.branch?.trim(),
      emergencyContact: {
        name: req.body.emergencyName,
        relationship: req.body.emergencyRelation,
        phone: req.body.emergencyPhone,
      },
    };

    if (req.file) {
      updateData.profile = `/uploads/${req.file.filename}`;
    }

    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      data: faculty,
    });
  } catch (err) {
    console.error("FACULTY UPDATE ERROR 👉", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= DELETE FACULTY ================= */
exports.deleteFaculty = async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Faculty deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
