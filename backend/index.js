const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", transactionRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
