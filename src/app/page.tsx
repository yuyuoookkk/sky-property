"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize,
  MapPin,
  ArrowUpRight,
  X,
  Check,
  ChevronRight,
  Layers,
  ChevronLeft,
  Clock,
  Shield,
  Tag,
  Globe,
  MessageCircle,
  Phone
} from "lucide-react";
import { translations, type Language } from "./translations";
import { PROPERTIES as STATIC_PROPERTIES, type Property } from "./data/listings";

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en");
  const t = (key: string) => translations[language][key] || key;

  // Helper to get translated property field
  const pt = (property: Property, field: 'title' | 'description' | 'zoning' | 'leaseTerm' | 'access' | 'view' | 'status' | 'frontage') => {
    const langField = `${field}_${language}` as keyof Property;
    return (property[langField] as string) || property[field] || "";
  };
  const ptDetails = (property: Property) => {
    const langField = `details_${language}` as keyof Property;
    return (property[langField] as string[]) || property.details;
  };

  const [PROPERTIES, setProperties] = useState<Property[]>(STATIC_PROPERTIES);

  // Fetch latest listings from API (includes dashboard-added ones)
  useEffect(() => {
    fetch("/api/listings")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProperties(data);
        }
      })
      .catch(() => {
        // Fallback to static data silently
      });
  }, []);

  const [activeCategory, setActiveCategory] = useState<"lease" | "sale">("lease");

  // Filter properties based on the selected category
  const filteredProperties = PROPERTIES.filter((p) => p.type === activeCategory);

  // Active property state initialized to the first item of the active category
  const [activeProperty, setActiveProperty] = useState<Property>(filteredProperties[0]);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);

  // Auto-scroll thumbnail strip to keep active thumbnail visible
  useEffect(() => {
    if (thumbnailStripRef.current) {
      const container = thumbnailStripRef.current;
      const activeThumb = container.children[activeImageIndex] as HTMLElement;
      if (activeThumb) {
        const containerRect = container.getBoundingClientRect();
        const thumbRect = activeThumb.getBoundingClientRect();
        const scrollLeft = activeThumb.offsetLeft - container.offsetLeft - (containerRect.width / 2) + (thumbRect.width / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeImageIndex, activeProperty.id]);

  const handlePropertyChange = (property: Property) => {
    setActiveProperty(property);
    setActiveImageIndex(0);
  };

  const handlePrevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) =>
      prev === 0 ? activeProperty.images.length - 1 : prev - 1
    );
  }, [activeProperty.images.length]);

  const handleNextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) =>
      prev === activeProperty.images.length - 1 ? 0 : prev + 1
    );
  }, [activeProperty.images.length]);

  const handleCategoryChange = (category: "lease" | "sale") => {
    setActiveCategory(category);
    const propertiesOfCategory = PROPERTIES.filter((p) => p.type === category);
    setActiveProperty(propertiesOfCategory[0]);
    setActiveImageIndex(0);
  };

  const handleWhatsApp = (number: string) => {
    const message = encodeURIComponent(
      `Hi, I am interested in ${pt(activeProperty, 'title')} (${activeProperty.location}). Please provide more details.`
    );
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
    setIsInquiryOpen(false);
  };

  return (
    <div className="min-h-screen bg-secondary text-primary selection:bg-accent selection:text-secondary font-sans transition-colors duration-500">

      {/* --- ELEGANT HEADER --- */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-secondary/80 border-b border-border-custom transition-all duration-300">
        <div className="editorial-container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-border-custom bg-card-bg">
              <img
                src="/assets/logo.jpeg"
                alt="Sky Property Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.25em] font-semibold text-primary">
              SKY PROPERTY <span className="font-light text-text-muted">BALI</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-widest text-text-muted">
            <a href="#villas" className="hover:text-primary transition-colors duration-200">{t("nav.portfolio")}</a>
            <a href="#philosophy" className="hover:text-primary transition-colors duration-200">{t("nav.philosophy")}</a>
            <a href="#contact" className="hover:text-primary transition-colors duration-200" onClick={(e) => {
              e.preventDefault();
              setIsInquiryOpen(true);
            }}>{t("nav.contact")}</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <button
              id="language-toggle"
              onClick={() => setLanguage(language === "en" ? "id" : "en")}
              className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-widest px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-border-custom hover:border-accent hover:text-accent text-text-muted transition-all duration-300 font-semibold"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t("lang.switch")}</span>
            </button>
            <button
              onClick={() => setIsInquiryOpen(true)}
              className="bg-accent text-secondary text-[10px] sm:text-xs uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-accent-hover transition-all duration-300 font-semibold shadow-sm"
            >
              {t("nav.inquire")}
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="py-16 md:py-32 border-b border-border-custom relative overflow-hidden" id="philosophy">
        <div className="editorial-container grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xs uppercase tracking-[0.2em] text-accent font-semibold"
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-primary leading-[1.05]"
            >
              {t("hero.title1")} <br />
              <span className="serif-font italic font-light">{t("hero.title2")}</span> {t("hero.title3")}
            </motion.h1>
          </div>

          <div className="lg:col-span-4 lg:pl-10 space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-text-muted text-sm leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-[1px] bg-border-custom origin-left"
            />
            <div className="grid grid-cols-3 gap-4 text-[10px] sm:text-[11px] uppercase tracking-wider text-text-muted">
              <div>
                <span className="block font-semibold text-primary">{t("hero.stat1.value")}</span>
                <span>{t("hero.stat1.label")}</span>
              </div>
              <div>
                <span className="block font-semibold text-primary">{t("hero.stat2.value")}</span>
                <span>{t("hero.stat2.label")}</span>
              </div>
              <div>
                <span className="block font-semibold text-primary">{t("hero.stat3.value")}</span>
                <span>{t("hero.stat3.label")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VILLA & LAND EXPLORER / INTERACTIVE SPEC SHEET --- */}
      <section className="py-12 md:py-24 border-b border-border-custom" id="villas">
        <div className="editorial-container">

          {/* Section title & Category toggle selectors */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 md:mb-16">
            <div>
              <p className="text-xs uppercase tracking-widest text-text-muted mb-2">{t("explorer.subtitle")}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <button
                  onClick={() => handleCategoryChange("lease")}
                  className={`text-2xl sm:text-3xl md:text-4xl font-light text-left transition-all ${activeCategory === "lease"
                    ? "text-primary border-b border-accent pb-1"
                    : "text-text-muted/40 hover:text-primary"
                    }`}
                >
                  {t("explorer.lease")}
                </button>
                <span className="text-xl sm:text-2xl md:text-3xl font-light text-text-muted/30">/</span>
                <button
                  onClick={() => handleCategoryChange("sale")}
                  className={`text-2xl sm:text-3xl md:text-4xl font-light text-left transition-all ${activeCategory === "sale"
                    ? "text-primary border-b border-accent pb-1"
                    : "text-text-muted/40 hover:text-primary"
                    }`}
                >
                  {t("explorer.sale")}
                </button>
              </div>
            </div>

            {/* Quick tab navigation within active category */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {filteredProperties.map((property) => (
                <button
                  key={property.id}
                  onClick={() => handlePropertyChange(property)}
                  className={`text-[10px] sm:text-xs uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all duration-300 ${activeProperty.id === property.id
                    ? "bg-primary text-secondary border-primary font-semibold"
                    : "bg-transparent text-text-muted border-border-custom hover:text-primary hover:border-text-muted"
                    }`}
                >
                  {pt(property, 'title')}
                </button>
              ))}
            </div>
          </div>

          {/* Main Visualizer Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* LEFT COLUMN: Large Zoomable Image (7 cols) */}
            <div className="lg:col-span-7">
              <div className="space-y-4">

                {/* Image Container with motion transition */}
                <div
                  className="aspect-[4/3] md:aspect-[16/10] bg-card-bg rounded-2xl overflow-hidden border border-border-custom relative cursor-zoom-in group shadow-sm"
                  onClick={() => setIsGalleryOpen(true)}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${activeProperty.id}-${activeImageIndex}`}
                      src={activeProperty.images[activeImageIndex]}
                      alt={`${activeProperty.title} - Photo ${activeImageIndex + 1}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.currentTarget.src = `https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop`;
                      }}
                    />
                  </AnimatePresence>

                  {/* Gallery navigation arrows (only show if multiple images) */}
                  {activeProperty.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-secondary/80 backdrop-blur-sm border border-border-custom text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-secondary transition-all duration-300 shadow-md z-10"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-secondary/80 backdrop-blur-sm border border-border-custom text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-secondary transition-all duration-300 shadow-md z-10"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Subtle Image Overlay on Hover */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="bg-secondary/90 text-primary text-xs uppercase tracking-widest px-5 py-2.5 rounded-full shadow-md backdrop-blur-sm flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 font-semibold">
                      {t("explorer.viewDetails")} <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Photo counter badge */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="bg-secondary/80 backdrop-blur-sm text-primary text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-md border border-border-custom font-semibold">
                      {activeImageIndex + 1} / {activeProperty.images.length}
                    </div>
                  </div>
                </div>

                {/* Scrollable Thumbnail selector strip */}
                <div className="relative">
                  <div ref={thumbnailStripRef} className="flex gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar pb-1" style={{ scrollBehavior: 'smooth' }}>
                    {activeProperty.images.map((img, idx) => (
                      <button
                        key={`${activeProperty.id}-img-${idx}`}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative flex-shrink-0 w-16 sm:w-24 aspect-[4/3] rounded-lg overflow-hidden border transition-all duration-300 ${idx === activeImageIndex
                          ? "border-accent ring-1 ring-accent"
                          : "border-border-custom hover:border-text-muted"
                          }`}
                      >
                        <img
                          src={img}
                          alt={`${activeProperty.title} - Photo ${idx + 1}`}
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            e.currentTarget.src = `https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=300&auto=format&fit=crop`;
                          }}
                        />
                        {idx !== activeImageIndex && (
                          <div className="absolute inset-0 bg-secondary/30 hover:bg-transparent transition-colors duration-300" />
                        )}
                      </button>
                    ))}
                  </div>
                  {/* Scroll fade indicators for many images */}
                  {activeProperty.images.length > 6 && (
                    <div className="absolute right-0 top-0 bottom-1 w-12 bg-gradient-to-l from-secondary to-transparent pointer-events-none rounded-r-lg" />
                  )}
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: Specifications and Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6 md:space-y-8">

              {/* Header Title Specs */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-accent uppercase tracking-widest font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeProperty.location}</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProperty.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-between items-baseline gap-4"
                  >
                    <h3 className="text-3xl sm:text-4xl font-light text-primary tracking-tight">{pt(activeProperty, 'title')}</h3>
                    <span className="text-lg sm:text-xl serif-font italic text-accent font-medium whitespace-nowrap">{activeProperty.price}</span>
                  </motion.div>
                </AnimatePresence>
                <div className="h-[1px] bg-border-custom w-full" />
              </div>

              {/* Description Statement */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeProperty.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-text-muted text-sm leading-relaxed"
                >
                  {pt(activeProperty, 'description')}
                </motion.p>
              </AnimatePresence>

              {/* Core Specs Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProperty.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="grid grid-cols-2 gap-4 bg-card-bg/60 p-4 sm:p-6 rounded-2xl border border-border-custom"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                      <Maximize className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">{t("spec.totalLand")}</span>
                      <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.landArea}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">{t("spec.zoning")}</span>
                      <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{pt(activeProperty, 'zoning')}</span>
                    </div>
                  </div>

                  {activeProperty.minRental && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">{t("spec.minRental")}</span>
                        <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.minRental}</span>
                      </div>
                    </div>
                  )}

                  {activeProperty.leaseTerm && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">{activeProperty.type === "sale" ? t("spec.status") : t("spec.leaseTerm")}</span>
                        <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.type === "sale" ? pt(activeProperty, 'status') : pt(activeProperty, 'leaseTerm')}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">{t("spec.access")}</span>
                      <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{pt(activeProperty, 'access')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                      <Tag className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">{t("spec.type")}</span>
                      <span className="text-xs sm:text-sm font-semibold text-accent block truncate">{activeProperty.type === "sale" ? t("spec.freehold") : t("spec.leasehold")}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Call to action & Brochure */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsInquiryOpen(true)}
                  className="flex-1 bg-accent text-secondary hover:bg-accent-hover text-xs uppercase tracking-widest py-4 px-6 rounded-xl font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2 group text-center"
                >
                  {activeProperty.type === "sale" ? t("cta.inquirePurchase") : t("cta.inquireLease")}
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="bg-transparent border border-border-custom text-primary hover:border-text-muted text-xs uppercase tracking-widest py-4 px-6 rounded-xl font-medium transition-colors text-center"
                >
                  {t("cta.viewSpecs")}
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* --- PHILOSOPHY STATEMENT --- */}
      <section className="py-16 md:py-20 bg-card-bg/30 border-b border-border-custom">
        <div className="editorial-container max-w-4xl space-y-8 md:space-y-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">{t("philosophy.subtitle")}</p>
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-light text-primary leading-snug">
            {t("philosophy.quote")}
          </h3>
          <p className="text-text-muted text-sm max-w-2xl mx-auto leading-relaxed">
            {t("philosophy.description")}
          </p>
        </div>
      </section>

      {/* --- REASSURING TRUST FOOTER ACCENT --- */}
      <section className="py-12 border-b border-border-custom">
        <div className="editorial-container grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold block">{t("trust.1.title")}</span>
            <p className="text-xs text-text-muted">{t("trust.1.desc")}</p>
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold block">{t("trust.2.title")}</span>
            <p className="text-xs text-text-muted">{t("trust.2.desc")}</p>
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold block">{t("trust.3.title")}</span>
            <p className="text-xs text-text-muted">{t("trust.3.desc")}</p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-16 bg-primary text-secondary">
        <div className="editorial-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">

            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-secondary block">
                SKY PROPERTY <span className="font-light opacity-50">BALI</span>
              </span>
              <p className="text-xs text-secondary/60 leading-relaxed max-w-xs">
                {t("footer.description")}
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-4">{t("footer.locations")}</span>
              <ul className="text-xs text-secondary/70 space-y-2">
                <li>Kuta Selatan, Bali</li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-4">{t("footer.contact")}</span>
              <ul className="text-xs text-secondary/70 space-y-3">
                <li>
                  <a href="https://wa.me/6281353306674" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                    <MessageCircle className="w-3.5 h-3.5 text-accent" />
                    <span>Gina — +62 813 5330 6674</span>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/6281339900044" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                    <MessageCircle className="w-3.5 h-3.5 text-accent" />
                    <span>Oman — +62 813 3990 0044</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@gin4b4li?_r=1&_t=ZS-98X3pVBvac5" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                    <Globe className="w-3.5 h-3.5 text-accent" />
                    <span>TikTok — @gin4b4li</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-4">{t("footer.newsletter")}</span>
              <p className="text-xs text-secondary/50 mb-3">{t("footer.newsletterDesc")}</p>
              <div className="flex border-b border-secondary/20 pb-2">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  className="bg-transparent text-xs w-full text-secondary placeholder:text-secondary/40 focus:outline-none"
                />
                <button className="text-accent hover:text-accent-hover transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          <div className="border-t border-secondary/15 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-secondary/40">
            <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 md:mt-0 justify-center md:justify-end">
              <a href="#" className="hover:text-secondary/80 transition-colors">{t("footer.privacy")}</a>
              <a href="#" className="hover:text-secondary/80 transition-colors">{t("footer.terms")}</a>
              <a href="#" className="hover:text-secondary/80 transition-colors">{t("footer.instagram")}</a>
              <a href="https://www.tiktok.com/@gin4b4li?_r=1&_t=ZS-98X3pVBvac5" target="_blank" rel="noopener noreferrer" className="hover:text-secondary/80 transition-colors">TikTok @gin4b4li</a>
              <a href="https://tiktok.com/@richtransportbali" target="_blank" rel="noopener noreferrer" className="hover:text-secondary/80 transition-colors">TikTok @richtransportbali</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- WHATSAPP CONTACT CHOOSER MODAL --- */}
      <AnimatePresence>
        {isInquiryOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInquiryOpen(false)}
              className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm"
            />

            {/* Centered Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-secondary border border-border-custom rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto overflow-hidden">

                {/* Header */}
                <div className="p-6 pb-4 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">{t("inquiry.title")}</span>
                  <button
                    onClick={() => setIsInquiryOpen(false)}
                    className="p-1 rounded-full hover:bg-card-bg text-primary transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Property Info */}
                <div className="px-6 pb-4">
                  <div className="bg-card-bg/60 border border-border-custom rounded-xl p-4 flex justify-between items-center">
                    <div className="min-w-0">
                      <span className="text-xs text-text-muted block">{t("inquiry.selectedProperty")}</span>
                      <span className="text-sm font-semibold text-primary block truncate">{pt(activeProperty, 'title')}</span>
                    </div>
                    <span className="text-xs text-accent font-medium whitespace-nowrap ml-3">{activeProperty.price}</span>
                  </div>
                </div>

                {/* Heading */}
                <div className="px-6 pb-2 space-y-1">
                  <h4 className="text-xl sm:text-2xl font-light text-primary">{t("inquiry.heading")}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">{t("inquiry.description")}</p>
                </div>

                {/* WhatsApp Contact Buttons */}
                <div className="p-6 pt-4 space-y-3">

                  <button
                    onClick={() => handleWhatsApp("6281353306674")}
                    className="w-full flex items-center gap-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366]/50 rounded-xl px-5 py-4 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left min-w-0">
                      <span className="text-sm font-semibold text-primary block">Gina</span>
                      <span className="text-xs text-text-muted">+62 813 5330 6674</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-[#25D366] ml-auto flex-shrink-0 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </button>

                  <button
                    onClick={() => handleWhatsApp("6281339900044")}
                    className="w-full flex items-center gap-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366]/50 rounded-xl px-5 py-4 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left min-w-0">
                      <span className="text-sm font-semibold text-primary block">Man</span>
                      <span className="text-xs text-text-muted">+62 813 3990 0044</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-[#25D366] ml-auto flex-shrink-0 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </button>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6">
                  <p className="text-[10px] text-text-muted text-center">{t("inquiry.whatsappNote")}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- FULL SCREEN OVERLAY LIGHTBOX DETAIL VIEWER --- */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary/95 text-secondary flex flex-col justify-between"
          >
            {/* Header overlay */}
            <div className="p-4 sm:p-6 md:p-8 flex items-center justify-between border-b border-secondary/10 flex-shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs uppercase tracking-widest text-accent font-semibold truncate">{activeProperty.location}</span>
                <span className="text-secondary/40 text-xs">/</span>
                <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-secondary truncate">{pt(activeProperty, 'title')}</h4>
              </div>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-secondary/60 hover:text-secondary transition-colors group flex-shrink-0 ml-4"
              >
                <span>{t("lightbox.close")}</span>
                <X className="w-4 h-4 transform group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Content view: Large image left, specifications grid right */}
            <div className="flex-1 overflow-y-auto no-scrollbar py-6 sm:py-8 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

              {/* Image box with gallery navigation */}
              <div className="lg:col-span-7 space-y-4">
                <div className="aspect-[4/3] md:aspect-[16/10] bg-secondary/5 rounded-2xl overflow-hidden border border-secondary/10 relative group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`lightbox-${activeProperty.id}-${activeImageIndex}`}
                      src={activeProperty.images[activeImageIndex]}
                      alt={`${activeProperty.title} - Photo ${activeImageIndex + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.currentTarget.src = `https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop`;
                      }}
                    />
                  </AnimatePresence>

                  {/* Lightbox gallery navigation */}
                  {activeProperty.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => handlePrevImage(e)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary/60 backdrop-blur-sm border border-secondary/20 text-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-primary/80 transition-all duration-300 shadow-md z-10"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleNextImage(e)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary/60 backdrop-blur-sm border border-secondary/20 text-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-primary/80 transition-all duration-300 shadow-md z-10"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Photo counter in lightbox */}
                  {activeProperty.images.length > 1 && activeProperty.images.length <= 12 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                      {activeProperty.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeImageIndex
                            ? "bg-accent scale-125"
                            : "bg-secondary/50 hover:bg-secondary/80"
                            }`}
                          aria-label={`View photo ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                  {/* Compact photo counter for many images */}
                  {activeProperty.images.length > 12 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-primary/60 backdrop-blur-sm text-secondary text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-md font-semibold">
                      {activeImageIndex + 1} / {activeProperty.images.length}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-secondary/50">
                  <span>
                    {activeProperty.images.length > 1
                      ? `Photo ${activeImageIndex + 1} / ${activeProperty.images.length} — ${t("lightbox.scrollSpecs")}`
                      : t("lightbox.scrollSpecs")}
                  </span>
                  <span>{t("lightbox.price")}: <strong className="text-accent">{activeProperty.price}</strong></span>
                </div>
              </div>

              {/* Specs and Bullet points */}
              <div className="lg:col-span-5 space-y-6 sm:space-y-8">
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-widest text-accent font-semibold">{t("lightbox.specSheet")}</span>
                  <h3 className="text-3xl sm:text-4xl font-light text-secondary">{t("lightbox.landSpecs")}</h3>
                  <p className="text-secondary/70 text-sm leading-relaxed">
                    {t("lightbox.specsDesc")}
                  </p>
                </div>

                {/* Table details - Dynamic based on type */}
                <div className="border-t border-secondary/10 divide-y divide-secondary/10 text-xs sm:text-sm">
                  <div className="py-3 flex justify-between">
                    <span className="text-secondary/50 font-light">{t("lightbox.location")}</span>
                    <span className="font-medium text-secondary">{activeProperty.location}</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-secondary/50 font-light">{t("lightbox.landArea")}</span>
                    <span className="font-medium text-secondary">{activeProperty.landArea}</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-secondary/50 font-light">{t("lightbox.zoning")}</span>
                    <span className="font-medium text-secondary">{pt(activeProperty, 'zoning')}</span>
                  </div>
                  {activeProperty.leaseTerm && (
                    <div className="py-3 flex justify-between">
                      <span className="text-secondary/50 font-light">{activeProperty.type === "sale" ? t("lightbox.ownership") : t("lightbox.leaseTerm")}</span>
                      <span className="font-medium text-secondary">{activeProperty.type === "sale" ? pt(activeProperty, 'status') : pt(activeProperty, 'leaseTerm')}</span>
                    </div>
                  )}
                  {activeProperty.minRental && (
                    <div className="py-3 flex justify-between">
                      <span className="text-secondary/50 font-light">{t("lightbox.minRental")}</span>
                      <span className="font-medium text-secondary">{activeProperty.minRental}</span>
                    </div>
                  )}
                  <div className="py-3 flex justify-between">
                    <span className="text-secondary/50 font-light">{t("lightbox.access")}</span>
                    <span className="font-medium text-secondary">{pt(activeProperty, 'access')}</span>
                  </div>
                  {activeProperty.view && (
                    <div className="py-3 flex justify-between">
                      <span className="text-secondary/50 font-light">{t("lightbox.view")}</span>
                      <span className="font-medium text-secondary">{pt(activeProperty, 'view')}</span>
                    </div>
                  )}
                  {activeProperty.frontage && (
                    <div className="py-3 flex justify-between">
                      <span className="text-secondary/50 font-light">{t("lightbox.frontage")}</span>
                      <span className="font-medium text-secondary">{pt(activeProperty, 'frontage')}</span>
                    </div>
                  )}
                  <div className="py-3 flex justify-between">
                    <span className="text-secondary/50 font-light">{t("lightbox.status")}</span>
                    <span className="font-medium text-accent">{activeProperty.type === "sale" ? t("spec.freehold") : t("spec.leasehold")}</span>
                  </div>
                </div>

                {/* Additional bullet specifics */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-secondary/40 block">{t("lightbox.keyFeatures")}</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-secondary/80">
                    {ptDetails(activeProperty).map((detail, index) => (
                      <li key={index} className="flex items-center gap-2.5">
                        <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsGalleryOpen(false);
                      setIsInquiryOpen(true);
                    }}
                    className="w-full bg-accent hover:bg-accent-hover text-secondary text-xs uppercase tracking-widest py-4 rounded-xl font-semibold shadow-md transition-colors"
                  >
                    {t("lightbox.inquireProperty")}
                  </button>
                </div>
              </div>

            </div>

            {/* Navigation footer */}
            <div className="p-4 sm:p-6 md:p-8 border-t border-secondary/10 flex items-center justify-between text-[11px] sm:text-xs text-secondary/40 max-w-7xl mx-auto w-full flex-shrink-0">
              <span>Land {filteredProperties.indexOf(activeProperty) + 1} of {filteredProperties.length}</span>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    const currentIndex = filteredProperties.indexOf(activeProperty);
                    const prevIndex = currentIndex === 0 ? filteredProperties.length - 1 : currentIndex - 1;
                    setActiveProperty(filteredProperties[prevIndex]);
                  }}
                  className="hover:text-secondary flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> {t("lightbox.prev")}
                </button>
                <span>|</span>
                <button
                  onClick={() => {
                    const currentIndex = filteredProperties.indexOf(activeProperty);
                    const nextIndex = currentIndex === filteredProperties.length - 1 ? 0 : currentIndex + 1;
                    setActiveProperty(filteredProperties[nextIndex]);
                  }}
                  className="hover:text-secondary flex items-center gap-1 transition-colors"
                >
                  {t("lightbox.next")} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <a
        href="https://wa.me/6281353306674"
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-fab"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 group"
      >
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />

        {/* Button */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#1DA851] shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
          <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8 fill-white">
            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.914 15.914 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.312 22.594c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.828-6.81-8.066-7.126-.23-.316-1.904-2.536-1.904-4.836s1.204-3.432 1.632-3.902c.39-.428.914-.612 1.218-.612.152 0 .29.008.414.014.428.018.642.044.924.716.352.838 1.21 2.95 1.316 3.164.108.214.214.498.076.784-.13.29-.244.47-.458.72-.214.252-.418.444-.632.716-.196.236-.418.49-.176.918.242.428 1.078 1.778 2.314 2.88 1.59 1.416 2.93 1.856 3.344 2.062.414.206.656.176.898-.108.248-.29 1.058-1.232 1.34-1.656.276-.424.558-.352.938-.214.384.136 2.434 1.148 2.852 1.356.418.21.696.316.798.49.1.176.1 1.012-.29 2.112z" />
          </svg>
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-primary text-secondary text-xs rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
          Chat with Gina
          <div className="absolute top-full right-5 w-2 h-2 bg-primary rotate-45 -mt-1" />
        </div>
      </a>

    </div>
  );
}
