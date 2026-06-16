import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Loader2,
  MapPin,
  BedDouble,
  Bath,
  Users,
  Star,
  Search,
  SlidersHorizontal,
  X,
  Home,
  Mail,
  Phone,
  Menu,
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
              <Link
                to="/properties"
                className="block text-sm text-white/60 hover:text-white"
              >
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

function PropertyCard({ property, index = 0 }) {
  const mainImage =
    property.images?.length > 0
      ? property.images[0]
      : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80";

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

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

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
            <h3 className="text-lg font-semibold mb-2 line-clamp-1">
              {property.title}
            </h3>

            <div className="flex items-center gap-1.5 text-gray-600 mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{property.location}</span>

              {property.rating && (
                <>
                  <span>•</span>
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm text-black">{property.rating}</span>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
              {property.bedrooms && (
                <div className="flex items-center gap-1">
                  <BedDouble className="w-4 h-4" />
                  <span>{property.bedrooms} beds</span>
                </div>
              )}

              {property.bathrooms && (
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  <span>{property.bathrooms} baths</span>
                </div>
              )}

              {property.max_guests && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{property.max_guests} guests</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SearchFilters({ filters, onFilterChange, onClear }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-yellow-600" />
          <h3 className="font-semibold text-sm">Filters</h3>
        </div>

        <button
          onClick={onClear}
          className="text-xs text-gray-500 hover:text-black flex items-center gap-1"
        >
          <X className="w-3 h-3" />
          Clear
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-xs font-medium text-gray-600 mb-2 block">
            Search
          </label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

            <input
              placeholder="Search properties..."
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
              className="w-full border rounded-lg pl-9 pr-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 mb-2 block">
            Location
          </label>

          <input
            placeholder="City or area..."
            value={filters.location}
            onChange={(e) => onFilterChange("location", e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 mb-2 block">
            Property Type
          </label>

          <select
            value={filters.type}
            onChange={(e) => onFilterChange("type", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 bg-white"
          >
            <option value="all">All Types</option>
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
          <label className="text-xs font-medium text-gray-600 mb-2 block">
            Max Price: ${filters.maxPrice}/night
          </label>

          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange("maxPrice", Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 mb-2 block">
            Bedrooms
          </label>

          <select
            value={filters.bedrooms}
            onChange={(e) => onFilterChange("bedrooms", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 bg-white"
          >
            <option value="any">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default function Properties() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialSearch = urlParams.get("search") || "";

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: initialSearch,
    location: "",
    type: "all",
    maxPrice: 1000,
    bedrooms: "any",
  });

  useEffect(() => {
  const fetchProperties = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;

      console.log("API URL:", API_URL);

      const res = await axios.get(
        `${API_URL}/api/properties`
      );

      console.log("Properties:", res.data);

      setProperties(res.data);
    } catch (error) {
      console.error("Property fetch error:", error);
      alert("Failed to load properties");
    } finally {
      setIsLoading(false);
    }
  };

  fetchProperties();
}, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      type: "all",
      maxPrice: 1000,
      bedrooms: "any",
    });
  };

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const searchText = filters.search.toLowerCase();
      const locationText = filters.location.toLowerCase();

      const searchMatch =
        !filters.search ||
        p.title?.toLowerCase().includes(searchText) ||
        p.location?.toLowerCase().includes(searchText) ||
        p.description?.toLowerCase().includes(searchText);

      const locationMatch =
        !filters.location ||
        p.location?.toLowerCase().includes(locationText);

      const typeMatch =
        filters.type === "all" || p.property_type === filters.type;

      const priceMatch =
        !p.price_per_night || p.price_per_night <= filters.maxPrice;

      const bedroomMatch =
        filters.bedrooms === "any" ||
        (p.bedrooms && p.bedrooms >= Number(filters.bedrooms));

      return (
        searchMatch &&
        locationMatch &&
        typeMatch &&
        priceMatch &&
        bedroomMatch
      );
    });
  }, [properties, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 md:pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Browse Properties
            </h1>

            <p className="text-gray-600">
              {filteredProperties.length} properties available
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-72 shrink-0">
              <div className="lg:sticky lg:top-28">
                <SearchFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClear={clearFilters}
                />
              </div>
            </div>

            <div className="flex-1">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg mb-4">
                    No properties found
                  </p>

                  <button
                    onClick={clearFilters}
                    className="border px-5 py-2 rounded-lg hover:bg-white"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property, index) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}