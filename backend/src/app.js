const express = require("express");
const cors = require("cors");

const adminRoutes = require("./routes/admin");
const studentRoutes = require("./routes/student");

const app = express();

/* ✅ CORS (FormData + PUT/DELETE SAFE) */
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


/* ✅ BODY PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ✅ STATIC UPLOADS */
app.use("/uploads", express.static("uploads"));

/* ✅ ROUTES */
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("College Management System API running");
});

module.exports = app;
