const express = require("express");
const router = express.Router();
const { getSummary } = require("../controllers/dashboardController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, getSummary);

module.exports = router;
