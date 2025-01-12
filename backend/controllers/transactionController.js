const Transaction = require("../models/Transaction");

const addTransaction = async (req, res) => {
  const { date, description, amount, category, type } = req.body;
  const userId = req.user.userId;

  try {
    const transaction = new Transaction({
      date,
      description,
      amount,
      category,
      type,
      user: userId,
    });
    await transaction.save();
    res.status(201).json({ message: "Transaction added", transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding transaction" });
  }
};

const getTransactions = async (req, res) => {
  const { userId } = req.body;

  try {
    const transactions = await Transaction.find({ user: userId }).sort({
      date: -1,
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting transaction" });
  }
};

module.exports = { addTransaction, getTransactions, deleteTransaction };
