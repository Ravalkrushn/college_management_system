// C:\Users\raval\Desktop\college-management-system\backend\src\models\feeTransaction.model.js

const mongoose = require("mongoose");

const feeTransactionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    semester: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMode: {
      type: String,
      enum: ["Cash", "Online", "UPI", "Bank Transfer", "Cheque"],
      required: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    remarks: {
      type: String, // Receipt No / Note
    },

    transactionId: {
      type: String, // For online payments
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeeTransaction", feeTransactionSchema);
