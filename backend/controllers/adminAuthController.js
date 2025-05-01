const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    // Validate password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Set token in HTTP-Only Cookie
    res.cookie("adminToken", token, {
      httpOnly: true, // Prevents access via JavaScript (prevents XSS attacks)
      secure: process.env.NODE_ENV === "production", // Ensures HTTPS in production
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.adminLogout = async (req, res) => {
  try {
    res.clearCookie("adminToken", { httpOnly: true, secure: false, sameSite: "Lax" });
    return res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
};

exports.verifyAdmin = async (req, res) => {
  try {
    const token = req.cookies?.adminToken; // ✅ Get token from cookies
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "Invalid token" });

    res.json({ message: "Authenticated", adminId: decoded.adminId });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
