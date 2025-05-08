// app.js
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/settings", require("./routes/settingRoutes"));

module.exports = app;
