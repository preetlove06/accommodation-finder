const express = require("express");
const {
  getInquiries,
  createInquiry,
  updateInquiryStatus,
} = require("../controllers/InquiryController");

const router = express.Router();

router.get("/", getInquiries);
router.post("/", createInquiry);
router.put("/:id", updateInquiryStatus);

module.exports = router;