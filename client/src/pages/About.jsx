import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Shield,
  Heart,
  Globe,
  Award,
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
            <span className="text-xl font-semibold tracking-tight">
              StayFinder
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
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
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
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
              Find your perfect stay. From cozy apartments to luxury villas, we
              connect users with suitable accommodation options.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-white/40">
              Quick Links
            </h4>

            <div className="space-y-3">
              <Link
                to="/"
                className="block text-sm text-white/60 hover:text-white"
              >
                Home
              </Link>
              <Link
                to="/properties"
                className="block text-sm text-white/60 hover:text-white"
              >
                Properties
              </Link>
              <Link
                to="/about"
                className="block text-sm text-white/60 hover:text-white"
              >
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

export default function About() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description:
        "Every property is presented clearly to help users make safe and confident decisions.",
    },
    {
      icon: Heart,
      title: "User Friendly",
      description:
        "The system is designed to make searching and inquiring about accommodation simple.",
    },
    {
      icon: Globe,
      title: "Accessible Listings",
      description:
        "Users can browse different accommodation options from one easy-to-use platform.",
    },
    {
      icon: Award,
      title: "Quality Information",
      description:
        "Listings include important details such as price, location, images, and amenities.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20">
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80"
            alt="About StayFinder"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative text-center text-white px-4"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-3">
              Our Story
            </p>

            <h1 className="text-4xl md:text-5xl font-bold">
              About StayFinder
            </h1>
          </motion.div>
        </section>

        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-yellow-600 uppercase tracking-[0.2em] mb-4">
                Our Mission
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Making Accommodation Search Easier
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                StayFinder is an accommodation finder and rental inquiry
                application. It helps users search for properties, view property
                details, check prices and amenities, and submit rental
                inquiries. The purpose of this project is to provide a working
                web application that improves the property searching process.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-sm text-yellow-600 uppercase tracking-[0.2em] mb-3">
                What We Stand For
              </p>

              <h2 className="text-3xl font-bold">Our Values</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;

                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 border text-center shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-yellow-600" />
                    </div>

                    <h3 className="text-lg font-semibold mb-2">
                      {value.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}