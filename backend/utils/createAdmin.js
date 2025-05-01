require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/admin");

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const admin = new Admin({
    name: "Super Admin",
    email: "admin@example.com",
    password: "Admin@123", // Will be hashed automatically
  });

  await admin.save();
  console.log("✅ Admin created successfully.");
  mongoose.connection.close();
};

createAdmin().catch((err) => console.error("❌ Error creating admin:", err));