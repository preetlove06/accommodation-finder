import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  CheckCircle2,
  Loader2,
  Home,
  Mail,
  Phone,
  MapPin,
  Search,
  Menu,
  X,
  LayoutList,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:5000/api";

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
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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

            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Find your perfect stay. Browse properties, view details, and send
              rental inquiries through one easy platform.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-white/40">
              Quick Links
            </h4>

            <div className="space-y-3">
              <Link to="/" className="block text-sm text-white/60 hover:text-white">
                Home
              </Link>
              <Link to="/properties" className="block text-sm text-white/60 hover:text-white">
                Properties
              </Link>
              <Link to="/about" className="block text-sm text-white/60 hover:text-white">
                About Us
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-white/40">
              Contact
            </h4>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="w-4 h-4" />
                hello@stayfinder.com
              </div>

              <div className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="w-4 h-4" />
                +64 21 000 0000
              </div>

              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4" />
                New Zealand
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

export default function ListProperty() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    property_type: "",
    price_per_night: "",
    location: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    max_guests: "",
    amenities: "",
    image_url: "",
    owner_name: "",
    owner_email: "",
    owner_phone: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await axios.post(`${API_URL}/submissions`, {
        ...form,
        price_per_night: Number(form.price_per_night) || 0,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
        max_guests: form.max_guests ? Number(form.max_guests) : undefined,
        status: "pending",
      });

      setSubmitted(true);
    } catch (error) {
      alert(error.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 md:pt-24 pb-24">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center mx-auto mb-4">
              <Home className="w-7 h-7 text-yellow-600" />
            </div>

            <h1 className="text-3xl font-bold mb-2">
              List Your Property
            </h1>

            <p className="text-gray-600 text-sm max-w-sm mx-auto">
              Submit your property details below. Our team will review your
              submission and contact you soon.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border rounded-2xl p-12 text-center shadow-sm"
              >
                <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />

                <h2 className="text-2xl font-bold mb-2">
                  Submission Received!
                </h2>

                <p className="text-gray-600 text-sm max-w-xs mx-auto">
                  Thank you! We will review your property and contact you at{" "}
                  <strong>{form.owner_email}</strong>.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm space-y-6"
              >
                <div>
                  <p className="font-semibold text-sm text-yellow-600 uppercase tracking-wider mb-4">
                    Property Details
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-600">
                        Property Title *
                      </label>
                      <input
                        required
                        className="mt-1.5 w-full border rounded-lg px-3 py-2"
                        placeholder="e.g. Sunny 2BR Apartment"
                        value={form.title}
                        onChange={(e) => set("title", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-600">
                          Property Type *
                        </label>
                        <select
                          required
                          className="mt-1.5 w-full border rounded-lg px-3 py-2 bg-white"
                          value={form.property_type}
                          onChange={(e) => set("property_type", e.target.value)}
                        >
                          <option value="">Select type</option>
                          <option value="apartment">Apartment</option>
                          <option value="house">House</option>
                          <option value="villa">Villa</option>
                          <option value="studio">Studio</option>
                          <option value="condo">Condo</option>
                          <option value="cottage">Cottage</option>
                          <option value="loft">Loft</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-gray-600">
                          Price per Night *
                        </label>
                        <input
                          required
                          type="number"
                          min="1"
                          className="mt-1.5 w-full border rounded-lg px-3 py-2"
                          placeholder="120"
                          value={form.price_per_night}
                          onChange={(e) => set("price_per_night", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-600">
                          City / Location *
                        </label>
                        <input
                          required
                          className="mt-1.5 w-full border rounded-lg px-3 py-2"
                          placeholder="Tauranga"
                          value={form.location}
                          onChange={(e) => set("location", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-600">
                          Full Address
                        </label>
                        <input
                          className="mt-1.5 w-full border rounded-lg px-3 py-2"
                          placeholder="Street, area"
                          value={form.address}
                          onChange={(e) => set("address", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-gray-600">
                          Bedrooms
                        </label>
                        <input
                          type="number"
                          min="0"
                          className="mt-1.5 w-full border rounded-lg px-3 py-2"
                          placeholder="2"
                          value={form.bedrooms}
                          onChange={(e) => set("bedrooms", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-600">
                          Bathrooms
                        </label>
                        <input
                          type="number"
                          min="0"
                          className="mt-1.5 w-full border rounded-lg px-3 py-2"
                          placeholder="1"
                          value={form.bathrooms}
                          onChange={(e) => set("bathrooms", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-600">
                          Max Guests
                        </label>
                        <input
                          type="number"
                          min="1"
                          className="mt-1.5 w-full border rounded-lg px-3 py-2"
                          placeholder="4"
                          value={form.max_guests}
                          onChange={(e) => set("max_guests", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-600">
                        Description
                      </label>
                      <textarea
                        className="mt-1.5 w-full border rounded-lg px-3 py-2 h-28"
                        placeholder="Describe your property..."
                        value={form.description}
                        onChange={(e) => set("description", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-600">
                        Amenities comma separated
                      </label>
                      <input
                        className="mt-1.5 w-full border rounded-lg px-3 py-2"
                        placeholder="WiFi, Pool, Parking, Kitchen"
                        value={form.amenities}
                        onChange={(e) => set("amenities", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-600">
                        Main Image URL
                      </label>
                      <input
                        className="mt-1.5 w-full border rounded-lg px-3 py-2"
                        placeholder="https://..."
                        value={form.image_url}
                        onChange={(e) => set("image_url", e.target.value)}
                      />

                      {form.image_url && (
                        <img
                          src={form.image_url}
                          alt="Preview"
                          className="mt-2 w-full h-40 object-cover rounded-xl border"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-sm text-yellow-600 uppercase tracking-wider mb-4">
                    Your Contact Info
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-600">
                        Your Name *
                      </label>
                      <input
                        required
                        className="mt-1.5 w-full border rounded-lg px-3 py-2"
                        placeholder="Full name"
                        value={form.owner_name}
                        onChange={(e) => set("owner_name", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-600">
                          Email *
                        </label>
                        <input
                          required
                          type="email"
                          className="mt-1.5 w-full border rounded-lg px-3 py-2"
                          placeholder="you@email.com"
                          value={form.owner_email}
                          onChange={(e) => set("owner_email", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-600">
                          Phone
                        </label>
                        <input
                          className="mt-1.5 w-full border rounded-lg px-3 py-2"
                          placeholder="+64 21 000 0000"
                          value={form.owner_phone}
                          onChange={(e) => set("owner_phone", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? "Submitting..." : "Submit Property for Review"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}