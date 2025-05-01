const express = require("express");
const { adminLogin, adminLogout, verifyAdmin } = require("../controllers/adminAuthController");

const router = express.Router();

// Admin Login Route
router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.get("/verify", verifyAdmin);

module.exports = router;