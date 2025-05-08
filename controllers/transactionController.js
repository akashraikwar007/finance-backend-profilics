const Transaction = require("../models/Transaction");
const mongoose = require('mongoose'); 

exports.createTransaction = async (req, res) => {
  try {
    const { type, category, amount, date, description } = req.body;
    console.log("Create Transaction Request Body:", req.body); 
    console.log("User ID from Auth Middleware:", req.userId); 

    const transaction = await Transaction.create({
      user: req.userId,
      type,
      category,
      amount,
      date,
      description,
    });
    res.status(201).json(transaction);
  } catch (err) {
    console.error("Error creating transaction:", err); 
    res.status(500).json({ message: "Failed to add transaction" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    console.log("Get Transactions Request Query:", req.query);
    console.log("User ID from Auth Middleware:", req.userId); 


    const filter = { user: req.userId };

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
         end.setHours(23, 59, 59, 999);
         filter.date = { $gte: start, $lte: end };
      } else {
         console.warn("Invalid date format received:", startDate, endDate); // Log invalid date
         return res.status(400).json({ message: "Invalid date format" });
      }
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    console.log("Fetching transactions with filter:", filter); 
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    console.log(`Found ${transactions.length} transactions for user ${req.userId}`); 
    res.json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err); 
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const userId = req.userId;
    const updateData = req.body;

    console.log(`Attempting to update transaction ID: ${transactionId} for user: ${userId}`); 
    console.log("Update data:", updateData); 

    
    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
        console.warn(`Invalid transaction ID format: ${transactionId}`);
        return res.status(400).json({ message: "Invalid transaction ID format" });
    }


    const transaction = await Transaction.findOneAndUpdate(
      { _id: transactionId, user: userId },
      updateData,
      { new: true }
    );

    if (!transaction) {
      console.warn(`Update failed: Transaction ID ${transactionId} not found or not authorized for user ${userId}`); 
      return res.status(404).json({ message: "Transaction not found or not authorized" });
    }

    console.log(`Transaction ID ${transactionId} updated successfully.`); 
    res.json(transaction);
  } catch (err) {
    console.error(`Error updating transaction ID ${req.params.id}:`, err); 
    res.status(500).json({ message: "Update failed" });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const userId = req.userId;

    console.log(`Attempting to delete transaction ID: ${transactionId} for user: ${userId}`); // Log attempt

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
        console.warn(`Invalid transaction ID format: ${transactionId}`);
        return res.status(400).json({ message: "Invalid transaction ID format" });
    }


    const result = await Transaction.findOneAndDelete({ _id: transactionId, user: userId });

    if (!result) {
       console.warn(`Delete failed: Transaction ID ${transactionId} not found or not authorized for user ${userId}`); 
       return res.status(404).json({ message: "Transaction not found or not authorized" });
    }

    console.log(`Transaction ID ${transactionId} deleted successfully.`); 
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error(`Error deleting transaction ID ${req.params.id}:`, err); 
    res.status(500).json({ message: "Delete failed" });
  }
};
