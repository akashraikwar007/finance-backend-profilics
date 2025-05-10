const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    currency: { type: String, default: "INR" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
