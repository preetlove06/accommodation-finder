import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Search,
  MapPin,
  ArrowRight,
  Building2,
  Users,
  Star,
  BedDouble,
  Bath,
  Loader2,
  Home,
  Mail,
  Phone,
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
              Find your perfect stay. Browse properties, view details, and send
              rental inquiries through one easy platform.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase text-white/40">
              Quick Links
            </h4>

            <div className="space-y-3">
              <Link to="/" className="block text-sm text-white/60 hover:text-white">
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
            <h4 className="font-semibold text-sm mb-4 uppercase text-white/40">
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

function PropertyCard({ property, index }) {
  const mainImage =
    property.images?.[0] ||
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Link to={`/properties/${property._id}`} className="group block">
        <div className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition hover:-translate-y-1">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={mainImage}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />

            <div className="absolute top-4 left-4">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs capitalize">
                {property.property_type}
              </span>
            </div>

            {property.is_featured && (
              <div className="absolute top-4 right-4">
                <span className="bg-black text-white px-3 py-1 rounded-full text-xs">
                  Featured
                </span>
              </div>
            )}

            <div className="absolute bottom-4 left-4">
              <p className="text-white text-2xl font-bold">
                ${property.price_per_night}
                <span className="text-sm font-normal">/night</span>
              </p>
            </div>
          </div>

          <div className="p-5">
            <h3 className="text-lg font-semibold mb-2">{property.title}</h3>

            <div className="flex items-center gap-1.5 text-gray-600 mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{property.location}</span>

              {property.rating && (
                <>
                  <span>•</span>
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-black">{property.rating}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 text-gray-600 text-sm">
              {property.bedrooms && (
                <div className="flex items-center gap-1">
                  <BedDouble className="w-4 h-4" />
                  {property.bedrooms} beds
                </div>
              )}

              {property.bathrooms && (
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  {property.bathrooms} baths
                </div>
              )}

              {property.max_guests && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {property.max_guests} guests
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [displayProperties, setDisplayProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/properties");
        setDisplayProperties(res.data.slice(0, 6));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
  };

  const stats = [
    { icon: Building2, value: "50+", label: "Properties" },
    { icon: Users, value: "100+", label: "Users" },
    { icon: MapPin, value: "10+", label: "Locations" },
    { icon: Star, value: "4.8", label: "Rating" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

<section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
      alt="Beautiful property"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/55" />
  </div>

  <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
    <p className="text-sm md:text-base text-white/80 uppercase tracking-[0.35em] mb-6">
      Find Your Perfect Stay
    </p>

    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
      Discover Extraordinary
      <br />
      <span className="text-yellow-500">Accommodations</span>
    </h1>

    <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
      From cozy retreats to luxury estates, find the perfect place to call home
      during your next adventure.
    </p>

    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto justify-center"
    >
      <div className="relative flex-1">
        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />

        <input
          placeholder="Where are you going?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-16 pl-14 pr-4 rounded-2xl bg-white/95 text-lg text-gray-800 placeholder:text-gray-500 shadow-xl outline-none"
        />
      </div>

      <button
        type="submit"
        className="h-16 px-10 rounded-2xl bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-semibold shadow-xl flex items-center justify-center gap-3"
      >
        <Search className="w-6 h-6" />
        Search
      </button>
    </form>

    <div className="flex flex-wrap justify-center gap-8 mt-12">
      {["New York", "Paris", "Tokyo", "London"].map((city) => (
        <button
          key={city}
          onClick={() =>
            navigate(`/properties?search=${encodeURIComponent(city)}`)
          }
          className="text-white/70 hover:text-white text-lg flex items-center gap-2"
        >
          <MapPin className="w-5 h-5" />
          {city}
        </button>
      ))}
    </div>
  </div>
</section>
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.label} className="text-center">
                <Icon className="w-7 h-7 mx-auto mb-3 text-yellow-500" />
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}