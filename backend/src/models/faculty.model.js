const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const facultySchema = new mongoose.Schema(
  {
    employeeId: {
      type: Number,
      required: true,
      unique: true,
    },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: { type: String, required: true },

    profile: { type: String },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    dob: { type: Date, required: true },

    bloodGroup: { type: String },

    designation: { type: String, required: true },

    joiningDate: { type: Date, required: true },

    salary: { type: Number, required: true },

    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },

    branch: { type: String, required: true },

    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },

    password: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

facultySchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("Faculty", facultySchema);
