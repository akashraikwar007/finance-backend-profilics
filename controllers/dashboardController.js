const Transaction = require("../models/Transaction");
const Goal = require("../models/Goal");

exports.getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId });

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const saving = income - expense;

    const goals = await Goal.find({ user: req.userId });

    const goalProgress = goals.map((g) => ({
      title: g.title,
      percentage: ((g.savedAmount / g.targetAmount) * 100).toFixed(2),
    }));

    res.json({ income, expense, saving, goalProgress });
  } catch (err) {
    res.status(500).json({ message: "Dashboard summary failed" });
  }
};
