// backend/src/app.js

const express = require("express");
const cors = require("cors");

const adminRoutes = require("./routes/admin");
const studentRoutes = require("./routes/student");
const facultyRoutes = require("./routes/faculty");
const branchRoutes = require("./routes/branch");
const noticeRoutes = require("./routes/noticeRoutes");
const examRoutes = require("./routes/exam");
const feeRoutes = require("./routes/fee.routes"); // ✅ FEES ROUTES

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

// ================= ROUTES =================
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/fees", feeRoutes); // ✅ FEES MODULE ADDED
// =========================================

app.get("/", (req, res) => {
  res.send("College Management System API running");
});

module.exports = app;
