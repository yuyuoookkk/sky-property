"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, Save, MapPin, ArrowLeft,
  Layers, Eye, Tag, ChevronDown, Check, AlertCircle,
  LayoutDashboard, Image as ImageIcon, Upload, FileArchive, Lock
} from "lucide-react";
import type { Property } from "../data/listings";

type FormData = Omit<Property, "id"> & { id?: number };

const EMPTY_FORM: FormData = {
  slug: "", type: "lease", title: "", location: "", price: "",
  images: [], description: "", details: [], landArea: "",
  zoning: "", leaseTerm: "", minRental: "", access: "", view: "",
  status: "", frontage: "",
};

export default function DashboardPage() {
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>({ ...EMPTY_FORM });
  const [imagesText, setImagesText] = useState("");
  const [detailsText, setDetailsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<"all" | "lease" | "sale">("all");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [singleImageUploading, setSingleImageUploading] = useState(false);

  const fetchListings = async () => {
    try {
      const res = await fetch("/api/listings");
      const data = await res.json();
      if (Array.isArray(data)) setListings(data);
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { fetchListings(); }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const showToast = (msg: string, type: "success" | "error" = "success") => setToast({ msg, type });

  const openAdd = () => {
    setForm({ ...EMPTY_FORM });
    setImagesText("");
    setDetailsText("");
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (p: Property) => {
    setForm({ ...p });
    setImagesText(p.images.join("\n"));
    setDetailsText(p.details.join("\n"));
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.location || !form.price || !form.landArea) {
      showToast("Please fill in required fields (Title, Location, Price, Land Area)", "error");
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      images: imagesText.split("\n").map(s => s.trim()).filter(Boolean),
      details: detailsText.split("\n").map(s => s.trim()).filter(Boolean),
    };
    try {
      const method = editingId ? "PUT" : "POST";
      if (editingId) payload.id = editingId;
      const res = await fetch("/api/listings", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error();
      showToast(editingId ? "Listing updated!" : "Listing created!");
      setShowForm(false);
      fetchListings();
    } catch {
      showToast("Failed to save listing", "error");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/listings?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("Listing deleted");
      setDeleteConfirm(null);
      fetchListings();
    } catch { showToast("Failed to delete", "error"); }
  };

  const updateField = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleZipUpload = async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".zip")) {
      showToast("Please upload a .zip file", "error");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setForm(f => ({
        ...f,
        title: data.title || f.title,
        slug: data.slug || f.slug,
        type: data.type || f.type,
        location: data.location || f.location,
        price: data.price || f.price,
        description: data.description || f.description,
        landArea: data.landArea || f.landArea,
        zoning: data.zoning || f.zoning,
        leaseTerm: data.leaseTerm || f.leaseTerm,
        minRental: data.minRental || f.minRental,
        access: data.access || f.access,
        view: data.view || f.view,
        status: data.status || f.status,
        frontage: data.frontage || f.frontage,
      }));
      if (data.images?.length) setImagesText(data.images.join("\n"));
      if (data.details?.length) setDetailsText(data.details.join("\n"));
      showToast(`Extracted ${data.images?.length || 0} images from ZIP`);
    } catch {
      showToast("Failed to process ZIP file", "error");
    } finally { setUploading(false); }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleZipUpload(file);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded password for now. Can be moved to env variable.
    if (passwordInput === "skyadmin2026") {
      setIsAuthenticated(true);
    } else {
      showToast("Incorrect password", "error");
    }
  };

  const handleSingleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("Please upload an image file", "error");
      return;
    }
    setSingleImageUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      // Since we need to save the file, we can use a new API endpoint or modify existing
      // For now, let's use the same upload endpoint but just save the single image
      // We will need to create a new API route for single image upload or modify the ZIP one.
      // Let's assume we create /api/upload-image
      const res = await fetch("/api/upload-image", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      
      // Append the new image URL to the images list
      const newImagesText = imagesText ? `${imagesText}\n${data.imageUrl}` : data.imageUrl;
      setImagesText(newImagesText);
      showToast("Image uploaded successfully");
    } catch (e) {
      showToast("Failed to upload image", "error");
    } finally {
      setSingleImageUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center text-[#E8E4DD] p-4">
        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className={`fixed top-6 right-6 z-[100] px-5 py-3 rounded-xl text-sm font-medium shadow-2xl flex items-center gap-2 ${toast.type === "success" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"}`}>
              {toast.type === "success" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C85A32] to-[#E8744A] flex items-center justify-center mb-6">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-light mb-2">Admin Dashboard</h1>
          <p className="text-sm text-[#666] mb-8 text-center">Please enter the password to access the property manager.</p>
          
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-[#111] border border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-[#E8E4DD] placeholder:text-[#444] focus:outline-none focus:border-[#C85A32]/50 transition-colors"
                autoFocus
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-[#C85A32] hover:bg-[#AF4C27] text-white text-xs uppercase tracking-widest py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C85A32]/20"
            >
              Unlock Dashboard
            </button>
          </form>
          <a href="/" className="mt-6 flex items-center gap-2 text-[#666] hover:text-[#E8E4DD] transition-colors text-xs uppercase tracking-widest">
            <ArrowLeft className="w-3 h-3" /> Back to Site
          </a>
        </div>
      </div>
    );
  }

  const filtered = filterType === "all" ? listings : listings.filter(l => l.type === filterType);
  const leaseCount = listings.filter(l => l.type === "lease").length;
  const saleCount = listings.filter(l => l.type === "sale").length;

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#E8E4DD] font-sans">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-[100] px-5 py-3 rounded-xl text-sm font-medium shadow-2xl flex items-center gap-2 ${toast.type === "success" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"}`}>
            {toast.type === "success" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm !== null && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteConfirm(null)} className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[80] flex items-center justify-center p-4 pointer-events-none">
              <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 max-w-sm w-full pointer-events-auto shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center"><AlertCircle className="w-5 h-5 text-red-400" /></div>
                  <div><h4 className="font-semibold text-[#E8E4DD]">Delete Listing</h4><p className="text-xs text-[#666]">This action cannot be undone</p></div>
                </div>
                <p className="text-sm text-[#888] mb-6">Are you sure you want to permanently delete &ldquo;{listings.find(l => l.id === deleteConfirm)?.title}&rdquo;?</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-[#2A2A2A] text-sm text-[#888] hover:text-[#E8E4DD] hover:border-[#444] transition-all">Cancel</button>
                  <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 text-sm font-medium transition-all">Delete</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0F0F0F]/90 backdrop-blur-xl border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-[#666] hover:text-[#E8E4DD] transition-colors text-xs uppercase tracking-widest">
              <ArrowLeft className="w-3.5 h-3.5" /> Site
            </a>
            <div className="w-px h-5 bg-[#2A2A2A]" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#C85A32] to-[#E8744A] flex items-center justify-center"><LayoutDashboard className="w-3.5 h-3.5 text-white" /></div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">Dashboard</span>
            </div>
          </div>
          <button onClick={openAdd}
            className="bg-[#C85A32] hover:bg-[#AF4C27] text-white text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-[#C85A32]/20">
            <Plus className="w-4 h-4" /> Add Listing
          </button>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Listings", value: listings.length, color: "from-[#C85A32]/20 to-[#C85A32]/5", border: "border-[#C85A32]/20" },
            { label: "Leasehold", value: leaseCount, color: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/20" },
            { label: "For Sale", value: saleCount, color: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/20" },
          ].map(s => (
            <div key={s.label} className={`bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl p-5`}>
              <p className="text-[10px] uppercase tracking-widest text-[#888] mb-1">{s.label}</p>
              <p className="text-3xl font-light">{String(s.value).padStart(2, "0")}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {(["all", "lease", "sale"] as const).map(t => (
              <button key={t} onClick={() => setFilterType(t)}
                className={`text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg border transition-all font-semibold ${filterType === t ? "bg-[#E8E4DD] text-[#0F0F0F] border-[#E8E4DD]" : "border-[#2A2A2A] text-[#666] hover:text-[#E8E4DD] hover:border-[#444]"}`}>
                {t === "all" ? "All" : t === "lease" ? "Leasehold" : "For Sale"}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#666]">{filtered.length} listing{filtered.length !== 1 ? "s" : ""}</p>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#C85A32] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Layers className="w-12 h-12 text-[#333] mx-auto mb-4" />
            <p className="text-[#666] text-sm">No listings found</p>
            <button onClick={openAdd} className="mt-4 text-[#C85A32] text-xs uppercase tracking-widest hover:underline">Add your first listing</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filtered.map(p => (
                <motion.div key={p.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden group hover:border-[#3A3A3A] transition-all">
                  {/* Thumbnail */}
                  <div className="aspect-[16/10] bg-[#111] relative overflow-hidden">
                    {p.images[0] ? (
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&auto=format&fit=crop"; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-8 h-8 text-[#333]" /></div>
                    )}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md font-semibold backdrop-blur-sm ${p.type === "lease" ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"}`}>
                        {p.type === "lease" ? "Leasehold" : "For Sale"}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-md px-2 py-1">
                      <ImageIcon className="w-3 h-3 text-[#888]" />
                      <span className="text-[10px] text-[#888]">{p.images.length}</span>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-sm text-[#E8E4DD] mb-1 truncate">{p.title}</h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#666]"><MapPin className="w-3 h-3" />{p.location}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#C85A32]">{p.price}</span>
                      <span className="text-[10px] text-[#555]">{p.landArea}</span>
                    </div>
                    <div className="h-px bg-[#2A2A2A]" />
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest py-2 rounded-lg border border-[#2A2A2A] text-[#888] hover:text-[#E8E4DD] hover:border-[#444] transition-all font-semibold">
                        <Pencil className="w-3 h-3" /> Edit
                      </button>
                      <button onClick={() => setDeleteConfirm(p.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest py-2 rounded-lg border border-red-500/20 text-red-400/60 hover:text-red-300 hover:border-red-500/40 hover:bg-red-500/5 transition-all font-semibold">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowForm(false)} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-2xl bg-[#131313] border-l border-[#2A2A2A] overflow-y-auto">
              {/* Form Header */}
              <div className="sticky top-0 z-10 bg-[#131313]/95 backdrop-blur-xl border-b border-[#2A2A2A] px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#C85A32] font-semibold">{editingId ? "Edit Listing" : "New Listing"}</p>
                  <h3 className="text-lg font-light text-[#E8E4DD] mt-0.5">{editingId ? form.title || "Untitled" : "Add Property Listing"}</h3>
                </div>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg border border-[#2A2A2A] flex items-center justify-center text-[#666] hover:text-[#E8E4DD] hover:border-[#444] transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* ZIP Upload Drop Zone */}
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all ${dragOver ? "border-[#C85A32] bg-[#C85A32]/5" : "border-[#2A2A2A] hover:border-[#444]"}`}
                >
                  {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-2 border-[#C85A32] border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs text-[#888]">Processing ZIP file...</p>
                    </div>
                  ) : (
                    <>
                      <FileArchive className="w-8 h-8 text-[#444] mx-auto mb-2" />
                      <p className="text-xs text-[#888] mb-1">Drag & drop a <span className="text-[#C85A32] font-semibold">.zip</span> file here to auto-fill</p>
                      <p className="text-[10px] text-[#555] mb-3">Images extracted automatically • Include info.json for full auto-fill</p>
                      <label className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg border border-[#2A2A2A] text-[#888] hover:text-[#E8E4DD] hover:border-[#444] transition-all cursor-pointer font-semibold">
                        <Upload className="w-3.5 h-3.5" /> Browse ZIP
                        <input type="file" accept=".zip" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleZipUpload(f); e.target.value = ""; }} />
                      </label>
                    </>
                  )}
                </div>

                {/* Type Toggle */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#666] font-semibold mb-2 block">Property Type *</label>
                  <div className="flex gap-2">
                    {(["lease", "sale"] as const).map(t => (
                      <button key={t} onClick={() => updateField("type", t)}
                        className={`flex-1 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold border transition-all ${form.type === t ? "bg-[#C85A32] text-white border-[#C85A32]" : "border-[#2A2A2A] text-[#666] hover:border-[#444]"}`}>
                        {t === "lease" ? "Leasehold" : "For Sale"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Title *" value={form.title} onChange={v => updateField("title", v)} placeholder="e.g. Tanah Goa Gong" />
                  <InputField label="Slug" value={form.slug} onChange={v => updateField("slug", v)} placeholder="auto-generated" />
                  <InputField label="Location *" value={form.location} onChange={v => updateField("location", v)} placeholder="e.g. Jimbaran, Bali" />
                  <InputField label="Price *" value={form.price} onChange={v => updateField("price", v)} placeholder="e.g. Rp 12M / Are / Year" />
                </div>

                {/* Description */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#666] font-semibold mb-2 block">Description</label>
                  <textarea value={form.description} onChange={e => updateField("description", e.target.value)} rows={3}
                    placeholder="Property description..."
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-[#E8E4DD] placeholder:text-[#444] focus:outline-none focus:border-[#C85A32]/50 transition-colors resize-none" />
                </div>

                {/* Land Specs */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#C85A32] font-semibold mb-3">Land Specifications</p>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Land Area *" value={form.landArea} onChange={v => updateField("landArea", v)} placeholder="e.g. 6 Are (600 m²)" />
                    <InputField label="Zoning" value={form.zoning || ""} onChange={v => updateField("zoning", v)} placeholder="e.g. Kuning (Residential)" />
                    <InputField label="Lease Term" value={form.leaseTerm || ""} onChange={v => updateField("leaseTerm", v)} placeholder="e.g. 5 – 25 Years" />
                    <InputField label="Min Rental" value={form.minRental || ""} onChange={v => updateField("minRental", v)} placeholder="e.g. 2 Are (200 m²)" />
                    <InputField label="Access" value={form.access || ""} onChange={v => updateField("access", v)} placeholder="e.g. Main Road" />
                    <InputField label="View" value={form.view || ""} onChange={v => updateField("view", v)} placeholder="e.g. Ocean View" />
                    <InputField label="Status" value={form.status || ""} onChange={v => updateField("status", v)} placeholder="e.g. SHM (Freehold)" />
                    <InputField label="Frontage" value={form.frontage || ""} onChange={v => updateField("frontage", v)} placeholder="e.g. ± 5m road width" />
                  </div>
                </div>

                {/* Images */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#666] font-semibold block">
                      Image Paths <span className="text-[#555] font-normal">(one per line)</span>
                    </label>
                    
                    {/* Single Image Upload Button */}
                    <label className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-md bg-[#C85A32]/10 text-[#C85A32] hover:bg-[#C85A32]/20 border border-[#C85A32]/20 transition-all cursor-pointer font-semibold">
                      {singleImageUploading ? (
                        <div className="w-3 h-3 border-2 border-[#C85A32] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-3 h-3" />
                      )}
                      Upload Image
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        disabled={singleImageUploading}
                        onChange={e => { 
                          const f = e.target.files?.[0]; 
                          if (f) handleSingleImageUpload(f); 
                          e.target.value = ""; 
                        }} 
                      />
                    </label>
                  </div>
                  
                  <textarea value={imagesText} onChange={e => setImagesText(e.target.value)} rows={3}
                    placeholder={"/assets/your-folder/1.jpeg\n/assets/your-folder/2.jpeg"}
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-[#E8E4DD] placeholder:text-[#444] focus:outline-none focus:border-[#C85A32]/50 transition-colors resize-none font-mono text-xs" />
                  {/* Image Preview */}
                  {imagesText.trim() && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {imagesText.split("\n").filter(Boolean).map((src, i) => (
                        <div key={i} className="w-16 h-12 rounded-lg overflow-hidden border border-[#2A2A2A] bg-[#111]">
                          <img src={src.trim()} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Key Features */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#666] font-semibold mb-2 block">
                    Key Features <span className="text-[#555] font-normal">(one per line)</span>
                  </label>
                  <textarea value={detailsText} onChange={e => setDetailsText(e.target.value)} rows={4}
                    placeholder={"Main road with high visibility\nFlexible lease starting from 3 are\n± 5 min to Udayana Campus"}
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-[#E8E4DD] placeholder:text-[#444] focus:outline-none focus:border-[#C85A32]/50 transition-colors resize-none" />
                </div>

                {/* Save Button */}
                <div className="sticky bottom-0 pt-4 pb-2 bg-[#131313]">
                  <button onClick={handleSave} disabled={saving}
                    className="w-full bg-[#C85A32] hover:bg-[#AF4C27] disabled:opacity-50 text-white text-xs uppercase tracking-widest py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C85A32]/20">
                    {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? "Saving..." : editingId ? "Update Listing" : "Create Listing"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-[#666] font-semibold mb-2 block">{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-[#E8E4DD] placeholder:text-[#444] focus:outline-none focus:border-[#C85A32]/50 transition-colors" />
    </div>
  );
}
