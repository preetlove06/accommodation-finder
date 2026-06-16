const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
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
    amenities: [String],
    images: [String],
    is_featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["available", "booked", "maintenance"],
      default: "available",
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);