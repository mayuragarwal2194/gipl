const mongoose = require("mongoose");
const SubCategory = require("../models/subCategory");
mongoose.connect("mongodb://localhost:27017/gajpati_database");

(async () => {
  const subcategories = await SubCategory.find();

  for (const sub of subcategories) {
    const slug = sub.name.toLowerCase().replace(/\s+/g, "-");
    sub.slug = slug;
    await sub.save();
    console.log(`Updated: ${sub.name} -> ${slug}`);
  }

  console.log("All slugs updated.");
  mongoose.disconnect();
})();