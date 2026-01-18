// C:\Users\raval\Desktop\college-management-system\backend\src\models\feeStructure.model.js

const mongoose = require("mongoose");

const feeStructureSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      required: true, // BCA / BBA / BSc
    },

    semester: {
      type: String,
      required: true, // 1, 2, 3, 4, 5, 6
    },

    totalAmount: {
      type: Number,
      required: true, // Default fees amount
    },

    academicYear: {
      type: String, // e.g. 2024-2025
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeeStructure", feeStructureSchema);
