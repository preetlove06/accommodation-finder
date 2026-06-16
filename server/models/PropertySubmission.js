const mongoose = require("mongoose");

const propertySubmissionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    property_type: {
      type: String,
      enum: ["apartment", "house", "villa", "studio", "condo", "cottage", "loft"],
      required: true,
    },
    price_per_night: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    address: String,
    bedrooms: Number,
    bathrooms: Number,
    max_guests: Number,
    amenities: String,
    image_url: String,
    owner_name: {
      type: String,
      required: true,
    },
    owner_email: {
      type: String,
      required: true,
    },
    owner_phone: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PropertySubmission", propertySubmissionSchema);