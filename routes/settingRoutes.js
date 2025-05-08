const express = require("express");
const router = express.Router();
const { changeCurrency, getCurrency } = require("../controllers/settingController");
const auth = require("../middlewares/authMiddleware");

router.use(auth);

router.get("/", getCurrency);
router.put("/", changeCurrency);

module.exports = router;
