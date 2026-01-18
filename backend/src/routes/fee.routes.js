const express = require("express");
const router = express.Router();

const feeController = require("../controllers/fee.controller");

// ===============================
// FEES MANAGEMENT ROUTES (ADMIN)
// ===============================

// Add payment (full or installment)
router.post("/add-payment", feeController.addPayment);

// Set or update total fees manually
router.post("/set-total", feeController.setTotalFee);

// Get payment history of a student
router.get("/history/:studentId", feeController.getPaymentHistory);

// Get default fee structure by course & semester
router.get(
  "/structure/:course/:semester",
  feeController.getFeeStructure
);

module.exports = router;
