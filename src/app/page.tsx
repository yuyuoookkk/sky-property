"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bed, 
  Bath, 
  Maximize, 
  MapPin, 
  ArrowUpRight, 
  X, 
  Check,
  ChevronRight,
  Compass,
  Layers,
  ChevronLeft,
  Clock,
  Shield,
  Tag
} from "lucide-react";

// Property mock data supporting both villas and land renting
interface Property {
  id: number;
  slug: string;
  type: "villa" | "land";
  title: string;
  location: string;
  price: string;
  image: string;
  description: string;
  details: string[];
  
  // Villa specific specs
  bedrooms?: number;
  bathrooms?: number;
  buildingArea?: string;
  pool?: string;
  
  // Land / shared specs
  landArea: string;
  zoning?: string;
  leaseTerm?: string;
  minRental?: string;
  access?: string;
  view?: string;
}

const PROPERTIES: Property[] = [
  {
    id: 1,
    slug: "villa-nusa",
    type: "villa",
    title: "Villa Nusa",
    location: "Nusa Lembongan, Bali",
    price: "$1,150,000 USD",
    image: "/assets/villa1.jpeg",
    bedrooms: 3,
    bathrooms: 3.5,
    landArea: "450 sqm",
    buildingArea: "310 sqm",
    pool: "12m Private Pool",
    view: "Panoramic Ocean Cliff View",
    description: "Designed by renowned studio K-Studio, Villa Nusa stands as a raw concrete monolith projecting over the cliffside. Its minimalist aesthetic embraces the surrounding ocean breezes with open floor plates and frameless glazing.",
    details: [
      "Brutalist raw concrete design",
      "Perched on CLIFF 100 meters above sea level",
      "Fully integrated smart home controls",
      "Eco-conscious solar shading panels",
      "Italian custom terrazzo flooring"
    ]
  },
  {
    id: 2,
    slug: "villa-ulu",
    type: "villa",
    title: "Villa Ulu",
    location: "Uluwatu, Bali",
    price: "$1,450,000 USD",
    image: "/assets/villa2.jpeg",
    bedrooms: 4,
    bathrooms: 4.5,
    landArea: "600 sqm",
    buildingArea: "420 sqm",
    pool: "15m Infinity Pool",
    view: "Sunset Ocean Facing",
    description: "Rooted in limestone rocks, Villa Ulu integrates wabi-sabi finishes with brutalist architectural shapes. Curved sand-textured plaster walls reflect the changing sunlight throughout the day.",
    details: [
      "Wabi-sabi minimalist interiors",
      "15-meter cantilevered infinity pool",
      "Reclaimed ironwood cladding",
      "Direct beach path access",
      "Chef's kitchen with Gaggenau appliances"
    ]
  },
  {
    id: 3,
    slug: "villa-canggu",
    type: "villa",
    title: "Villa Canggu",
    location: "Canggu, Bali",
    price: "$980,000 USD",
    image: "/assets/villa3.jpeg",
    bedrooms: 3,
    bathrooms: 3,
    landArea: "380 sqm",
    buildingArea: "280 sqm",
    pool: "10m Terrazzo Pool",
    view: "Rice Field Views",
    description: "An oasis of calm in Bali's most vibrant precinct. Villa Canggu combines raw teak wood ceiling structures with local volcanic stone paving to create an indoor-outdoor sanctuary.",
    details: [
      "Traditional teak ceiling craftsmanship",
      "Bespoke modular cabinetry",
      "Surrounded by protected green-belt rice fields",
      "Double height volume living room",
      "Japanese shou sugi ban wood exterior accents"
    ]
  },
  {
    id: 4,
    slug: "villa-kaba",
    type: "villa",
    title: "Villa Kaba",
    location: "Kaba Kaba, Bali",
    price: "$1,250,000 USD",
    image: "/assets/villa4.jpeg",
    bedrooms: 4,
    bathrooms: 4,
    landArea: "750 sqm",
    buildingArea: "450 sqm",
    pool: "18m Lap Pool",
    view: "Jungle Canopy View",
    description: "A minimalist canopy retreat perched above the river valley. Designed with low-profile timber decks and deep eaves, Villa Kaba floats seamlessly within its tropical surroundings.",
    details: [
      "Frameless floor-to-ceiling glass sliding walls",
      "Suspended steel staircase design",
      "Surrounded by old-growth tropical jungle",
      "Dedicated wellness deck and spa area",
      "Natural mineral water filtration system"
    ]
  },
  {
    id: 5,
    slug: "villa-seseh",
    type: "villa",
    title: "Villa Seseh",
    location: "Seseh Beach, Bali",
    price: "$1,600,000 USD",
    image: "/assets/villa5.jpeg",
    bedrooms: 5,
    bathrooms: 5.5,
    landArea: "900 sqm",
    buildingArea: "520 sqm",
    pool: "20m Swimming Pool",
    view: "Beachfront / Ocean View",
    description: "A flagship beachfront estate showcasing ultimate minimal luxury. Features high ceilings, large pivot doors of reclaimed ironwood, and natural stone flooring that extends directly into the beach sand.",
    details: [
      "Rare beachfront development plot",
      "20m volcanic basalt lap pool",
      "Custom basalt stone bathrooms",
      "Expansive rooftop sunset terrace",
      "Private parking for 3 vehicles"
    ]
  },
  {
    id: 6,
    slug: "udayana-campus-land",
    type: "land",
    title: "Udayana Campus Land",
    location: "Jimbaran, Bali",
    price: "Rp 9.5M / Are / Year",
    image: "/assets/land.png",
    landArea: "61 Are (6,100 sqm)",
    zoning: "Residential (Zona Kuning)",
    leaseTerm: "Max 20 Years + Extension",
    minRental: "2 Are",
    access: "Double Asphalt Road",
    view: "Campus & Residential Area",
    description: "A highly strategic land plot located in the direct vicinity of the Udayana University Campus in Jimbaran. Perfectly suited for commercial or residential development, such as a premium villa estate, boarding houses (Kos), or student housing complexes. Spanning a total of 61 Are, this land is available for lease with custom divisible plots starting from a minimum of 2 Are up to a maximum of 20 years with extension possibilities.",
    details: [
      "Premium yellow zoning (Zona Kuning) for housing",
      "Divisible rental starting from 2 Are minimum",
      "Long-term lease up to 20 years with extensions",
      "Only 2 minutes walking/driving to Udayana Rectorate",
      "Excellent double asphalt road access for heavy vehicles",
      "Electricity, water, and internet cables ready at site border"
    ]
  }
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<"villa" | "land">("villa");
  
  // Filter properties based on the selected category
  const filteredProperties = PROPERTIES.filter((p) => p.type === activeCategory);
  
  // Active property state initialized to the first item of the active category
  const [activeProperty, setActiveProperty] = useState<Property>(filteredProperties[0]);
  
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  
  // Form States
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState(
    `I am interested in ${activeProperty.title} (${activeProperty.location}). Please provide more details.`
  );
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handlePropertyChange = (property: Property) => {
    setActiveProperty(property);
    setInquiryMessage(`I am interested in ${property.title} (${property.location}). Please provide more details.`);
  };

  const handleCategoryChange = (category: "villa" | "land") => {
    setActiveCategory(category);
    const propertiesOfCategory = PROPERTIES.filter((p) => p.type === category);
    setActiveProperty(propertiesOfCategory[0]);
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
            <a href="#villas" className="hover:text-primary transition-colors duration-200">Portfolio</a>
            <a href="#philosophy" className="hover:text-primary transition-colors duration-200">Philosophy</a>
            <a href="#contact" className="hover:text-primary transition-colors duration-200" onClick={(e) => {
              e.preventDefault();
              setIsInquiryOpen(true);
            }}>Contact</a>
          </nav>
          
          <div>
            <button 
              onClick={() => setIsInquiryOpen(true)}
              className="bg-accent text-secondary text-[10px] sm:text-xs uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-accent-hover transition-all duration-300 font-semibold shadow-sm"
            >
              Inquire
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
              Aesthetic Sanctums
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-primary leading-[1.05]"
            >
              Curated <br />
              <span className="serif-font italic font-light">Minimalist</span> Architecture
            </motion.h1>
          </div>
          
          <div className="lg:col-span-4 lg:pl-10 space-y-4">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-text-muted text-sm leading-relaxed"
            >
              We believe in architecture as a silent poetry of space. Our portfolio represents a meticulous balance between raw materials, natural light, and the tropical landscapes of Bali.
            </motion.p>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-[1px] bg-border-custom origin-left"
            />
            <div className="grid grid-cols-3 gap-4 text-[10px] sm:text-[11px] uppercase tracking-wider text-text-muted">
              <div>
                <span className="block font-semibold text-primary">05</span>
                <span>Villas for Sale</span>
              </div>
              <div>
                <span className="block font-semibold text-primary">01</span>
                <span>Prime Land</span>
              </div>
              <div>
                <span className="block font-semibold text-primary">BALI</span>
                <span>Uluwatu</span>
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
              <p className="text-xs uppercase tracking-widest text-text-muted mb-2">Portfolio Curation</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <button 
                  onClick={() => handleCategoryChange("villa")}
                  className={`text-2xl sm:text-3xl md:text-4xl font-light text-left transition-all ${
                    activeCategory === "villa"
                      ? "text-primary border-b border-accent pb-1"
                      : "text-text-muted/40 hover:text-primary"
                  }`}
                >
                  Selected Residences
                </button>
                <span className="text-xl sm:text-2xl md:text-3xl font-light text-text-muted/30">/</span>
                <button 
                  onClick={() => handleCategoryChange("land")}
                  className={`text-2xl sm:text-3xl md:text-4xl font-light text-left transition-all ${
                    activeCategory === "land"
                      ? "text-primary border-b border-accent pb-1"
                      : "text-text-muted/40 hover:text-primary"
                  }`}
                >
                  Land Plots
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
                      key={activeProperty.id}
                      src={activeProperty.image}
                      alt={activeProperty.title}
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
                  
                  {/* Subtle Image Overlay on Hover */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-secondary/90 text-primary text-xs uppercase tracking-widest px-5 py-2.5 rounded-full shadow-md backdrop-blur-sm flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 font-semibold">
                      View Full Details <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Corner indicator */}
                  <div className="absolute bottom-4 left-4 bg-secondary/80 backdrop-blur-sm text-primary text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-md border border-border-custom font-semibold">
                    0{filteredProperties.indexOf(activeProperty) + 1} / 0{filteredProperties.length}
                  </div>
                </div>

                {/* Flexible Thumbnail selector list */}
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {filteredProperties.map((property) => (
                    <button
                      key={property.id}
                      onClick={() => handlePropertyChange(property)}
                      className={`relative w-16 sm:w-24 aspect-[4/3] rounded-lg overflow-hidden border transition-all duration-300 ${
                        activeProperty.id === property.id
                          ? "border-accent ring-1 ring-accent"
                          : "border-border-custom hover:border-text-muted"
                      }`}
                    >
                      <img 
                        src={property.image} 
                        alt={property.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=300&auto=format&fit=crop`;
                        }}
                      />
                      {activeProperty.id !== property.id && (
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

              {/* Core Specs Grid - Dynamic based on type */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProperty.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="grid grid-cols-2 gap-4 bg-card-bg/60 p-4 sm:p-6 rounded-2xl border border-border-custom"
                >
                  {activeProperty.type === "villa" ? (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                          <Bed className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">Bedrooms</span>
                          <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.bedrooms} Ensuite</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                          <Bath className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">Bathrooms</span>
                          <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.bathrooms} Baths</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                          <Maximize className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">Land Size</span>
                          <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.landArea}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">Building Size</span>
                          <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.buildingArea}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">Pool Size</span>
                          <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.pool}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">Primary View</span>
                          <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.view}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                          <Maximize className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">Total Land</span>
                          <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.landArea}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">Zoning</span>
                          <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.zoning}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">Min Rental</span>
                          <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.minRental}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">Lease Term</span>
                          <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.leaseTerm}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">Access Road</span>
                          <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{activeProperty.access}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-secondary border border-border-custom text-accent flex-shrink-0">
                          <Tag className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted">Status</span>
                          <span className="text-xs sm:text-sm font-semibold text-accent block truncate">Leasehold</span>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Call to action & Brochure */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsInquiryOpen(true)}
                  className="flex-1 bg-accent text-secondary hover:bg-accent-hover text-xs uppercase tracking-widest py-4 px-6 rounded-xl font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2 group text-center"
                >
                  {activeProperty.type === "villa" ? "Request Private Viewing" : "Inquire Lease Details"}
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                
                <button 
                  onClick={() => setIsGalleryOpen(true)}
                  className="bg-transparent border border-border-custom text-primary hover:border-text-muted text-xs uppercase tracking-widest py-4 px-6 rounded-xl font-medium transition-colors text-center"
                >
                  View Specifications
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* --- PHILOSOPHY STATEMENT --- */}
      <section className="py-16 md:py-20 bg-card-bg/30 border-b border-border-custom">
        <div className="editorial-container max-w-4xl space-y-8 md:space-y-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Our Philosophy</p>
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-light text-primary leading-snug">
            "Space is not defined by walls, but by the quiet voids left between them."
          </h3>
          <p className="text-text-muted text-sm max-w-2xl mx-auto leading-relaxed">
            SKY Property Bali acts as a boutique developer and broker focusing exclusively on properties with architectural integrity. We reject uniform developments in favor of organic textures, local materials, and space layouts that prioritize silence, airflow, and wellness.
          </p>
        </div>
      </section>

      {/* --- REASSURING TRUST FOOTER ACCENT --- */}
      <section className="py-12 border-b border-border-custom">
        <div className="editorial-container grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold block">01 / Curated Portfolio</span>
            <p className="text-xs text-text-muted">Every property in our index undergoes rigorous architectural and legal vetting.</p>
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold block">02 / Seamless Transactions</span>
            <p className="text-xs text-text-muted">Full notary support, legal frameworks for international ownership, and transparent escrows.</p>
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold block">03 / Architecture Advisory</span>
            <p className="text-xs text-text-muted">We collaborate with Bali's leading creative design studios to assist your renovation or builds.</p>
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
                A high-fidelity curation of premium minimalist villas, design estates, and plot developments.
              </p>
            </div>
            
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-4">Locations</span>
              <ul className="text-xs text-secondary/70 space-y-2">
                <li>Uluwatu, Bali</li>
                <li>Nusa Lembongan, Bali</li>
                <li>Canggu & Pererenan, Bali</li>
                <li>Jimbaran, Bali</li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-4">Contact</span>
              <ul className="text-xs text-secondary/70 space-y-2">
                <li>inquire@skypropertybali.com</li>
                <li>+62 812 3456 7890</li>
                <li>Jalan Pantai Bingin, Uluwatu, Bali</li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-4">Newsletter</span>
              <p className="text-xs text-secondary/50 mb-3">Join our list for off-market villa offerings.</p>
              <div className="flex border-b border-secondary/20 pb-2">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-transparent text-xs w-full text-secondary placeholder:text-secondary/40 focus:outline-none"
                />
                <button className="text-accent hover:text-accent-hover transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          <div className="border-t border-secondary/15 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-secondary/40">
            <p>&copy; {new Date().getFullYear()} SKY Property Bali. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-secondary/80">Privacy Policy</a>
              <a href="#" className="hover:text-secondary/80">Terms of Service</a>
              <a href="#" className="hover:text-secondary/80">Instagram</a>
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
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">Direct Inquiry</span>
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
                  <h4 className="text-2xl sm:text-3xl font-light text-primary">Let's Connect</h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Submit your interest details below. Our property adviser will follow up via email or phone within 12 hours.
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
                    <h5 className="text-lg font-medium text-primary">Inquiry Sent</h5>
                    <p className="text-xs text-text-muted">
                      Thank you. We have registered your inquiry for <strong className="text-primary">{activeProperty.title}</strong>.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted block">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="John Doe" 
                        className="w-full bg-card-bg/60 border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary placeholder:text-text-muted/40"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted block">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="john@example.com" 
                        className="w-full bg-card-bg/60 border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary placeholder:text-text-muted/40"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted block">Selected Property</label>
                      <div className="w-full bg-card-bg border border-border-custom rounded-xl px-4 py-3 text-sm flex justify-between items-center text-primary">
                        <span className="font-semibold text-xs truncate max-w-[150px]">{activeProperty.title}</span>
                        <span className="text-xs text-accent font-medium">{activeProperty.price}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted block">Message</label>
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
                      Submit Inquiry
                    </button>
                  </form>
                )}
              </div>

              {/* Footer */}
              <div className="text-[10px] text-text-muted border-t border-border-custom pt-4 sm:pt-6 flex items-center justify-between flex-shrink-0">
                <span>WhatsApp Hotline</span>
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
                <span>Close</span>
                <X className="w-4 h-4 transform group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Content view: Large image left, specifications grid right */}
            <div className="flex-1 overflow-y-auto no-scrollbar py-6 sm:py-8 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Image box */}
              <div className="lg:col-span-7 space-y-4">
                <div className="aspect-[4/3] md:aspect-[16/10] bg-secondary/5 rounded-2xl overflow-hidden border border-secondary/10 relative">
                  <img 
                    src={activeProperty.image} 
                    alt={activeProperty.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop`;
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-secondary/50">
                  <span>Scroll to review technical specifications</span>
                  <span>Price: <strong className="text-accent">{activeProperty.price}</strong></span>
                </div>
              </div>

              {/* Specs and Bullet points */}
              <div className="lg:col-span-5 space-y-6 sm:space-y-8">
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-widest text-accent font-semibold">Property Spec Sheet</span>
                  <h3 className="text-3xl sm:text-4xl font-light text-secondary">Technical Details</h3>
                  <p className="text-secondary/70 text-sm leading-relaxed">
                    Designed to international standards, incorporating high-quality structural engineering, luxury fittings, and architectural finishes designed for tropical climates.
                  </p>
                </div>

                {/* Table details - Dynamic based on type */}
                <div className="border-t border-secondary/10 divide-y divide-secondary/10 text-xs sm:text-sm">
                  <div className="py-3 flex justify-between">
                    <span className="text-secondary/50 font-light">Location</span>
                    <span className="font-medium text-secondary">{activeProperty.location}</span>
                  </div>
                  {activeProperty.type === "villa" ? (
                    <>
                      <div className="py-3 flex justify-between">
                        <span className="text-secondary/50 font-light">Bedrooms</span>
                        <span className="font-medium text-secondary">{activeProperty.bedrooms} Ensuite Bedrooms</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-secondary/50 font-light">Bathrooms</span>
                        <span className="font-medium text-secondary">{activeProperty.bathrooms} Baths</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-secondary/50 font-light">Land Area</span>
                        <span className="font-medium text-secondary">{activeProperty.landArea}</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-secondary/50 font-light">Building Size</span>
                        <span className="font-medium text-secondary">{activeProperty.buildingArea}</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-secondary/50 font-light">Swimming Pool</span>
                        <span className="font-medium text-secondary">{activeProperty.pool}</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-secondary/50 font-light">View</span>
                        <span className="font-medium text-secondary">{activeProperty.view}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="py-3 flex justify-between">
                        <span className="text-secondary/50 font-light">Land Area</span>
                        <span className="font-medium text-secondary">{activeProperty.landArea}</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-secondary/50 font-light">Zoning</span>
                        <span className="font-medium text-secondary">{activeProperty.zoning}</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-secondary/50 font-light">Lease Term</span>
                        <span className="font-medium text-secondary">{activeProperty.leaseTerm}</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-secondary/50 font-light">Min Rental</span>
                        <span className="font-medium text-secondary">{activeProperty.minRental}</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-secondary/50 font-light">Primary Access</span>
                        <span className="font-medium text-secondary">{activeProperty.access}</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-secondary/50 font-light">Surrounding View</span>
                        <span className="font-medium text-secondary">{activeProperty.view}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Additional bullet specifics */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-secondary/40 block">Key Features</span>
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
                    Inquire About This Property
                  </button>
                </div>
              </div>

            </div>

            {/* Navigation footer */}
            <div className="p-4 sm:p-6 md:p-8 border-t border-secondary/10 flex items-center justify-between text-[11px] sm:text-xs text-secondary/40 max-w-7xl mx-auto w-full flex-shrink-0">
              <span>{activeProperty.type === "villa" ? "Villa" : "Land"} {filteredProperties.indexOf(activeProperty) + 1} of {filteredProperties.length}</span>
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    const currentIndex = filteredProperties.indexOf(activeProperty);
                    const prevIndex = currentIndex === 0 ? filteredProperties.length - 1 : currentIndex - 1;
                    setActiveProperty(filteredProperties[prevIndex]);
                  }}
                  className="hover:text-secondary flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
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
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
