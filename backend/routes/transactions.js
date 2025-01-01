const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const { verifyToken } = require("../middleware/authMiddleware.js");

router.post("/transactions", verifyToken, transactionController.addTransaction);
router.get("/transactions", verifyToken, transactionController.getTransactions);

module.exports = router;
