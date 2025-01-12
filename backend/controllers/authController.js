const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email or username" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User created", token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" + error });
  }
};

const login = async (req, res) => {
  const { identifier, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" + error });
  }
};

const sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    await user.save();

    const expiry = new setTimeout(async function () {
      user.otp = null;
      await user.save();
    }, 300000);

    expiry;

    // Send OTP to user's email
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: "Expense Manager account OTP for password reset",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.
      If you didn't request this, please ignore this email.
      Please do not share the OTP with anyone.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending OTP" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "OTP sent successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending OTP" + error });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.otp = null;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying OTP" + error });
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting password" + error });
  }
};

module.exports = { signup, login, sendOTP, verifyOTP, resetPassword };
