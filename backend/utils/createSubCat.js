require("dotenv").config();
const mongoose = require("mongoose");
const SubCategory = require("../models/subCategory");

const createDummySubCategory = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dummyId = "000000000000000000000000"; // Fixed dummy _id

  const existing = await SubCategory.findById(dummyId);
  if (existing) {
    console.log("ℹ️ Dummy SubCategory already exists.");
  } else {
    const dummySubCategory = new SubCategory({
      _id: dummyId,
      name: "Uncategorized",
      active: false,
      parentCategory: null,
    });

    await dummySubCategory.save();
    console.log("✅ Dummy SubCategory created successfully.");
  }

  mongoose.connection.close();
};

createDummySubCategory().catch((err) =>
  console.error("❌ Error creating dummy subcategory:", err)
);