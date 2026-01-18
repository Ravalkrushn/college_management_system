// c:\Users\raval\Desktop\college-management-system\backend\src\controllers\fee.controller.js

const Student = require("../models/student.model");
const FeeTransaction = require("../models/feeTransaction.model");
const mongoose = require("mongoose");

/**
 * @desc    Add fee payment (Full or Installment)
 * @route   POST /api/fees/add-payment
 * @access  Admin
 */
exports.addPayment = async (req, res) => {
  try {
    const {
      studentId,
      amount,
      paymentMode,
      paymentDate,
      remarks,
      semester,
      totalAmount,
    } = req.body;

    // 1. INPUT VALIDATION
    if (!studentId || !amount || !paymentMode) {
      return res.status(400).json({ message: "Missing required fields: studentId, amount, or paymentMode" });
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid Student ID format" });
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number" });
    }

    // 2. FETCH STUDENT
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 3. SAFETY CHECK: Initialize feeDetails if missing (for old records)
    if (!student.feeDetails) {
      student.feeDetails = {
        totalAmount: 0,
        paidAmount: 0,
        status: "Unpaid",
      };
    }

    // 4. UPDATE TOTAL FEES (If provided)
    if (totalAmount) {
      const newTotal = Number(totalAmount);
      if (!isNaN(newTotal) && newTotal > 0) {
        student.feeDetails.totalAmount = newTotal;
      }
    }

    // 5. CREATE TRANSACTION
    // We use the semester from body OR fallback to student's current semester
    const txSemester = semester || student.semester;
    if (!txSemester) {
      return res.status(400).json({ message: "Semester is required for fee transaction" });
    }

    const transaction = await FeeTransaction.create({
      studentId,
      semester: txSemester,
      amount: Number(amount),
      paymentMode,
      paymentDate: paymentDate || new Date(),
      remarks,
    });

    // 6. UPDATE STUDENT FEE SUMMARY
    const currentPaid = student.feeDetails.paidAmount || 0;
    student.feeDetails.paidAmount = currentPaid + Number(amount);
    student.feeDetails.lastPaymentDate = new Date();

    // 7. RECALCULATE STATUS
    const total = student.feeDetails.totalAmount || 0;
    const paid = student.feeDetails.paidAmount;

    if (paid >= total && total > 0) {
      student.feeDetails.status = "Paid";
    } else if (paid > 0) {
      student.feeDetails.status = "Partial";
    } else {
      student.feeDetails.status = "Unpaid";
    }

    // FIX: Use updateOne to avoid validation errors on unrelated fields (e.g. gender case mismatch in legacy data)
    await Student.updateOne(
      { _id: student._id },
      { $set: { feeDetails: student.feeDetails } }
    );

    res.status(201).json({
      message: "Payment added successfully",
      transaction,
      feeDetails: student.feeDetails,
    });

  } catch (error) {
    console.error("Add Payment Error:", error);

    // Handle Mongoose Validation Errors as 400
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: "Validation Error", errors: messages });
    }

    res.status(500).json({
      message: "Server error while adding payment",
      error: error.message,
    });
  }
};

// ... keep existing getPaymentHistory, setTotalFee, getFeeStructure ...
exports.getPaymentHistory = async (req, res) => {
  try {
    const { studentId } = req.params;

    const history = await FeeTransaction.find({ studentId })
      .sort({ createdAt: -1 })
      .populate("studentId", "firstName lastName enrollmentNo");

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching payment history",
      error: error.message,
    });
  }
};

exports.setTotalFee = async (req, res) => {
  try {
    const { studentId, totalAmount } = req.body;

    if (!studentId || !totalAmount) {
      return res.status(400).json({ message: "Missing data" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Initialize if missing
    if (!student.feeDetails) {
      student.feeDetails = { paidAmount: 0, status: "Unpaid" };
    }

    student.feeDetails.totalAmount = Number(totalAmount);

    const paid = student.feeDetails.paidAmount || 0;

    if (paid >= totalAmount && totalAmount > 0) {
      student.feeDetails.status = "Paid";
    } else if (paid > 0) {
      student.feeDetails.status = "Partial";
    } else {
      student.feeDetails.status = "Unpaid";
    }

    await Student.updateOne(
      { _id: student._id },
      { $set: { feeDetails: student.feeDetails } }
    );

    res.status(200).json({
      message: "Total fee updated successfully",
      feeDetails: student.feeDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating total fee",
      error: error.message,
    });
  }
};

exports.getFeeStructure = async (req, res) => {
  try {
    const { course, semester } = req.params;

    const structure = await FeeStructure.findOne({ course, semester });
    if (!structure) {
      return res.status(404).json({ message: "Fee structure not found" });
    }

    res.status(200).json(structure);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching fee structure",
      error: error.message,
    });
  }
};
