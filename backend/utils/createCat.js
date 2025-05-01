require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../models/category");

const createDummyCategory = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dummyId = "111111111111111111111111"; // Fixed dummy _id for category

  const existing = await Category.findById(dummyId);
  if (existing) {
    console.log("ℹ️ Dummy Category already exists.");
  } else {
    const dummyCategory = new Category({
      _id: dummyId,
      name: "Uncategorized",
      shortname: "uncategorized",
      active: false,
      children: [],
    });

    await dummyCategory.save();
    console.log("✅ Dummy Category created successfully.");
  }

  mongoose.connection.close();
};

createDummyCategory().catch((err) =>
  console.error("❌ Error creating dummy category:", err)
);