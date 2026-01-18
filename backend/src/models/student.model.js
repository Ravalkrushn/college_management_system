// C:\Users\raval\Desktop\college-management-system\backend\src\models\student.model.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema(
  {
    enrollmentNo: {
      type: String,
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

    semester: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    emergencyContact: {
      name: String,
      relation: String,
      phone: String,
    },

    password: {
      type: String,
      required: true,
    },

    // 🔥 FEES SUMMARY (FOR FEES MODULE)
    feeDetails: {
      totalAmount: {
        type: Number,
        default: 0,
      },
      paidAmount: {
        type: Number,
        default: 0,
      },
      lastPaymentDate: {
        type: Date,
      },
      status: {
        type: String,
        enum: ["Paid", "Partial", "Unpaid"],
        default: "Unpaid",
      },
    },
  },
  { timestamps: true }
);

// 🔐 PASSWORD HASHING
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Student", studentSchema);
