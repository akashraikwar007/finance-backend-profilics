const User = require("../models/User");

exports.changeCurrency = async (req, res) => {
  try {
    const { currency } = req.body;
    await User.findByIdAndUpdate(req.userId, { currency });
    res.json({ message: "Currency updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update currency" });
  }
};

exports.getCurrency = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ currency: user.currency });
  } catch (err) {
    res.status(500).json({ message: "Failed to get currency" });
  }
};
