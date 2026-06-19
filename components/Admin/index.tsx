"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  BarChart, MessageSquare, Package, FileText, LogOut, Edit, Trash2, Shield, Plus, X 
} from "lucide-react";

interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string | null;
  city: string | null;
  state: string | null;
  productId: string | null;
  inquiryType: string;
  message: string;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  longDescription: string | null;
  packaging: string | null;
  coverage: string | null;
  applicationType: string | null;
  productType: string | null;
  featuresJson: string;
  benefitsJson: string;
  specsJson: string;
  isFeatured: number;
  isActive: number;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuditLog {
  id: string;
  actorUserId: string;
  action: string;
  entityType: string;
  entityId: string;
  beforeJson: string | null;
  afterJson: string | null;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

export default function AdminConsole() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<"dashboard" | "inquiries" | "products" | "audit-logs">("dashboard");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ products: 0, categories: 0, inquiries: 0 });
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [allInquiries, setAllInquiries] = useState<Inquiry[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [auditLogsList, setAuditLogsList] = useState<AuditLog[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for creating/editing product
  const [productForm, setProductForm] = useState({
    categoryId: "cat-tile",
    name: "",
    slug: "",
    shortDescription: "",
    longDescription: "",
    packaging: "",
    coverage: "",
    applicationType: "",
    productType: "",
    features: [] as string[],
    benefits: [] as string[],
    specs: {} as Record<string, string>,
    isFeatured: false,
    isActive: true,
  });

  // Fetch admin dashboard details
  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setRecentInquiries(data.recentInquiries);
        setAuditLogsList(data.recentLogs);
      } else {
        router.push("/admin/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.success) {
        setAllInquiries(data.inquiries);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success) {
        setAllProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchDashboardData();
      await fetchInquiries();
      await fetchProducts();
      setLoading(false);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleInquiryStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchInquiries();
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProduct ? "PATCH" : "POST";
    const body = editingProduct 
      ? { ...productForm, id: editingProduct.id }
      : productForm;

    try {
      const res = await fetch("/api/admin/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setIsProductModalOpen(false);
        setEditingProduct(null);
        fetchProducts();
        fetchDashboardData();
      } else {
        alert(data.error || "Failed to save product.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleProductDelete = async (id: string) => {
    if (confirm("Are you sure you want to toggle the active status of this product?")) {
      try {
        const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          fetchProducts();
          fetchDashboardData();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openEditProductModal = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      categoryId: prod.categoryId,
      name: prod.name,
      slug: prod.slug,
      shortDescription: prod.shortDescription || "",
      longDescription: prod.longDescription || "",
      packaging: prod.packaging || "",
      coverage: prod.coverage || "",
      applicationType: prod.applicationType || "",
      productType: prod.productType || "",
      features: prod.featuresJson ? JSON.parse(prod.featuresJson) : [],
      benefits: prod.benefitsJson ? JSON.parse(prod.benefitsJson) : [],
      specs: prod.specsJson ? JSON.parse(prod.specsJson) : {},
      isFeatured: prod.isFeatured === 1,
      isActive: prod.isActive === 1,
    });
    setIsProductModalOpen(true);
  };

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      categoryId: "cat-tile",
      name: "",
      slug: "",
      shortDescription: "",
      longDescription: "",
      packaging: "",
      coverage: "",
      applicationType: "",
      productType: "",
      features: [],
      benefits: [],
      specs: {},
      isFeatured: false,
      isActive: true,
    });
    setIsProductModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-orange animate-pulse">
          Loading Admin System...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-deep text-white flex flex-col justify-between py-8 select-none border-r border-neutral-900 shrink-0">
        <div className="space-y-8 px-6">
          <Link href="/" className="flex flex-col">
            <span className="text-xl font-black tracking-widest text-white leading-none">
              ARKA<span className="text-brand-orange">CRETE</span>
            </span>
            <span className="text-[7px] font-bold text-brand-orange/80 tracking-[0.25em] uppercase">
              Supplements LLP
            </span>
          </Link>
          <nav className="flex flex-col gap-2">
            {([
              { id: "dashboard", label: "Dashboard", icon: BarChart },
              { id: "inquiries", label: "Inquiries Log", icon: MessageSquare },
              { id: "products", label: "Products CMS", icon: Package },
              { id: "audit-logs", label: "Audit Logs", icon: FileText },
            ] as const).map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all text-left ${
                  activeSection === sec.id
                    ? "bg-brand-orange text-white"
                    : "text-stone-400 hover:bg-neutral-900 hover:text-white"
                }`}
              >
                <sec.icon className="w-4 h-4 shrink-0" />
                {sec.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="px-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-stone-400 hover:bg-neutral-900 hover:text-white transition-all text-left border border-neutral-800"
          >
            <LogOut className="w-4 h-4 shrink-0 text-brand-orange" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Console Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto max-h-screen">
        {/* Header strip */}
        <header className="flex items-center justify-between pb-8 border-b border-stone-200">
          <div>
            <h1 className="text-2xl font-black text-brand-deep uppercase tracking-wider">
              {activeSection === "dashboard" && "Console Dashboard"}
              {activeSection === "inquiries" && "Customer Inquiries Log"}
              {activeSection === "products" && "Product Catalog Manager"}
              {activeSection === "audit-logs" && "System Audit Logs"}
            </h1>
            <p className="text-stone-400 text-xs mt-1">
              Welcome back, Arka Admin
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-stone-100 rounded-lg text-stone-600">
            <Shield className="w-4 h-4 text-brand-orange" />
            Admin Role Authorized
          </div>
        </header>

        <div className="mt-10">
          {/* 1. Dashboard Section */}
          {activeSection === "dashboard" && (
            <div className="space-y-8">
              {/* Aggregate Cards */}
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-stone-400 font-mono uppercase">Total Inquiries</span>
                    <p className="text-3xl font-black text-brand-deep">{stats.inquiries}</p>
                  </div>
                  <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-stone-400 font-mono uppercase">Products Catalog</span>
                    <p className="text-3xl font-black text-brand-deep">{stats.products}</p>
                  </div>
                  <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl">
                    <Package className="w-6 h-6" />
                  </div>
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-stone-400 font-mono uppercase">Product Categories</span>
                    <p className="text-3xl font-black text-brand-deep">{stats.categories}</p>
                  </div>
                  <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Recent Inquiries List */}
              <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-deep border-b border-stone-100 pb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-brand-orange" />
                  Recent Submissions
                </h3>
                {recentInquiries.length === 0 ? (
                  <p className="text-stone-400 text-xs">No customer inquiries submitted yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="text-stone-500 font-mono uppercase border-b border-stone-100">
                        <tr>
                          <th className="py-2.5">Date</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Type</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-stone-600">
                        {recentInquiries.map((inq) => (
                          <tr key={inq.id} className="hover:bg-stone-50/50">
                            <td className="py-3 font-mono">{new Date(inq.createdAt).toLocaleDateString()}</td>
                            <td className="font-semibold text-brand-deep">{inq.fullName}</td>
                            <td>{inq.email}</td>
                            <td className="capitalize font-medium text-brand-brown">{inq.inquiryType}</td>
                            <td>
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                                inq.status === "new" ? "bg-amber-100 text-amber-600" :
                                inq.status === "contacted" ? "bg-blue-100 text-blue-600" :
                                "bg-emerald-100 text-emerald-600"
                              }`}>
                                {inq.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. Inquiries Log Section */}
          {activeSection === "inquiries" && (
            <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 text-stone-600 font-mono uppercase border-b border-stone-100">
                    <tr>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Inquirer Details</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Message</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {allInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-stone-50/50 align-top">
                        <td className="px-4 py-4 font-mono whitespace-nowrap">{new Date(inq.createdAt).toLocaleString()}</td>
                        <td className="px-4 py-4 space-y-1">
                          <p className="font-bold text-brand-deep">{inq.fullName}</p>
                          <p className="text-stone-400">{inq.email}</p>
                          <p className="text-stone-400">{inq.phone}</p>
                          <p className="text-stone-400">{inq.companyName || "No Company"}, {inq.city || "No City"}</p>
                        </td>
                        <td className="px-4 py-4 uppercase font-bold text-brand-brown text-[10px] whitespace-nowrap">
                          {inq.inquiryType}
                        </td>
                        <td className="px-4 py-4 text-stone-500 max-w-sm whitespace-pre-wrap">{inq.message}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <select
                            value={inq.status}
                            onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value)}
                            className="bg-stone-50 border border-stone-200 rounded p-1 text-[11px] font-semibold text-brand-deep focus:outline-none"
                          >
                            <option value="new">New Submission</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed / Solved</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. Products CMS Section */}
          {activeSection === "products" && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button
                  onClick={openNewProductModal}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-orange text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-brand-orange/90 shadow-md shadow-brand-orange/10"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-stone-50 text-stone-600 font-mono uppercase border-b border-stone-100">
                      <tr>
                        <th className="px-4 py-3">Product Name</th>
                        <th className="px-4 py-3">Slug</th>
                        <th className="px-4 py-3">Packaging</th>
                        <th className="px-4 py-3">Featured</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-700">
                      {allProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-stone-50/50">
                          <td className="px-4 py-3.5 font-bold text-brand-deep">{prod.name}</td>
                          <td className="px-4 py-3.5 font-mono text-stone-400">{prod.slug}</td>
                          <td className="px-4 py-3.5">{prod.packaging || "Std Pack"}</td>
                          <td className="px-4 py-3.5">
                            {prod.isFeatured === 1 ? (
                              <span className="text-emerald-600 font-bold uppercase text-[9px]">Yes</span>
                            ) : (
                              <span className="text-stone-400 uppercase text-[9px]">No</span>
                            )}
                          </td>
                          <td className="px-4 py-3.5">
                            <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-semibold uppercase ${
                              prod.isActive === 1 ? "bg-emerald-100 text-emerald-600" : "bg-stone-100 text-stone-500"
                            }`}>
                              {prod.isActive === 1 ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => openEditProductModal(prod)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-stone-200 rounded-lg hover:bg-stone-50 text-stone-600 focus:outline-none"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleProductDelete(prod.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-stone-200 rounded-lg hover:bg-rose-50 text-rose-600 focus:outline-none"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              {prod.isActive === 1 ? "Deactivate" : "Activate"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 4. Audit Logs Section */}
          {activeSection === "audit-logs" && (
            <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-6">
              {auditLogsList.length === 0 ? (
                <p className="text-stone-400 text-xs">No system action logs recorded yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-stone-50 text-stone-600 font-mono uppercase border-b border-stone-100">
                      <tr>
                        <th className="px-4 py-3">Timestamp</th>
                        <th className="px-4 py-3">Action</th>
                        <th className="px-4 py-3">User</th>
                        <th className="px-4 py-3">IP Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-700">
                      {auditLogsList.map((log) => (
                        <tr key={log.id} className="hover:bg-stone-50/50">
                          <td className="px-4 py-3.5 font-mono">{new Date(log.createdAt).toLocaleString()}</td>
                          <td className="px-4 py-3.5 font-bold text-brand-deep capitalize">{log.action.replace("_", " ")}</td>
                          <td className="px-4 py-3.5 font-semibold text-brand-brown">User ID: {log.actorUserId}</td>
                          <td className="px-4 py-3.5 font-mono text-stone-400">{log.ipAddress}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Product CMS modal (Full editor) */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 select-none">
          <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <header className="flex justify-between items-center px-8 py-5 border-b border-stone-100">
              <h3 className="text-base font-bold text-brand-deep uppercase tracking-wider">
                {editingProduct ? `Edit ${editingProduct.name}` : "Add New Product"}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-stone-400 hover:text-brand-orange focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>
            </header>

            <form onSubmit={handleProductSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Product Category</label>
                  <select
                    value={productForm.categoryId}
                    onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-brand-orange/50"
                  >
                    <option value="cat-tile">Tile Adhesives</option>
                    <option value="cat-block">Block Joining</option>
                    <option value="cat-grout">Grouts & Anchoring</option>
                    <option value="cat-repair">Repair Products</option>
                    <option value="cat-waterproof">Waterproofing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-brand-orange/50"
                    placeholder="Tile Grip Advanced"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Slug URL Path</label>
                  <input
                    type="text"
                    required
                    value={productForm.slug}
                    onChange={(e) => setProductForm({ ...productForm, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-brand-orange/50"
                    placeholder="tile-grip-advanced"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Packaging Available</label>
                  <input
                    type="text"
                    value={productForm.packaging}
                    onChange={(e) => setProductForm({ ...productForm, packaging: e.target.value })}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-brand-orange/50"
                    placeholder="20 Kg bag"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Coverage Parameters</label>
                  <input
                    type="text"
                    value={productForm.coverage}
                    onChange={(e) => setProductForm({ ...productForm, coverage: e.target.value })}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-brand-orange/50"
                    placeholder="40-50 sq ft per bag"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Application Type</label>
                  <input
                    type="text"
                    value={productForm.applicationType}
                    onChange={(e) => setProductForm({ ...productForm, applicationType: e.target.value })}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-brand-orange/50"
                    placeholder="Tile fixing / Masonry"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Short Description</label>
                  <input
                    type="text"
                    value={productForm.shortDescription}
                    onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-brand-orange/50"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Detailed Description</label>
                  <textarea
                    rows={4}
                    value={productForm.longDescription}
                    onChange={(e) => setProductForm({ ...productForm, longDescription: e.target.value })}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-brand-orange/50"
                  />
                </div>
                <div className="flex items-center gap-6 pt-2 sm:col-span-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-stone-600 select-none">
                    <input
                      type="checkbox"
                      checked={productForm.isFeatured}
                      onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                      className="rounded text-brand-orange focus:ring-brand-orange h-4 w-4"
                    />
                    Featured Product
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-stone-600 select-none">
                    <input
                      type="checkbox"
                      checked={productForm.isActive}
                      onChange={(e) => setProductForm({ ...productForm, isActive: e.target.checked })}
                      className="rounded text-brand-orange focus:ring-brand-orange h-4 w-4"
                    />
                    Active / Published
                  </label>
                </div>
              </div>

              <footer className="pt-6 border-t border-stone-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 border border-stone-250 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-stone-50 text-stone-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-orange text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-brand-orange/90 shadow-md shadow-brand-orange/10"
                >
                  Save Product
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
