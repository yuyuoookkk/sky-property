// Property data supporting both lease and sale land listings
export interface Property {
  id: number;
  slug: string;
  type: "lease" | "sale";
  title: string;
  location: string;
  price: string;
  images: string[];
  description: string;
  details: string[];

  // Bilingual content (auto-translated)
  description_en?: string;
  description_id?: string;
  details_en?: string[];
  details_id?: string[];

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

export const PROPERTIES: Property[] = [
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
