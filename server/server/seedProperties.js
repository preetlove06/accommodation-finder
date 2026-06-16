const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Property = require("../models/Property");

dotenv.config({ path: "../.env" });

const properties = [
  {
    title: "Elegant Parisian Loft with Eiffel Tower Views",
    description: "Experience the charm of Paris from this beautifully renovated loft in the heart of the 7th arrondissement.",
    property_type: "loft",
    price_per_night: 285,
    location: "Paris",
    address: "7th Arrondissement, Paris, France",
    bedrooms: 2,
    bathrooms: 1,
    max_guests: 4,
    amenities: ["WiFi", "Kitchen", "Air Conditioning", "TV", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"
    ],
    is_featured: true,
    status: "available",
    rating: 4.9,
  },
  {
    title: "Modern Tokyo Studio in Shibuya",
    description: "A sleek, minimalist studio apartment in the vibrant Shibuya district.",
    property_type: "studio",
    price_per_night: 120,
    location: "Tokyo",
    address: "Shibuya, Tokyo, Japan",
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 2,
    amenities: ["WiFi", "Air Conditioning", "TV", "Kitchen"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80"
    ],
    is_featured: true,
    status: "available",
    rating: 4.7,
  },
  {
    title: "Luxury Beachfront Villa in Malibu",
    description: "Stunning oceanfront villa with private beach access.",
    property_type: "villa",
    price_per_night: 750,
    location: "Malibu",
    address: "Pacific Coast Highway, Malibu, CA",
    bedrooms: 5,
    bathrooms: 4,
    max_guests: 10,
    amenities: ["WiFi", "Pool", "Parking", "Kitchen", "Air Conditioning", "TV"],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80"
    ],
    is_featured: true,
    status: "available",
    rating: 5,
  },
  {
    title: "Santorini Cliffside Condo",
    description: "A whitewashed condo perched on the cliffs of Oia with breathtaking caldera and sunset views.",
    property_type: "condo",
    price_per_night: 350,
    location: "Santorini",
    address: "Oia, Santorini, Greece",
    bedrooms: 2,
    bathrooms: 2,
    max_guests: 4,
    amenities: ["WiFi", "Pool", "Kitchen", "Air Conditioning", "TV"],
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80"
    ],
    is_featured: true,
    status: "available",
    rating: 4.9,
  }
];

const seedProperties = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Property.deleteMany();
    console.log("Old properties deleted");

    await Property.insertMany(properties);
    console.log("Property data inserted");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProperties();