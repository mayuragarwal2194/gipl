const express = require("express");
const upload = require("../config/multerConfig"); // Import multer config
const { applyForJob, getAllApplicants } = require("../controllers/applicantController");

const router = express.Router();

// Career Form Submission Route
router.post("/apply", (req, res, next) => {
  upload.single("resume")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || "File upload failed" });
    }
    next();
  });
}, applyForJob);

router.get("/", getAllApplicants);

module.exports = router;