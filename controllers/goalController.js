const Goal = require("../models/Goal");

exports.createGoal = async (req, res) => {
  try {
    const goal = await Goal.create({ ...req.body, user: req.userId });
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: "Failed to create goal" });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.userId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch goals" });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: "Failed to update goal" });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    await Goal.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete goal" });
  }
};
