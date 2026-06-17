import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  MapPin, BedDouble, Bath, Users, Star,
  Wifi, Car, Waves, Snowflake, Tv, Utensils,
  ArrowLeft, ChevronLeft, ChevronRight, Loader2,
  Calendar, Send, CheckCircle2, Home, Mail, Phone,
  Search, Menu, X, LayoutList,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: "Home", path: "/" },
    { label: "Properties", path: "/properties" },
    { label: "List Your Property", path: "/list-property" },
    { label: "About", path: "/about" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-yellow-500 flex items-center justify-center">
              <Home className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-semibold">StayFinder</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive(link.path)
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/properties">
              <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
                <Search className="w-4 h-4" />
                Search
              </button>
            </Link>

            <Link to="/dashboard">
              <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-medium">
                <LayoutList className="w-4 h-4" />
                Owner Dashboard
              </button>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive(link.path)
                      ? "bg-black text-white"
                      : "text-gray-600 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-yellow-500 flex items-center justify-center">
                <Home className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-semibold">StayFinder</span>
            </div>

            <p className="text-white/60 text-sm max-w-sm">
              Find your perfect stay. Browse properties, view details, and send rental inquiries.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase text-white/40">
              Quick Links
            </h4>
            <div className="space-y-3">
              <Link to="/" className="block text-sm text-white/60 hover:text-white">Home</Link>
              <Link to="/properties" className="block text-sm text-white/60 hover:text-white">Properties</Link>
              <Link to="/about" className="block text-sm text-white/60 hover:text-white">About Us</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase text-white/40">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="w-4 h-4" /> hello@stayfinder.com
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="w-4 h-4" /> +64 21 000 0000
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4" /> New Zealand
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} StayFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const amenityIcons = {
  wifi: Wifi,
  parking: Car,
  pool: Waves,
  "air conditioning": Snowflake,
  tv: Tv,
  kitchen: Utensils,
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
];

function InquiryForm({ property }) {
  const [formData, setFormData] = useState({
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    check_in: "",
    check_out: "",
    guests_count: 1,
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await axios.post(`${API_URL}/api/inquiries`, {
        ...formData,
        property_id: property._id,
        property_title: property.title,
        status: "pending",
      });

      setSubmitted(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send inquiry");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl font-bold">
          ${property.price_per_night}
          <span className="text-sm font-normal text-gray-500">/night</span>
        </p>
        <Calendar className="w-5 h-5 text-yellow-600" />
      </div>

      {submitted ? (
        <div className="text-center py-8">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Inquiry Sent!</h3>
          <p className="text-gray-600 text-sm">
            We will get back to you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-600">Full Name</label>
            <input
              required
              placeholder="John Doe"
              value={formData.guest_name}
              onChange={(e) => handleChange("guest_name", e.target.value)}
              className="mt-1.5 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Email</label>
            <input
              required
              type="email"
              placeholder="john@example.com"
              value={formData.guest_email}
              onChange={(e) => handleChange("guest_email", e.target.value)}
              className="mt-1.5 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Phone</label>
            <input
              placeholder="+64 21 000 0000"
              value={formData.guest_phone}
              onChange={(e) => handleChange("guest_phone", e.target.value)}
              className="mt-1.5 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600">Check-in</label>
              <input
                required
                type="date"
                value={formData.check_in}
                onChange={(e) => handleChange("check_in", e.target.value)}
                className="mt-1.5 w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">Check-out</label>
              <input
                required
                type="date"
                value={formData.check_out}
                onChange={(e) => handleChange("check_out", e.target.value)}
                className="mt-1.5 w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Guests</label>
            <input
              type="number"
              min="1"
              max={property.max_guests || 20}
              value={formData.guests_count}
              onChange={(e) => handleChange("guests_count", Number(e.target.value))}
              className="mt-1.5 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">
              Message optional
            </label>
            <textarea
              placeholder="Any special requests?"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="mt-1.5 w-full border rounded-lg px-3 py-2 h-20"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl flex items-center justify-center gap-2"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {submitting ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <p className="text-gray-600 text-lg mb-4">Property not found</p>
          <Link to="/properties">
            <button className="border px-5 py-2 rounded-lg hover:bg-white">
              Back to Properties
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const images = property.images?.length > 0 ? property.images : fallbackImages;

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Properties
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-4 bg-gray-200">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={images[activeImage]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                        index === activeImage
                          ? "border-yellow-500"
                          : "border-transparent opacity-60"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-8">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs capitalize">
                      {property.property_type}
                    </span>

                    {property.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-medium">
                          {property.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {property.title}
                  </h1>

                  <div className="flex items-center gap-1.5 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                    {property.address && <span>· {property.address}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {property.bedrooms && (
                    <div className="bg-white rounded-xl p-4 text-center border">
                      <BedDouble className="w-5 h-5 mx-auto mb-2 text-yellow-600" />
                      <p className="font-semibold">{property.bedrooms}</p>
                      <p className="text-xs text-gray-600">Bedrooms</p>
                    </div>
                  )}

                  {property.bathrooms && (
                    <div className="bg-white rounded-xl p-4 text-center border">
                      <Bath className="w-5 h-5 mx-auto mb-2 text-yellow-600" />
                      <p className="font-semibold">{property.bathrooms}</p>
                      <p className="text-xs text-gray-600">Bathrooms</p>
                    </div>
                  )}

                  {property.max_guests && (
                    <div className="bg-white rounded-xl p-4 text-center border">
                      <Users className="w-5 h-5 mx-auto mb-2 text-yellow-600" />
                      <p className="font-semibold">{property.max_guests}</p>
                      <p className="text-xs text-gray-600">Max Guests</p>
                    </div>
                  )}
                </div>

                {property.description && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      About This Property
                    </h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {property.description}
                    </p>
                  </div>
                )}

                {property.amenities?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Amenities</h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.amenities.map((amenity) => {
                        const Icon = amenityIcons[amenity.toLowerCase()] || Wifi;

                        return (
                          <div
                            key={amenity}
                            className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border"
                          >
                            <Icon className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm capitalize">{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28">
                <InquiryForm property={property} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}