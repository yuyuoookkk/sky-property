"use client";

import React, { useState, useCallback } from "react";
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
  Globe
} from "lucide-react";
import { translations, type Language } from "./translations";

// Property data supporting both lease and sale land listings
interface Property {
  id: number;
  slug: string;
  type: "lease" | "sale";
  title: string;
  location: string;
  price: string;
  images: string[];
  description: string;
  details: string[];
  
  // Land specs
  landArea: string;
  zoning?: string;
  leaseTerm?: string;
  minRental?: string;
  access?: string;
  view?: string;
  status?: string;
  frontage?: string;
}

const PROPERTIES: Property[] = [
  {
    id: 1,
    slug: "labuan-sait-28-hektar",
    type: "lease",
    title: "Tanah Labuan Sait 2.8 Ha",
    location: "Labuan Sait, Uluwatu",
    price: "Rp 45M / Are / Year",
    images: [
      "/assets/labuan-sait-28h/1.jpeg",
      "/assets/labuan-sait-28h/2.jpeg",
      "/assets/labuan-sait-28h/3.jpeg"
    ],
    landArea: "2.8 Hektare (28,000 m²)",
    zoning: "Kuning (Residential)",
    leaseTerm: "5 – 25 Years",
    minRental: "5 Are (500 m²)",
    access: "Jalan Utama Labuan Sait",
    view: "Tourism Corridor",
    description: "Prime leasehold land on the main Labuan Sait road in Uluwatu — one of the fastest-growing tourism corridors in South Bali. Flexible plot sizes starting from just 5 are, with easy access to Padang Padang Beach, El Kabron, Dreamland, and Pura Uluwatu.",
    details: [
      "Main road frontage with high visibility",
      "Flexible lease starting from 5 are",
      "Yellow zone supports diverse development types",
      "± 5 min to Padang Padang & El Kabron",
      "± 7 min to Dreamland & Ulu Cliffhouse",
      "± 10 min to Pura Uluwatu & New Kuta Golf"
    ]
  },
  {
    id: 2,
    slug: "cliff-land-ocean-view-uluwatu",
    type: "sale",
    title: "Cliff Land Ocean View",
    location: "Uluwatu, Bali",
    price: "Rp 2.5B / Are (SHM)",
    images: [
      "/assets/los-tebing/1.jpeg",
      "/assets/los-tebing/2.jpeg",
      "/assets/los-tebing/3.jpeg"
    ],
    landArea: "18.7 Are (1,870 m²)",
    zoning: "Pink (Tourism)",
    status: "SHM (Freehold)",
    access: "Premium Uluwatu Area",
    view: "Ocean View / Cliff Front",
    description: "An extremely rare freehold (SHM) cliff-front land with unobstructed panoramic ocean views in the heart of Uluwatu's exclusive tourism zone. Ideal for a luxury cliff villa, boutique resort, beach club, or wellness retreat with permanent sunset views.",
    details: [
      "Cliff-front with stunning permanent ocean views",
      "SHM (Sertifikat Hak Milik) — freehold title",
      "Pink zone (Tourism) for hospitality development",
      "± 2 min to Ulu Cliffhouse",
      "± 3 min to Padang Padang Beach",
      "± 7 min to Pura Uluwatu",
      "High appreciation area among international investors"
    ]
  },
  {
    id: 3,
    slug: "tanah-kampial-dukuh-sari",
    type: "lease",
    title: "Tanah Kampial Dukuh Sari",
    location: "Nusa Dua, Bali",
    price: "Rp 10M / Are / Year",
    images: [
      "/assets/dukuh-sari/1.jpeg",
      "/assets/dukuh-sari/2.jpeg"
    ],
    landArea: "20 Are (2,000 m²)",
    zoning: "Kuning (Residential)",
    leaseTerm: "5 – 25 Years",
    minRental: "2 Are (200 m²)",
    access: "Jl. Dukuh Sari 2, Kampial",
    view: "Villa & Kos Elit Area",
    description: "Strategic leasehold land in the rapidly growing Kampial area of Nusa Dua, surrounded by premium villas and exclusive boarding houses. Quiet residential environment yet close to Poltekpar Bali, health facilities, and the vibrant Nusa Dua tourism belt.",
    details: [
      "Surrounded by premium villas & exclusive kos",
      "Flexible lease starting from 2 are",
      "Yellow zone for diverse residential development",
      "± 5 min to Politeknik Pariwisata Bali",
      "± 15 min to RS Surya Husadha Nusa Dua",
      "Easy access to Nusa Dua, Jimbaran & South Bali"
    ]
  },
  {
    id: 4,
    slug: "goa-gong-6-are",
    type: "lease",
    title: "Tanah Goa Gong 6 Are",
    location: "Jimbaran, Bali",
    price: "Rp 12M / Are / Year",
    images: [
      "/assets/goagong-6are/1.jpeg"
    ],
    landArea: "6 Are (600 m²)",
    zoning: "Kuning (Residential)",
    leaseTerm: "5 – 25 Years",
    minRental: "3 Are (300 m²)",
    access: "2 Access Roads (Front & Back)",
    view: "Residential Area",
    frontage: "± 5m road width",
    description: "A highly strategic plot in the booming Goa Gong Bawah area of Jimbaran with the rare advantage of dual road access (front and back). Close to Udayana University campus, hospitals, and Sidewalk Jimbaran Mall — ideal for kos, villa, guest house, or commercial use.",
    details: [
      "Dual road access (front & back) — very rare",
      "Flexible lease starting from 3 are",
      "± 50m from Mixue Goa Gong Bawah",
      "± 3 min to Udayana Campus (UNUD)",
      "± 5 min to RS Universitas Udayana",
      "± 7 min to Sidewalk Jimbaran Mall"
    ]
  },
  {
    id: 5,
    slug: "goa-gong-main-road",
    type: "lease",
    title: "Tanah Goa Gong Main Road",
    location: "Jimbaran, Bali",
    price: "Rp 17M / Are / Year",
    images: [
      "/assets/goagong-17jt/1.jpeg",
      "/assets/goagong-17jt/2.jpeg",
      "/assets/goagong-17jt/3.jpeg"
    ],
    landArea: "5 Are (500 m²)",
    zoning: "Kuning (Residential)",
    leaseTerm: "5 – 10 Years + Extension",
    minRental: "5 Are (Full Plot)",
    access: "Main Road Goa Gong",
    view: "Commercial Area",
    frontage: "± 18m front × 27.8m deep, ± 8m road",
    description: "Premium main-road land on the bustling Jalan Utama Goa Gong in Jimbaran's lower district. High visibility with a wide 18-meter frontage and 8-meter road width — perfect for shophouse, office, villa complex, or commercial ventures near Udayana University.",
    details: [
      "Main road with high traffic & visibility",
      "Wide 18m frontage, ideal plot shape",
      "8-meter road width for easy vehicle access",
      "± 50m from Mixue Goa Gong",
      "± 3 min to Udayana Campus (UNUD)",
      "± 10 min to GWK Cultural Park"
    ]
  },
  {
    id: 6,
    slug: "kampus-pnb-jimbaran",
    type: "lease",
    title: "Tanah Kampus PNB",
    location: "Jimbaran, Bali",
    price: "Rp 12M / Are / Year",
    images: [
      "/assets/kampus-pnb/1.jpeg",
      "/assets/kampus-pnb/2.jpeg",
      "/assets/kampus-pnb/3.jpeg"
    ],
    landArea: "61 Are (6,100 m²)",
    zoning: "Kuning (Residential)",
    leaseTerm: "10 – 20 Years + Extension",
    minRental: "2 Are (200 m²)",
    access: "Adjacent to PNB Campus",
    view: "Campus & Commercial Area",
    description: "A massive 61-are plot right next to Politeknik Negeri Bali (PNB) campus in Jimbaran. Exceptional demand for student housing, kos, and commercial services in this growing educational hub. Lease from just 2 are with long-term options up to 20 years.",
    details: [
      "Right next to Politeknik Negeri Bali (PNB)",
      "Huge demand for student housing & kos",
      "Flexible lease starting from 2 are",
      "± 3 min to Sidewalk Jimbaran & RS UNUD",
      "± 7 min to GWK & Menega Café",
      "± 15 min to Ngurah Rai International Airport"
    ]
  },
  {
    id: 7,
    slug: "labuan-sait-15-hektar",
    type: "lease",
    title: "Premium Ocean View 1.5 Ha",
    location: "Labuan Sait, Uluwatu",
    price: "Rp 45M / Are / Year",
    images: [
      "/assets/labuan-sait/1.jpeg",
      "/assets/labuan-sait/2.jpeg",
      "/assets/labuan-sait/3.jpeg",
      "/assets/labuan-sait/4.jpeg",
      "/assets/labuan-sait/5.jpeg"
    ],
    landArea: "1.5 Hektare (15,000 m²)",
    zoning: "Pink (Tourism)",
    leaseTerm: "10 – 25 Years + Extension",
    minRental: "75 Are (7,500 m²)",
    access: "2 Main Roads (Labuan Sait & Cemongkak)",
    view: "Ocean View",
    description: "An exceptional 1.5-hectare ocean-view leasehold at the corner of two major roads in Uluwatu's prime tourism zone (Pink). Strategic hook position with dual main-road access — ideal for large-scale resort, luxury villa estate, beach club, or wellness retreat development.",
    details: [
      "Premium ocean view with high investment value",
      "Corner position with 2 main-road access",
      "Pink zone (Tourism) for hospitality permits",
      "± 5 min to Padang Padang & El Kabron",
      "± 7 min to Dreamland & Bingin Beach",
      "± 10 min to Pura Uluwatu & New Kuta Golf"
    ]
  },
  {
    id: 8,
    slug: "pantai-melasti-clifffront",
    type: "lease",
    title: "Cliff Land Pantai Melasti",
    location: "Ungasan, Bali",
    price: "Rp 50M / Are / Year",
    images: [
      "/assets/pantai-melasti/1.jpeg",
      "/assets/pantai-melasti/2.jpeg",
      "/assets/pantai-melasti/3.jpeg",
      "/assets/pantai-melasti/4.jpeg"
    ],
    landArea: "43 Are (4,300 m²)",
    zoning: "Pink (Tourism)",
    leaseTerm: "Negotiable",
    access: "Pantai Melasti Premium Zone",
    view: "Cliff Front / Ocean View",
    description: "Premium cliff-front leasehold in the prestigious Pantai Melasti area of Ungasan — perched directly above White Rock Beach Club. Surrounded by luxury villas and international resorts, this 43-are plot sits in a pink tourism zone with exceptional development potential.",
    details: [
      "Cliff-front with commanding ocean views",
      "Located above White Rock Beach Club",
      "Pink zone (Tourism) — ideal for hospitality",
      "± 3 min to Pantai Melasti",
      "± 2 min to Ulu Cliffhouse",
      "± 7 min to Pura Uluwatu & El Kabron"
    ]
  },
  {
    id: 9,
    slug: "nyangnyang-clifffront",
    type: "lease",
    title: "Cliff Land Nyang Nyang",
    location: "Uluwatu, Bali",
    price: "Rp 40M / Are / Year",
    images: [
      "/assets/nyangnyang/1.jpeg",
      "/assets/nyangnyang/2.jpeg"
    ],
    landArea: "42 Are (4,200 m²)",
    zoning: "C2 (Mixed Use)",
    leaseTerm: "10 – 25 Years + Extension",
    access: "Villa Neighborhood Access",
    view: "Ocean View / Cliff Front",
    description: "A rare cliff-front plot with breathtaking ocean views near Pantai Nyang Nyang in elite Uluwatu. Flanked on both sides by walled premium villas providing privacy and easy boundary development. C2 mixed-use zoning offers maximum flexibility for luxury villa, resort, or commercial projects.",
    details: [
      "Cliff-front with stunning permanent ocean view",
      "Both sides bordered by villa compound walls",
      "C2 (Mixed Use) zoning for flexible development",
      "± 3 min to Pantai Nyang Nyang",
      "± 2 min to Ulu Cliffhouse",
      "± 5 min to Single Fin Bali"
    ]
  }
];

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en");
  const t = (key: string) => translations[language][key] || key;
  
  const [activeCategory, setActiveCategory] = useState<"lease" | "sale">("lease");
  
  // Filter properties based on the selected category
  const filteredProperties = PROPERTIES.filter((p) => p.type === activeCategory);
  
  // Active property state initialized to the first item of the active category
  const [activeProperty, setActiveProperty] = useState<Property>(filteredProperties[0]);
  
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Form States
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState(
    `I am interested in ${activeProperty.title} (${activeProperty.location}). Please provide more details.`
  );
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handlePropertyChange = (property: Property) => {
    setActiveProperty(property);
    setActiveImageIndex(0);
    setInquiryMessage(`I am interested in ${property.title} (${property.location}). Please provide more details.`);
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
    setInquiryMessage(
      `I am interested in ${propertiesOfCategory[0].title} (${propertiesOfCategory[0].location}). Please provide more details.`
    );
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) return;
    
    // Simulate API request
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setIsInquiryOpen(false);
      setInquiryName("");
      setInquiryEmail("");
    }, 3000);
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
                  className={`text-2xl sm:text-3xl md:text-4xl font-light text-left transition-all ${
                    activeCategory === "lease"
                      ? "text-primary border-b border-accent pb-1"
                      : "text-text-muted/40 hover:text-primary"
                  }`}
                >
                  {t("explorer.lease")}
                </button>
                <span className="text-xl sm:text-2xl md:text-3xl font-light text-text-muted/30">/</span>
                <button 
                  onClick={() => handleCategoryChange("sale")}
                  className={`text-2xl sm:text-3xl md:text-4xl font-light text-left transition-all ${
                    activeCategory === "sale"
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
                  className={`text-[10px] sm:text-xs uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all duration-300 ${
                    activeProperty.id === property.id
                      ? "bg-primary text-secondary border-primary font-semibold"
                      : "bg-transparent text-text-muted border-border-custom hover:text-primary hover:border-text-muted"
                  }`}
                >
                  {property.title}
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
                      className="w-full h-full object-cover"
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

                  {/* Photo counter & dot indicators */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="bg-secondary/80 backdrop-blur-sm text-primary text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-md border border-border-custom font-semibold">
                      {activeImageIndex + 1} / {activeProperty.images.length}
                    </div>
                    {activeProperty.images.length > 1 && (
                      <div className="flex gap-1.5">
                        {activeProperty.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex(idx);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              idx === activeImageIndex
                                ? "bg-accent scale-125"
                                : "bg-secondary/60 hover:bg-secondary/90"
                            }`}
                            aria-label={`View photo ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Flexible Thumbnail selector list */}
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {activeProperty.images.map((img, idx) => (
                    <button
                      key={`${activeProperty.id}-img-${idx}`}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 sm:w-24 aspect-[4/3] rounded-lg overflow-hidden border transition-all duration-300 ${
                        idx === activeImageIndex
                          ? "border-accent ring-1 ring-accent"
                          : "border-border-custom hover:border-text-muted"
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${activeProperty.title} - Photo ${idx + 1}`} 
                        className="w-full h-full object-cover"
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
                    <h3 className="text-3xl sm:text-4xl font-light text-primary tracking-tight">{activeProperty.title}</h3>
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
                  {activeProperty.description}
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
                      <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.zoning}</span>
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
                        <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.type === "sale" ? activeProperty.status : activeProperty.leaseTerm}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">{t("spec.access")}</span>
                      <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.access}</span>
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
                <li>Uluwatu, Bali</li>
                <li>Nusa Lembongan, Bali</li>
                <li>Canggu & Pererenan, Bali</li>
                <li>Jimbaran, Bali</li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-4">{t("footer.contact")}</span>
              <ul className="text-xs text-secondary/70 space-y-2">
                <li>inquire@skypropertybali.com</li>
                <li>+62 812 3456 7890</li>
                <li>Jalan Pantai Bingin, Uluwatu, Bali</li>
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
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-secondary/80">{t("footer.privacy")}</a>
              <a href="#" className="hover:text-secondary/80">{t("footer.terms")}</a>
              <a href="#" className="hover:text-secondary/80">{t("footer.instagram")}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- INQUIRY DRAWERS / SLIDE-OVER MODALS --- */}
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
            
            {/* Slide-over Content */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-secondary border-l border-border-custom shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 sm:mb-8 flex-shrink-0">
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">{t("inquiry.title")}</span>
                <button 
                  onClick={() => setIsInquiryOpen(false)}
                  className="p-1 rounded-full hover:bg-card-bg text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pr-1 pb-6">
                <div className="space-y-2">
                  <h4 className="text-2xl sm:text-3xl font-light text-primary">{t("inquiry.heading")}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {t("inquiry.description")}
                  </p>
                </div>

                {inquirySubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card-bg border border-accent/20 p-6 rounded-xl text-center space-y-4 py-12"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h5 className="text-lg font-medium text-primary">{t("inquiry.sent")}</h5>
                    <p className="text-xs text-text-muted">
                      {t("inquiry.sentDesc")} <strong className="text-primary">{activeProperty.title}</strong>.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted block">{t("inquiry.name")}</label>
                      <input 
                        type="text" 
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder={t("inquiry.namePlaceholder")} 
                        className="w-full bg-card-bg/60 border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary placeholder:text-text-muted/40"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted block">{t("inquiry.email")}</label>
                      <input 
                        type="email" 
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder={t("inquiry.emailPlaceholder")} 
                        className="w-full bg-card-bg/60 border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary placeholder:text-text-muted/40"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted block">{t("inquiry.selectedProperty")}</label>
                      <div className="w-full bg-card-bg border border-border-custom rounded-xl px-4 py-3 text-sm flex justify-between items-center text-primary">
                        <span className="font-semibold text-xs truncate max-w-[150px]">{activeProperty.title}</span>
                        <span className="text-xs text-accent font-medium">{activeProperty.price}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted block">{t("inquiry.message")}</label>
                      <textarea 
                        rows={4}
                        required
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        className="w-full bg-card-bg/60 border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary placeholder:text-text-muted/40 resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-accent text-secondary hover:bg-accent-hover text-xs uppercase tracking-widest py-4 rounded-xl font-semibold shadow-md transition-colors duration-300 mt-2"
                    >
                      {t("inquiry.submit")}
                    </button>
                  </form>
                )}
              </div>

              {/* Footer */}
              <div className="text-[10px] text-text-muted border-t border-border-custom pt-4 sm:pt-6 flex items-center justify-between flex-shrink-0">
                <span>{t("inquiry.whatsapp")}</span>
                <span className="font-semibold text-primary">+62 812 3456 7890</span>
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
                <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-secondary truncate">{activeProperty.title}</h4>
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
                      className="w-full h-full object-cover"
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
                  {activeProperty.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                      {activeProperty.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            idx === activeImageIndex
                              ? "bg-accent scale-125"
                              : "bg-secondary/50 hover:bg-secondary/80"
                          }`}
                          aria-label={`View photo ${idx + 1}`}
                        />
                      ))}
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
                    <span className="font-medium text-secondary">{activeProperty.zoning}</span>
                  </div>
                  {activeProperty.leaseTerm && (
                    <div className="py-3 flex justify-between">
                      <span className="text-secondary/50 font-light">{activeProperty.type === "sale" ? t("lightbox.ownership") : t("lightbox.leaseTerm")}</span>
                      <span className="font-medium text-secondary">{activeProperty.type === "sale" ? activeProperty.status : activeProperty.leaseTerm}</span>
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
                    <span className="font-medium text-secondary">{activeProperty.access}</span>
                  </div>
                  {activeProperty.view && (
                    <div className="py-3 flex justify-between">
                      <span className="text-secondary/50 font-light">{t("lightbox.view")}</span>
                      <span className="font-medium text-secondary">{activeProperty.view}</span>
                    </div>
                  )}
                  {activeProperty.frontage && (
                    <div className="py-3 flex justify-between">
                      <span className="text-secondary/50 font-light">{t("lightbox.frontage")}</span>
                      <span className="font-medium text-secondary">{activeProperty.frontage}</span>
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
                    {activeProperty.details.map((detail, index) => (
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

    </div>
  );
}
