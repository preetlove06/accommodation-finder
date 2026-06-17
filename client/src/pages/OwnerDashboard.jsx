import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Loader2,
  Search,
  LayoutList,
  Inbox,
  Home,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Mail,
  Phone,
  Users,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Building2,
  ChevronRight,
  MapPin,
  BedDouble,
  Bath,
  DollarSign,
  Menu,
  X,
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
        <p className="text-center text-xs text-white/40">
          © {new Date().getFullYear()} StayFinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

const inquiryStatusConfig = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-green-100 text-green-700", icon: CheckCircle },
  declined: { label: "Declined", color: "bg-red-100 text-red-700", icon: XCircle },
};

const submissionStatusConfig = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700", icon: Clock },
  approved: { label: "Approved", color: "bg-green-100 text-green-700", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700", icon: XCircle },
};

function DashboardStats({ inquiries }) {
  const stats = [
    { label: "Total", value: inquiries.length, icon: Inbox },
    { label: "Pending", value: inquiries.filter((i) => i.status === "pending").length, icon: Clock },
    { label: "Confirmed", value: inquiries.filter((i) => i.status === "confirmed").length, icon: CheckCircle },
    { label: "Declined", value: inquiries.filter((i) => i.status === "declined").length, icon: XCircle },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="bg-white rounded-2xl border p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Icon className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function InquiryCard({ inquiry, refreshData }) {
  const [expanded, setExpanded] = useState(false);

  const updateInquiryStatus = async (status) => {
    try {
      await axios.put(`${API_URL}/api/inquiries/${inquiry._id}`, { status });
      refreshData();
    } catch (error) {
      alert("Failed to update inquiry");
    }
  };

  const status = inquiryStatusConfig[inquiry.status] || inquiryStatusConfig.pending;
  const StatusIcon = status.icon;

  return (
    <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
      <div className="flex items-start justify-between p-5 gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-semibold">{inquiry.guest_name}</span>
            <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${status.color}`}>
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </span>
          </div>
          <p className="text-sm text-gray-500">{inquiry.property_title}</p>
        </div>

        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <div className="px-5 pb-4 flex flex-wrap gap-4">
        {inquiry.check_in && inquiry.check_out && (
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-yellow-600" />
            {new Date(inquiry.check_in).toLocaleDateString()} →{" "}
            {new Date(inquiry.check_out).toLocaleDateString()}
          </div>
        )}

        {inquiry.guests_count && (
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Users className="w-4 h-4 text-yellow-600" />
            {inquiry.guests_count} guest(s)
          </div>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t pt-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href={`mailto:${inquiry.guest_email}`} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100">
                  <Mail className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm truncate">{inquiry.guest_email}</span>
                </a>

                {inquiry.guest_phone && (
                  <a href={`tel:${inquiry.guest_phone}`} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100">
                    <Phone className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">{inquiry.guest_phone}</span>
                  </a>
                )}
              </div>

              {inquiry.message && (
                <div className="flex gap-2 px-4 py-3 rounded-xl bg-gray-100">
                  <MessageSquare className="w-4 h-4 text-yellow-600" />
                  <p className="text-sm text-gray-600">{inquiry.message}</p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => updateInquiryStatus("confirmed")}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-xl"
                >
                  Confirm
                </button>
                <button
                  onClick={() => updateInquiryStatus("declined")}
                  className="flex-1 border border-red-300 text-red-600 px-4 py-2 rounded-xl"
                >
                  Decline
                </button>
                <button
                  onClick={() => updateInquiryStatus("pending")}
                  className="flex-1 border px-4 py-2 rounded-xl"
                >
                  Pending
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SubmissionCard({ sub, refreshData }) {
  const [expanded, setExpanded] = useState(false);

  const updateSubmissionStatus = async (status) => {
    try {
      await axios.put(`${API_URL}/api/submissions/${sub._id}`, { status });
      refreshData();
    } catch (error) {
      alert("Failed to update submission");
    }
  };

  const approveAndPublish = async () => {
    try {
      await axios.post(`${API_URL}/api/properties`, {
        title: sub.title,
        description: sub.description,
        property_type: sub.property_type,
        price_per_night: sub.price_per_night,
        location: sub.location,
        address: sub.address,
        bedrooms: sub.bedrooms,
        bathrooms: sub.bathrooms,
        max_guests: sub.max_guests,
        amenities: sub.amenities
          ? sub.amenities.split(",").map((a) => a.trim()).filter(Boolean)
          : [],
        images: sub.image_url ? [sub.image_url] : [],
        status: "available",
        is_featured: false,
      });

      await axios.put(`${API_URL}/api/submissions/${sub._id}`, {
        status: "approved",
      });

      refreshData();
    } catch (error) {
      alert("Failed to approve and publish property");
    }
  };

  const status = submissionStatusConfig[sub.status] || submissionStatusConfig.pending;
  const Icon = status.icon;

  return (
    <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
      <div className="flex items-start justify-between p-5 gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-semibold">{sub.title}</span>
            <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${status.color}`}>
              <Icon className="w-3 h-3" />
              {status.label}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {sub.location}
            </span>
            <span className="capitalize">{sub.property_type}</span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              ${sub.price_per_night}/night
            </span>
          </div>
        </div>

        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t pt-4 space-y-4">
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {sub.bedrooms && <span className="flex items-center gap-1"><BedDouble className="w-4 h-4 text-yellow-600" />{sub.bedrooms} bed</span>}
                {sub.bathrooms && <span className="flex items-center gap-1"><Bath className="w-4 h-4 text-yellow-600" />{sub.bathrooms} bath</span>}
                {sub.max_guests && <span className="flex items-center gap-1"><Users className="w-4 h-4 text-yellow-600" />{sub.max_guests} guests</span>}
              </div>

              {sub.description && <p className="text-sm text-gray-600">{sub.description}</p>}

              {sub.amenities && (
                <p className="text-xs text-gray-600">
                  <strong>Amenities:</strong> {sub.amenities}
                </p>
              )}

              {sub.image_url && (
                <img src={sub.image_url} alt="" className="w-full h-40 object-cover rounded-xl border" />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="px-4 py-3 rounded-xl bg-gray-100 text-sm">
                  <p className="font-medium">{sub.owner_name}</p>
                  <a href={`mailto:${sub.owner_email}`} className="text-xs text-gray-600">
                    {sub.owner_email}
                  </a>
                </div>

                {sub.owner_phone && (
                  <a href={`tel:${sub.owner_phone}`} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100">
                    <Phone className="w-4 h-4 text-yellow-600" />
                    {sub.owner_phone}
                  </a>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={approveAndPublish}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-xl"
                >
                  Approve & Publish
                </button>

                <button
                  onClick={() => updateSubmissionStatus("rejected")}
                  className="flex-1 border border-red-300 text-red-600 px-4 py-2 rounded-xl"
                >
                  Reject
                </button>

                <button
                  onClick={() => updateSubmissionStatus("pending")}
                  className="flex-1 border px-4 py-2 rounded-xl"
                >
                  Pending
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("inquiries");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openGroups, setOpenGroups] = useState({});

  const [inquiries, setInquiries] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [inqRes, subRes, propRes] = await Promise.all([
        axios.get(`${API_URL}/api/inquiries`),
        axios.get(`${API_URL}/api/submissions`),
        axios.get(`${API_URL}/api/properties`),
      ]);

      setInquiries(inqRes.data);
      setSubmissions(subRes.data);
      setProperties(propRes.data);
    } catch (error) {
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const propertyMap = useMemo(() => {
    const map = {};
    properties.forEach((p) => {
      map[p._id] = p.title;
    });
    return map;
  }, [properties]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchStatus = statusFilter === "all" || inq.status === statusFilter;
      const q = searchQuery.toLowerCase();

      const matchSearch =
        !q ||
        inq.guest_name?.toLowerCase().includes(q) ||
        inq.guest_email?.toLowerCase().includes(q) ||
        inq.property_title?.toLowerCase().includes(q);

      return matchStatus && matchSearch;
    });
  }, [inquiries, statusFilter, searchQuery]);

  const grouped = useMemo(() => {
    const groups = {};

    filteredInquiries.forEach((inq) => {
      const key = inq.property_id || "unknown";

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(inq);
    });

    return groups;
  }, [filteredInquiries]);

  const toggleGroup = (key) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isGroupOpen = (key) => openGroups[key] !== false;

  const pendingSubmissions = submissions.filter((s) => s.status === "pending").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 md:pt-24 pb-24">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-yellow-100 flex items-center justify-center">
                <LayoutList className="w-5 h-5 text-yellow-600" />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold">
                Owner Dashboard
              </h1>
            </div>

            <p className="text-gray-600 text-sm ml-12">
              Manage rental inquiries and review property submissions
            </p>
          </div>

          {!loading && <DashboardStats inquiries={inquiries} />}

          <div className="flex gap-1 bg-gray-200 rounded-xl p-1 mt-6 mb-6 w-fit">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-5 py-2 rounded-lg text-sm font-medium ${
                activeTab === "inquiries"
                  ? "bg-white shadow-sm text-black"
                  : "text-gray-600"
              }`}
            >
              Rental Inquiries
            </button>

            <button
              onClick={() => setActiveTab("submissions")}
              className={`px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 ${
                activeTab === "submissions"
                  ? "bg-white shadow-sm text-black"
                  : "text-gray-600"
              }`}
            >
              <Home className="w-4 h-4" />
              Property Submissions
              {pendingSubmissions > 0 && (
                <span className="bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {pendingSubmissions}
                </span>
              )}
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
            </div>
          ) : activeTab === "submissions" ? (
            <div className="space-y-4">
              {submissions.length === 0 ? (
                <div className="text-center py-16">
                  <Inbox className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="font-semibold">No submissions yet</p>
                  <p className="text-sm text-gray-600">
                    Property submissions will appear here.
                  </p>
                </div>
              ) : (
                submissions.map((sub) => (
                  <SubmissionCard
                    key={sub._id}
                    sub={sub}
                    refreshData={fetchDashboardData}
                  />
                ))
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

                  <input
                    placeholder="Search by guest name, email or property..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border rounded-lg pl-9 pr-3 py-2"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border rounded-lg px-3 py-2 bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="declined">Declined</option>
                </select>
              </div>

              {filteredInquiries.length === 0 ? (
                <div className="text-center py-24">
                  <Inbox className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="font-semibold text-lg mb-1">
                    No inquiries found
                  </p>
                  <p className="text-sm text-gray-600">
                    Inquiries from guests will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(grouped).map(([propId, propInquiries]) => {
                    const propTitle =
                      propInquiries[0]?.property_title ||
                      propertyMap[propId] ||
                      "Unknown Property";

                    const open = isGroupOpen(propId);

                    return (
                      <div
                        key={propId}
                        className="bg-gray-100 rounded-2xl border px-5 pt-2 pb-4"
                      >
                        <button
                          onClick={() => toggleGroup(propId)}
                          className="w-full flex items-center gap-3 py-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-yellow-600" />
                          </div>

                          <span className="font-semibold flex-1 text-left">
                            {propTitle}
                          </span>

                          <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full">
                            {propInquiries.length}
                          </span>

                          {open ? (
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                          )}
                        </button>

                        <AnimatePresence>
                          {open && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-3 pt-2">
                                {propInquiries.map((inq) => (
                                  <InquiryCard
                                    key={inq._id}
                                    inquiry={inq}
                                    refreshData={fetchDashboardData}
                                  />
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}