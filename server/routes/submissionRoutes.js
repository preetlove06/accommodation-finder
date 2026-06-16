const express = require("express");
const {
  getSubmissions,
  createSubmission,
  updateSubmissionStatus,
} = require("../controllers/submissionController");

const router = express.Router();

router.get("/", getSubmissions);
router.post("/", createSubmission);
router.put("/:id", updateSubmissionStatus);

module.exports = router;