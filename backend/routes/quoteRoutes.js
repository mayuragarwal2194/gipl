const express = require("express");
const router = express.Router();
const { getQuote, getAllQuotes, deleteQuote } = require("../controllers/quoteController");

router.post("/", getQuote);
router.get("/", getAllQuotes); // Get all quotes
router.delete("/:id", deleteQuote); // Delete a quote request

module.exports = router;