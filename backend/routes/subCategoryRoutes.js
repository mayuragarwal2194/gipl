const express = require("express");
const {
  createSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryByName,
} = require("../controllers/subCategoryController");

const router = express.Router();

router.post("/", createSubCategory);
router.get("/", getAllSubCategories);
router.put("/:id", updateSubCategory);
router.delete("/:id", deleteSubCategory);
router.get("/name/:name", getSubCategoryByName);

module.exports = router;