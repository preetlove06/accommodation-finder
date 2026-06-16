const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Inquiry = require("./models/Inquiry");

dotenv.config();

const inquiries = [
  {
    property_id: "6a2cd9cbce1eb0b9c403fc5b",
    property_title: "Elegant Parisian Loft with Eiffel Tower Views",
    guest_name: "Sophie Laurent",
    guest_email: "sophie.laurent@email.com",
    guest_phone: "+33 6 12 34 56 78",
    check_in: "2026-06-18",
    check_out: "2026-06-25",
    guests_count: 2,
    message:
      "We're celebrating our anniversary — looking forward to the Eiffel Tower views!",
    status: "confirmed",
  },
  {
    property_id: "6a2cd9cbce1eb0b9c403fc5b",
    property_title: "Elegant Parisian Loft with Eiffel Tower Views",
    guest_name: "James Holloway",
    guest_email: "james.h@company.com",
    guest_phone: "+44 7911 123456",
    check_in: "2026-07-02",
    check_out: "2026-07-08",
    guests_count: 3,
    message:
      "Business trip with colleagues. Do you have a fast WiFi connection?",
    status: "pending",
  },
  {
    property_id: "6a2cd9cbce1eb0b9c403fc5c",
    property_title: "Modern Tokyo Studio in Shibuya",
    guest_name: "Yuki Tanaka",
    guest_email: "yuki.tanaka@mail.jp",
    guest_phone: "+81 90-1234-5678",
    check_in: "2026-06-20",
    check_out: "2026-06-28",
    guests_count: 1,
    message: "",
    status: "confirmed",
  },
  {
    property_id: "6a2cd9cbce1eb0b9c403fc5c",
    property_title: "Modern Tokyo Studio in Shibuya",
    guest_name: "Carlos Ruiz",
    guest_email: "carlos.ruiz@gmail.com",
    guest_phone: "+34 612 345 678",
    check_in: "2026-07-10",
    check_out: "2026-07-15",
    guests_count: 2,
    message: "Will arrive late. Is a late check-in possible?",
    status: "pending",
  },
  {
    property_id: "6a2cd9cbce1eb0b9c403fc5d",
    property_title: "Luxury Beachfront Villa in Malibu",
    guest_name: "Rachel Kim",
    guest_email: "rachel.kim@studio.com",
    guest_phone: "+1 310-555-0192",
    check_in: "2026-06-14",
    check_out: "2026-06-21",
    guests_count: 8,
    message: "Family reunion! Can we arrange an early check-in?",
    status: "confirmed",
  },
  {
    property_id: "6a2cd9cbce1eb0b9c403fc5d",
    property_title: "Luxury Beachfront Villa in Malibu",
    guest_name: "Mark Jensen",
    guest_email: "mark.j@enterprise.io",
    guest_phone: "+1 415-555-0174",
    check_in: "2026-07-05",
    check_out: "2026-07-12",
    guests_count: 6,
    message: "Corporate retreat. Please confirm pool availability.",
    status: "declined",
  },
];

const seedInquiries = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Inquiry.deleteMany();
    console.log("Old inquiries deleted");

    await Inquiry.insertMany(inquiries);
    console.log("Inquiry data inserted");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedInquiries();