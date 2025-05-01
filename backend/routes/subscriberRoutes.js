const express = require("express");
const router = express.Router();
const { subscribeNewsletter, getSubscribers, deleteSubscriber } = require("../controllers/subscriberController");

router.post("/", subscribeNewsletter);
router.get("/", getSubscribers);
router.delete("/:id", deleteSubscriber);

module.exports = router;