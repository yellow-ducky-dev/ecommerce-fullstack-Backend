const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

/* ── helpers ── */
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

const sendUser = (res, status, user, token) =>
  res.status(status).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    avatar: user.avatar || "",
    phone: user.phone || "",
    city: user.city || "",
    token,
  });

/* ─────────────────────────────────────────────────────────
   POST /api/auth/register
───────────────────────────────────────────────────────── */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) return res.status(400).json({ message: "An account with this email already exists" });

    /* hash password manually — avoids any pre-save hook issues */
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPass,
    });

    return sendUser(res, 201, user, generateToken(user._id));
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
});

/* ─────────────────────────────────────────────────────────
   POST /api/auth/login
───────────────────────────────────────────────────────── */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid email or password" });

    return sendUser(res, 200, user, generateToken(user._id));
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
});

/* ─────────────────────────────────────────────────────────
   GET /api/auth/me  (protected)
───────────────────────────────────────────────────────── */
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ─────────────────────────────────────────────────────────
   PUT /api/auth/profile  (protected)
───────────────────────────────────────────────────────── */
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.body.name) user.name = req.body.name.trim();
    if (req.body.email) user.email = req.body.email.toLowerCase().trim();

    /* if changing password, hash it manually */
    if (req.body.password) {
      if (req.body.password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    if (req.body.phone !== undefined) user.phone = req.body.phone;

    if (req.body.city !== undefined) user.city = req.body.city;

    if (req.body.avatar !== undefined) user.avatar = req.body.avatar;

    const updated = await user.save();
    return sendUser(res, 200, updated, generateToken(updated._id));
  } catch (err) {
    console.error("PROFILE ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
