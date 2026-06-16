const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    property_title: String,
    guest_name: {
      type: String,
      required: true,
    },
    guest_email: {
      type: String,
      required: true,
    },
    guest_phone: String,
    check_in: {
      type: Date,
      required: true,
    },
    check_out: {
      type: Date,
      required: true,
    },
    guests_count: Number,
    message: String,
    status: {
      type: String,
      enum: ["pending", "confirmed", "declined"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);