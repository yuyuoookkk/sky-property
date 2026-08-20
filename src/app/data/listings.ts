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
  title_en?: string;
  title_id?: string;
  description_en?: string;
  description_id?: string;
  details_en?: string[];
  details_id?: string[];
  zoning_en?: string;
  zoning_id?: string;
  leaseTerm_en?: string;
  leaseTerm_id?: string;
  access_en?: string;
  access_id?: string;
  view_en?: string;
  view_id?: string;
  status_en?: string;
  status_id?: string;
  frontage_en?: string;
  frontage_id?: string;

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
    "id": 1,
    "slug": "tanah-strategis-jalan-utama-labuan-sait-uluwatu-bali",
    "type": "lease",
    "title": "TANAH STRATEGIS JALAN UTAMA LABUAN SAIT – ULUWATU, BALI",
    "location": "Labuan Sait, Uluwatu, Bali",
    "price": "Rp45.000.000 / are / tahun",
    "images": [
      "/assets/2-8-hektar-labuan-sait/1.jpeg",
      "/assets/2-8-hektar-labuan-sait/2.jpeg",
      "/assets/2-8-hektar-labuan-sait/3.jpeg"
    ],
    "landArea": "2.8 Hektare (28,000 m²)",
    "zoning": "Kuning",
    "leaseTerm": "5 tahun",
    "minRental": "5 are (500 m²)",
    "access": "yang sangat mudah menuju berbagai destinasi wisata terkenal, menjadikan lahan ini ideal untuk investasi maupun pengembangan properti jangka panjang.",
    "view": "",
    "status": "",
    "frontage": "",
    "description": "Kesempatan terbaik untuk menyewa lahan di salah satu kawasan paling berkembang dan diminati di Bali Selatan. Berada di koridor utama pariwisata Uluwatu dengan akses yang sangat mudah menuju berbagai destinasi wisata terkenal, menjadikan lahan ini ideal untuk investasi maupun pengembangan properti jangka panjang.",
    "details": [
      "Berada di area yang dikelilingi villa, resort, restoran, beach club, dan destinasi wisata kelas dunia.",
      "± 5 menit ke Pantai Padang Padang",
      "± 5 menit ke El Kabron Bali",
      "± 7 menit ke Pantai Dreamland",
      "± 7 menit ke Ulu Cliffhouse",
      "± 7 menit ke Pantai Nyang Nyang"
    ]
  },
  {
    "id": 2,
    "slug": "casa-de-harvest-luxury-freehold-villa-for-sale-ungasan",
    "type": "sale",
    "title": "CASA DE HARVEST – Luxury Freehold Villa for Sale, Ungasan",
    "location": "Ungasan, Bali",
    "price": "Rp4.950.000.000",
    "images": [
      "/assets/casa-de-harvest-villa/1.jpeg",
      "/assets/casa-de-harvest-villa/2.jpeg",
      "/assets/casa-de-harvest-villa/3.jpeg",
      "/assets/casa-de-harvest-villa/4.jpeg",
      "/assets/casa-de-harvest-villa/5.jpeg",
      "/assets/casa-de-harvest-villa/6.jpeg",
      "/assets/casa-de-harvest-villa/7.jpeg",
      "/assets/casa-de-harvest-villa/8.jpeg",
      "/assets/casa-de-harvest-villa/9.jpeg",
      "/assets/casa-de-harvest-villa/10.jpeg",
      "/assets/casa-de-harvest-villa/11.jpeg",
      "/assets/casa-de-harvest-villa/12.jpeg",
      "/assets/casa-de-harvest-villa/13.jpeg",
      "/assets/casa-de-harvest-villa/14.jpeg",
      "/assets/casa-de-harvest-villa/15.jpeg",
      "/assets/casa-de-harvest-villa/16.jpeg",
      "/assets/casa-de-harvest-villa/17.jpeg",
      "/assets/casa-de-harvest-villa/18.jpeg",
      "/assets/casa-de-harvest-villa/19.jpeg",
      "/assets/casa-de-harvest-villa/20.jpeg",
      "/assets/casa-de-harvest-villa/21.jpeg",
      "/assets/casa-de-harvest-villa/22.jpeg",
      "/assets/casa-de-harvest-villa/23.jpeg",
      "/assets/casa-de-harvest-villa/24.jpeg",
      "/assets/casa-de-harvest-villa/25.jpeg",
      "/assets/casa-de-harvest-villa/26.jpeg",
      "/assets/casa-de-harvest-villa/27.jpeg",
      "/assets/casa-de-harvest-villa/28.jpeg",
      "/assets/casa-de-harvest-villa/29.jpeg",
      "/assets/casa-de-harvest-villa/30.jpeg",
      "/assets/casa-de-harvest-villa/31.jpeg",
      "/assets/casa-de-harvest-villa/32.jpeg",
      "/assets/casa-de-harvest-villa/33.jpeg",
      "/assets/casa-de-harvest-villa/34.jpeg",
      "/assets/casa-de-harvest-villa/35.jpeg",
      "/assets/casa-de-harvest-villa/36.jpeg",
      "/assets/casa-de-harvest-villa/37.jpeg",
      "/assets/casa-de-harvest-villa/38.jpeg",
      "/assets/casa-de-harvest-villa/39.jpeg",
      "/assets/casa-de-harvest-villa/40.jpeg",
      "/assets/casa-de-harvest-villa/41.jpeg",
      "/assets/casa-de-harvest-villa/42.jpeg",
      "/assets/casa-de-harvest-villa/43.jpeg"
    ],
    "landArea": "255 m²",
    "zoning": "",
    "leaseTerm": "",
    "minRental": "",
    "access": "yang mudah ke berbagai destinasi favorit.",
    "view": "",
    "status": "SHM (Freehold)",
    "frontage": "",
    "description": "Temukan kenyamanan dan kemewahan dalam CASA DE HARVEST, sebuah villa modern yang dirancang untuk menghadirkan suasana tenang di kawasan Ungasan, Bali. Berlokasi di salah satu area dengan pertumbuhan investasi tercepat di Bali Selatan, villa ini menawarkan perpaduan sempurna antara desain elegan, privasi, dan akses yang mudah ke berbagai destinasi favorit.",
    "details": [
      "Akses Jalan: Hotmix 6 Meter",
      "Luas Tanah: 255 m²",
      "3 Kamar Tidur (En-suite)",
      "Private Swimming Pool",
      "±3 menit ke Jalan Raya Bali Cliff",
      "±5 menit ke Jalan Raya Uluwatu"
    ]
  },
  {
    "id": 3,
    "slug": "tanah-los-tebing-ocean-view-uluwatu-bali",
    "type": "sale",
    "title": "TANAH LOS TEBING OCEAN VIEW – ULUWATU, BALI",
    "location": "Uluwatu, Bali",
    "price": "Rp 2.5B / Are (SHM)",
    "images": [
      "/assets/dijual-tanah-los-tebing/1.jpeg",
      "/assets/dijual-tanah-los-tebing/2.jpeg",
      "/assets/dijual-tanah-los-tebing/3.jpeg"
    ],
    "landArea": "18.7 Are (1,870 m²)",
    "zoning": "pariwisata, menjadikannya pilihan ideal untuk investasi maupun pengembangan proyek hospitality kelas atas.",
    "leaseTerm": "",
    "minRental": "",
    "access": "",
    "view": "– ULUWATU, BALI",
    "status": "Hak Milik)",
    "frontage": "",
    "description": "Peluang langka memiliki tanah los tebing (cliff front) dengan panorama laut yang spektakuler di salah satu lokasi paling eksklusif di Bali. Berada di kawasan wisata internasional Uluwatu, properti ini menawarkan kombinasi sempurna antara ocean view, lokasi premium, dan zonasi pariwisata, menjadikannya pilihan ideal untuk investasi maupun pengembangan proyek hospitality kelas atas.",
    "details": [
      "Luas Tanah: 18,7 Are (1.870 m²)",
      "± 2 menit ke Ulu Cliffhouse",
      "± 3 menit ke Pantai Padang Padang",
      "± 5 menit ke Pantai Single Fin Bali",
      "± 7 menit ke El Kabron Bali",
      "± 7 menit ke Pura Uluwatu"
    ]
  },
  {
    "id": 4,
    "slug": "tanah-strategis-kampial-nusa-dua-bali",
    "type": "lease",
    "title": "TANAH STRATEGIS KAMPIAL – NUSA DUA, BALI",
    "location": "Kampial, Nusa Dua, Bali",
    "price": "Rp10.000.000 / are / tahun",
    "images": [
      "/assets/dukuh-sari-2/1.jpeg",
      "/assets/dukuh-sari-2/2.jpeg"
    ],
    "landArea": "20 Are (2,000 m²)",
    "zoning": "Kuning",
    "leaseTerm": "5 tahun",
    "minRental": "2 are",
    "access": "mudah menuju pusat Nusa Dua, Jimbaran, dan area wisata Bali Selatan",
    "view": "",
    "status": "",
    "frontage": "",
    "description": "Jalan Dukuh Sari 2, Kampial – Lingkungan Villa & Kos Elit",
    "details": [
      "Jalan Dukuh Sari 2, Kampial – Lingkungan Villa & Kos Elit",
      "Berada di kawasan Kampial yang terus berkembang dengan lingkungan yang nyaman dan bernilai investasi tinggi:",
      "± 5 menit ke Politeknik Pariwisata Bali (Poltekpar Bali)",
      "± 5 menit ke pusat kebugaran (gym & fitness center)",
      "± 15 menit ke RS Surya Husadha Nusa Dua",
      "Dekat kawasan villa premium dan kos eksklusif"
    ]
  },
  {
    "id": 5,
    "slug": "bekas-restoran-dijual-tanjung-benoa-nusa-dua",
    "type": "sale",
    "title": "Bekas Restoran Dijual – Tanjung Benoa, Nusa Dua",
    "location": "Tanjung Benoa, Nusa Dua, Bali",
    "price": "Rp 12B (Global)",
    "images": [
      "/assets/gedung-bekas-resto-dijual/1.jpeg",
      "/assets/gedung-bekas-resto-dijual/2.jpeg",
      "/assets/gedung-bekas-resto-dijual/3.jpeg",
      "/assets/gedung-bekas-resto-dijual/4.jpeg"
    ],
    "landArea": "472 m²",
    "zoning": "Kuning",
    "leaseTerm": "",
    "minRental": "",
    "access": "yang mudah, serta pemandangan pantai yang menawan, properti ini memiliki nilai investasi yang sangat menjanjikan.",
    "view": "langsung ke Pantai Tanjung Benoa. Sangat cocok untuk dikembangkan kembali menjadi restoran, beach club, café, boutique hotel, maupun usaha komersial lainnya.",
    "status": "SHM (Sertifikat Hak Milik)",
    "frontage": "",
    "description": "Peluang investasi premium di kawasan wisata Tanjung Benoa, Nusa Dua. Properti ini merupakan bekas restoran yang sudah memiliki bangunan dan berada di lokasi strategis dengan view langsung ke Pantai Tanjung Benoa. Sangat cocok untuk dikembangkan kembali menjadi restoran, beach club, café, boutique hotel, maupun usaha komersial lainnya.",
    "details": [
      "Luas Tanah: 472 m²",
      "Cocok untuk berbagai kebutuhan bisnis dan investasi",
      "±12 menit ke Bandara Internasional I Gusti Ngurah Rai",
      "±5 menit ke kawasan Pantai ITDC Nusa Dua",
      "±10 menit ke RS Surya Husadha Nusa Dua",
      "Berada dekat dengan berbagai hotel bintang 5 di kawasan Nusa Dua"
    ]
  },
  {
    "id": 6,
    "slug": "tanah-disewakan-dekat-gedung-rektorat-universitas-udayana-jimbaran",
    "type": "lease",
    "title": "Tanah Disewakan – Dekat Gedung Rektorat Universitas Udayana, Jimbaran",
    "location": "Jimbaran, Bali",
    "price": "Rp12.000.000 / are / tahun",
    "images": [
      "/assets/gedung-rektorat/1.jpeg",
      "/assets/gedung-rektorat/2.jpeg",
      "/assets/gedung-rektorat/3.jpeg",
      "/assets/gedung-rektorat/4.jpeg",
      "/assets/gedung-rektorat/5.jpeg",
      "/assets/gedung-rektorat/6.jpeg",
      "/assets/gedung-rektorat/7.jpeg"
    ],
    "landArea": "61 Are (6,100 m²)",
    "zoning": "Kuning",
    "leaseTerm": "Hingga 20 Tahun",
    "minRental": "2 Are",
    "access": "5 Meter",
    "view": "",
    "status": "SHM (Sertifikat Hak Milik)",
    "frontage": "Akses: 5 Meter",
    "description": "Miliki kesempatan menyewa lahan di kawasan strategis Jimbaran yang berada sangat dekat dengan Gedung Rektorat Universitas Udayana. Lokasi ini sangat potensial untuk pembangunan rumah kos, hunian, maupun investasi properti karena berada di area dengan permintaan tinggi dari mahasiswa dan pekerja.",
    "details": [
      "Tanah Disewakan – Dekat Gedung Rektorat Universitas Udayana, Jimbaran",
      "Lokasi: Dekat Gedung Rektorat Universitas Udayana, Jimbaran",
      "Luas Tanah Total: 61 Are",
      "Berlokasi sangat dekat dengan Gedung Rektorat Universitas Udayana",
      "Sangat cocok untuk pembangunan rumah kos mahasiswa, kontrakan, villa, maupun hunian",
      "Akses jalan yang memadai untuk kendaraan roda dua maupun roda empat"
    ]
  },
  {
    "id": 7,
    "slug": "tanah-strategis-di-goa-gong-jimbaran-bali",
    "type": "lease",
    "title": "TANAH STRATEGIS DI GOA GONG, JIMBARAN – BALI",
    "location": "Goa Gong, Jimbaran, Bali",
    "price": "Rp17.000.000 / are / tahun",
    "images": [
      "/assets/goagong-17-juta/1.jpeg",
      "/assets/goagong-17-juta/2.jpeg",
      "/assets/goagong-17-juta/3.jpeg"
    ],
    "landArea": "5 Are (500 m²)",
    "zoning": "Kuning",
    "leaseTerm": "Minimal: 5 tahun",
    "minRental": "5 tahun",
    "access": "yang sangat baik, tanah ini cocok untuk pembangunan villa, guest house, kost eksklusif, ruko, kantor, maupun berbagai usaha komersial lainnya.",
    "view": "",
    "status": "",
    "frontage": "± 18 meter",
    "description": "Peluang terbaik untuk investasi maupun pengembangan usaha di kawasan Jimbaran yang terus berkembang. Berada di jalan utama dengan akses yang sangat baik, tanah ini cocok untuk pembangunan villa, guest house, kost eksklusif, ruko, kantor, maupun berbagai usaha komersial lainnya.",
    "details": [
      "Luas Tanah: 5 are (500 m²)",
      "Berada di kawasan yang berkembang pesat dengan akses cepat ke berbagai fasilitas penting:",
      "± 3 menit ke Kampus Udayana (UNUD) Jimbaran",
      "± 5 menit ke RS Universitas Udayana",
      "± 7 menit ke RS Bali Jimbaran",
      "± 7 menit ke Sidewalk Jimbaran"
    ]
  },
  {
    "id": 8,
    "slug": "tanah-strategis-goa-gong-bawah-jimbaran-bali",
    "type": "lease",
    "title": "TANAH STRATEGIS GOA GONG BAWAH – JIMBARAN, BALI",
    "location": "Goa Gong, Jimbaran, Bali",
    "price": "Rp12.000.000 / are / tahun",
    "images": [
      "/assets/goagong-6-are/1.jpeg"
    ],
    "landArea": "6 Are (600 m²)",
    "zoning": "Kuning",
    "leaseTerm": "5 tahun",
    "minRental": "3 are",
    "access": "dari dua sisi jalan (depan dan belakang) sehingga memberikan fleksibilitas tinggi untuk berbagai kebutuhan pembangunan maupun investasi jangka panjang.",
    "view": "",
    "status": "",
    "frontage": "± 5 meter",
    "description": "Kesempatan sewa tanah di kawasan berkembang dan sangat strategis di Jimbaran. Memiliki akses dari dua sisi jalan (depan dan belakang) sehingga memberikan fleksibilitas tinggi untuk berbagai kebutuhan pembangunan maupun investasi jangka panjang.",
    "details": [
      "Akses Jalan: 2 akses jalan (depan & belakang)",
      "Berada di kawasan yang ramai dan berkembang dengan akses mudah ke berbagai fasilitas penting:",
      "± 3 menit ke Kampus Udayana (UNUD) Jimbaran",
      "± 5 menit ke RS Universitas Udayana",
      "± 7 menit ke RS Bali Jimbaran",
      "± 7 menit ke Sidewalk Jimbaran Mall"
    ]
  },
  {
    "id": 9,
    "slug": "freehold-villa-for-sale-jalan-tukad-jinah-ungasan",
    "type": "sale",
    "title": "Freehold Villa for Sale – Jalan Tukad Jinah, Ungasan",
    "location": "Jl. Tukad Jinah, Ungasan, Bali",
    "price": "Rp3.700.000.000 / unit",
    "images": [
      "/assets/jinah-villa/1.jpeg",
      "/assets/jinah-villa/2.jpeg",
      "/assets/jinah-villa/3.jpeg",
      "/assets/jinah-villa/4.jpeg",
      "/assets/jinah-villa/5.jpeg",
      "/assets/jinah-villa/6.jpeg",
      "/assets/jinah-villa/7.jpeg",
      "/assets/jinah-villa/8.jpeg",
      "/assets/jinah-villa/9.jpeg",
      "/assets/jinah-villa/10.jpeg",
      "/assets/jinah-villa/11.jpeg",
      "/assets/jinah-villa/12.jpeg",
      "/assets/jinah-villa/13.jpeg",
      "/assets/jinah-villa/14.jpeg"
    ],
    "landArea": "125 m²",
    "zoning": "",
    "leaseTerm": "",
    "minRental": "",
    "access": "mudah ke berbagai destinasi wisata terbaik di Bali. Berada di lingkungan villa yang eksklusif dengan akses jalan hotmix, properti ini sangat cocok sebagai hunian pribadi maupun investasi jangka panjang.",
    "view": "",
    "status": "Freehold (SHM)",
    "frontage": "",
    "description": "Miliki villa modern di kawasan premium Ungasan yang menawarkan kenyamanan, privasi, dan akses mudah ke berbagai destinasi wisata terbaik di Bali. Berada di lingkungan villa yang eksklusif dengan akses jalan hotmix, properti ini sangat cocok sebagai hunian pribadi maupun investasi jangka panjang.",
    "details": [
      "Luas Tanah: 125 m²",
      "3 Kamar Tidur",
      "Private Swimming Pool",
      "Akses Jalan Hotmix",
      "Berada di lingkungan villa yang aman dan nyaman",
      "Berada di kawasan premium Jalan Tukad Jinah, Ungasan"
    ]
  },
  {
    "id": 10,
    "slug": "tanah-premium-ocean-view-labuan-sait-uluwatu",
    "type": "lease",
    "title": "TANAH PREMIUM OCEAN VIEW – LABUAN SAIT, ULUWATU",
    "location": "Labuan Sait, Uluwatu, Bali",
    "price": "Rp45.000.000 / are / tahun",
    "images": [
      "/assets/labuan-sait/1.jpeg",
      "/assets/labuan-sait/2.jpeg",
      "/assets/labuan-sait/3.jpeg",
      "/assets/labuan-sait/4.jpeg",
      "/assets/labuan-sait/5.jpeg"
    ],
    "landArea": "1.5 Hektare (15,000 m²)",
    "zoning": "Pink (Pariwisata)",
    "leaseTerm": "10 Tahun",
    "minRental": "75 are (7.500 m²)",
    "access": "utama, serta memiliki pemandangan laut (ocean view) yang memukau, menjadikan properti ini sangat ideal untuk pengembangan resort, villa mewah, beach club, hotel butik, maupun investasi skala besar.",
    "view": "– LABUAN SAIT, ULUWATU",
    "status": "",
    "frontage": "",
    "description": "Peluang langka untuk menyewa lahan premium di salah satu kawasan pariwisata paling eksklusif di Bali. Berada di posisi hook (sudut) dengan dua akses jalan utama, serta memiliki pemandangan laut (ocean view) yang memukau, menjadikan properti ini sangat ideal untuk pengembangan resort, villa mewah, beach club, hotel butik, maupun investasi skala besar.",
    "details": [
      "Potensi Sewa Jangka Panjang: Hingga 25 Tahun",
      "± 5 menit ke Pantai Padang Padang",
      "± 5 menit ke El Kabron Bali",
      "± 7 menit ke Pantai Dreamland",
      "± 10 menit ke Pura Uluwatu",
      "± 10 menit ke New Kuta Golf Bali"
    ]
  },
  {
    "id": 11,
    "slug": "tanah-dijual-jl-merak-1-ungasan",
    "type": "sale",
    "title": "Tanah Dijual – Jl. Merak 1, Ungasan",
    "location": "Jl. Merak 1, Ungasan, Bali",
    "price": "Rp 800M (Global / Nett)",
    "images": [
      "/assets/merak-1-ungasan/1.jpeg",
      "/assets/merak-1-ungasan/2.jpeg",
      "/assets/merak-1-ungasan/3.jpeg",
      "/assets/merak-1-ungasan/4.jpeg",
      "/assets/merak-1-ungasan/5.jpeg",
      "/assets/merak-1-ungasan/6.jpeg",
      "/assets/merak-1-ungasan/7.jpeg",
      "/assets/merak-1-ungasan/8.jpeg"
    ],
    "landArea": "1.42 Are (140 m²)",
    "zoning": "Kuning",
    "leaseTerm": "",
    "minRental": "",
    "access": "yang nyaman dan legalitas SHM, lahan ini cocok untuk pembangunan villa, rumah tinggal, maupun sebagai aset investasi properti.",
    "view": "",
    "status": "SHM (Sertifikat Hak Milik)",
    "frontage": "±6 Meter",
    "description": "Kesempatan memiliki lahan di kawasan Ungasan yang berada di lingkungan kompleks villa. Dengan akses jalan yang nyaman dan legalitas SHM, lahan ini cocok untuk pembangunan villa, rumah tinggal, maupun sebagai aset investasi properti.",
    "details": [
      "Luas Tanah: 1,42 Are / ±140 m²",
      "Berada di lingkungan villa yang nyaman",
      "Berada di dalam kompleks villa",
      "Akses jalan ±6 meter",
      "Cocok untuk pembangunan villa maupun rumah tinggal",
      "Berpotensi menjadi aset investasi di kawasan Ungasan"
    ]
  },
  {
    "id": 12,
    "slug": "tanah-los-tebing-premium-pantai-melasti-ungasan-bali",
    "type": "lease",
    "title": "TANAH LOS TEBING PREMIUM – PANTAI MELASTI, UNGASAN, BALI",
    "location": "Pantai Melasti, Ungasan, Bali",
    "price": "Rp50.000.000 / Are / Tahun",
    "images": [
      "/assets/pantai-melasti/1.jpeg",
      "/assets/pantai-melasti/2.jpeg",
      "/assets/pantai-melasti/3.jpeg",
      "/assets/pantai-melasti/4.jpeg"
    ],
    "landArea": "43 Are (4,300 m²)",
    "zoning": "Pink (Pariwisata)",
    "leaseTerm": "Harga Sewa: Rp50 Juta / Are / Tahun",
    "minRental": "",
    "access": "mudah ke berbagai destinasi terkenal dan fasilitas premium.",
    "view": "",
    "status": "",
    "frontage": "",
    "description": "Kesempatan langka untuk menyewa lahan premium di salah satu kawasan pariwisata paling prestisius di Bali. Berada di area los tebing (clifffront) dengan lingkungan yang dikelilingi villa mewah, resort internasional, dan destinasi wisata kelas dunia, menjadikan properti ini sangat ideal untuk pengembangan proyek hospitality maupun investasi jangka panjang.",
    "details": [
      "Luas Tanah: 43 Are (4.300 m²)",
      "Berada di kawasan wisata unggulan yang memiliki akses mudah ke berbagai destinasi terkenal dan fasilitas premium.",
      "± 3 menit ke Pantai Melasti",
      "Berada di atas White Rock Beach Club",
      "± 2 menit ke Ulu Cliffhouse",
      "± 3 menit ke Pantai Padang Padang"
    ]
  },
  {
    "id": 13,
    "slug": "tanah-los-tebing-ocean-view-pantai-nyang-nyang-uluwatu",
    "type": "lease",
    "title": "TANAH LOS TEBING OCEAN VIEW – PANTAI NYANG NYANG, ULUWATU",
    "location": "Pantai Nyang Nyang, Uluwatu, Bali",
    "price": "Rp40.000.000 / Are / Tahun",
    "images": [
      "/assets/pantai-nyangnyang/1.jpeg",
      "/assets/pantai-nyangnyang/2.jpeg"
    ],
    "landArea": "42 Are (4,200 m²)",
    "zoning": "C2 (Campuran)",
    "leaseTerm": "10 Tahun",
    "minRental": "Masa Sewa: 10 Tahun",
    "access": "dekat ke Pantai Nyang Nyang dan pusat pariwisata Uluwatu merupakan aset investasi langka yang sangat potensial untuk proyek hospitality maupun villa eksklusif.",
    "view": "– PANTAI NYANG NYANG, ULUWATU",
    "status": "",
    "frontage": "",
    "description": "Peluang langka untuk menyewa lahan los tebing (clifffront) dengan ocean view yang menakjubkan di kawasan elite Uluwatu. Berada di lingkungan yang telah berkembang pesat dan dikelilingi villa-villa mewah, properti ini menawarkan potensi luar biasa untuk pengembangan proyek hospitality maupun investasi jangka panjang.",
    "details": [
      "Luas Tanah: 42 Are (4.200 m²)",
      "Berada di kawasan premium yang dikelilingi villa eksklusif, resort, beach club, dan berbagai destinasi wisata terkenal Bali Selatan.",
      "± 3 menit ke Pantai Nyang Nyang",
      "± 2 menit ke Ulu Cliffhouse",
      "± 3 menit ke Pantai Padang Padang",
      "± 5 menit ke Single Fin Bali"
    ]
  },
  {
    "id": 14,
    "slug": "rumah-baru-disewakan-jimbaran-bawah-dekat-kampus-udayana",
    "type": "lease",
    "title": "Rumah Baru Disewakan – Jimbaran Bawah, Dekat Kampus Udayana",
    "location": "Jimbaran Bawah, Bali",
    "price": "Rp55.000.000 / tahun",
    "images": [
      "/assets/rumah-sewa-deket-kampus/1.jpeg",
      "/assets/rumah-sewa-deket-kampus/2.jpeg",
      "/assets/rumah-sewa-deket-kampus/3.jpeg"
    ],
    "landArea": "",
    "zoning": "",
    "leaseTerm": "",
    "minRental": "",
    "access": "mudah ke berbagai fasilitas penting.",
    "view": "",
    "status": "",
    "frontage": "",
    "description": "Nikmati kenyamanan tinggal di kawasan strategis Jimbaran dengan lingkungan perumahan yang aman dan nyaman. Rumah baru siap huni ini cocok untuk mahasiswa, keluarga kecil, maupun pekerja yang menginginkan akses mudah ke berbagai fasilitas penting.",
    "details": [
      "Rumah Baru Disewakan – Jimbaran Bawah, Dekat Kampus Udayana",
      "2 Kamar Tidur",
      "Berada di lingkungan perumahan yang nyaman",
      "±5 menit ke Kampus Universitas Udayana (UNUD)",
      "±5 menit ke Halte Bus",
      "±12 menit ke Bandara Internasional I Gusti Ngurah Rai"
    ]
  },
  {
    "id": 15,
    "slug": "tanah-disewakan-jl-melangkaja-1-kutuh-kuta-selatan-badung",
    "type": "lease",
    "title": "Tanah Disewakan – Jl. Melangkaja 1, Kutuh, Kuta Selatan, Badung",
    "location": "Jl. Melangkaja 1, Kutuh, Kuta Selatan",
    "price": "Rp6.000.000 / are / tahun (nett)",
    "images": [
      "/assets/sewa-tanah-melangkaja/1.jpeg",
      "/assets/sewa-tanah-melangkaja/2.jpeg",
      "/assets/sewa-tanah-melangkaja/3.jpeg",
      "/assets/sewa-tanah-melangkaja/4.jpeg",
      "/assets/sewa-tanah-melangkaja/5.jpeg"
    ],
    "landArea": "3.880 m²",
    "zoning": "Kuning",
    "leaseTerm": "Fasilitas & Keunggulan",
    "minRental": "2 Are",
    "access": "",
    "view": "",
    "status": "SHM (Sertifikat Hak Milik)",
    "frontage": "",
    "description": "Kesempatan terbaik untuk menyewa lahan di kawasan berkembang Kuta Selatan. Berlokasi di Jl. Melangkaja 1, Kutuh, tanah ini sangat cocok untuk pembangunan villa, rumah tinggal, maupun investasi jangka panjang. Lingkungan sekitar sudah berkembang dengan adanya villa dan rumah pribadi serta didukung jaringan utilitas yang lengkap.",
    "details": [
      "Luas Tanah: 3.880 m²",
      "Berada di lingkungan yang sudah berkembang dengan villa dan rumah pribadi",
      "Cocok untuk pembangunan villa, rumah tinggal, maupun investasi property"
    ]
  },
  {
    "id": 16,
    "slug": "tanah-disewakan-jimbaran-bawah-bali",
    "type": "lease",
    "title": "Tanah Disewakan – Jimbaran Bawah, Bali",
    "location": "Jimbaran Bawah, Bali",
    "price": "Rp13.000.000 / are / tahun",
    "images": [
      "/assets/tanah-2-5-hekter/1.jpeg",
      "/assets/tanah-2-5-hekter/2.jpeg",
      "/assets/tanah-2-5-hekter/3.jpeg"
    ],
    "landArea": "2.5 Hektare",
    "zoning": "Kuning",
    "leaseTerm": "10 Tahun (dengan opsi perpanjangan)",
    "minRental": "20 Are",
    "access": "yang mudah, tanah ini sangat cocok untuk pembangunan villa, rumah kos, perumahan, maupun proyek investasi lainnya. Lokasinya yang dekat dengan berbagai fasilitas umum menjadikan properti ini memiliki prospek yang sangat menjanjikan.",
    "view": "",
    "status": "SHM (Sertifikat Hak Milik)",
    "frontage": "±8 Meter",
    "description": "Kesempatan menyewa lahan luas di kawasan strategis Jimbaran Bawah. Berada di jalan utama dengan akses yang mudah, tanah ini sangat cocok untuk pembangunan villa, rumah kos, perumahan, maupun proyek investasi lainnya. Lokasinya yang dekat dengan berbagai fasilitas umum menjadikan properti ini memiliki prospek yang sangat menjanjikan.",
    "details": [
      "Luas Tanah Total: 2,5 Hektar (25.000 m²)",
      "Sangat cocok untuk pembangunan villa, rumah kos, maupun rumah tinggal",
      "Berada di jalan utama dengan akses yang sangat mudah",
      "±3 menit ke RS Bali Jimbaran",
      "±3 menit ke McDonald's Jimbaran",
      "±7 menit ke Garuda Wisnu Kencana (GWK)"
    ]
  },
  {
    "id": 17,
    "slug": "tanah-dijual-jl-lingkar-timur-udayana-depan-teknik-sipil-jimbaran",
    "type": "sale",
    "title": "Tanah Dijual – Jl. Lingkar Timur Udayana, Depan Teknik Sipil Jimbaran",
    "location": "Jl. Lingkar Timur Udayana, Jimbaran, Bali",
    "price": "Rp1.000.000.000 / are",
    "images": [
      "/assets/tanah-5-are-lingkar-timur/1.jpeg",
      "/assets/tanah-5-are-lingkar-timur/2.jpeg",
      "/assets/tanah-5-are-lingkar-timur/3.jpeg",
      "/assets/tanah-5-are-lingkar-timur/4.jpeg",
      "/assets/tanah-5-are-lingkar-timur/5.jpeg",
      "/assets/tanah-5-are-lingkar-timur/6.jpeg"
    ],
    "landArea": "5 Are (500 m²)",
    "zoning": "Sarana & Pelayanan Umum",
    "leaseTerm": "",
    "minRental": "",
    "access": "yang sangat mudah",
    "view": "",
    "status": "SHM (Sertifikat Hak Milik)",
    "frontage": "±25 meter × panjang ±20 meter",
    "description": "Miliki lahan komersial di salah satu lokasi paling strategis di kawasan Jimbaran. Berada tepat di depan Jalan Lingkar Timur Udayana dan berhadapan dengan Kampus Teknik Sipil Universitas Udayana, tanah ini memiliki visibilitas tinggi dan sangat potensial untuk berbagai jenis usaha maupun investasi.",
    "details": [
      "Luas Tanah: 5 Are (500 m²)",
      "Sangat cocok untuk berbagai kebutuhan usaha dan investasi",
      "Berada di jalan utama dengan akses yang sangat mudah",
      "Cocok untuk pembangunan ruko, kantor, restoran, café, klinik, minimarket, showroom, maupun bisnis komersial lainnya",
      "Berada di kawasan yang berkembang pesat dengan potensi investasi tinggi",
      "Akses ke Fasilitas Sekitar"
    ]
  },
  {
    "id": 18,
    "slug": "tanah-dijual-jl-parigata-jimbaran-bawah",
    "type": "sale",
    "title": "Tanah Dijual – Jl. Parigata, Jimbaran Bawah",
    "location": "Jl. Parigata, Jimbaran Bawah, Bali",
    "price": "Rp900.000.000 / are",
    "images": [
      "/assets/tanah-bali-paragon/1.jpeg",
      "/assets/tanah-bali-paragon/2.jpeg",
      "/assets/tanah-bali-paragon/3.jpeg",
      "/assets/tanah-bali-paragon/4.jpeg"
    ],
    "landArea": "7.3 Are (730 m²)",
    "zoning": "Kuning",
    "leaseTerm": "",
    "minRental": "",
    "access": "mudah ke berbagai fasilitas umum",
    "view": "",
    "status": "SHM (Sertifikat Hak Milik)",
    "frontage": "±6 Meter",
    "description": "Kesempatan memiliki lahan strategis di kawasan Jimbaran Bawah. Berlokasi di Jl. Parigata, tepat di sebelah Hotel Bali Paragon, tanah ini sangat cocok untuk pembangunan rumah tinggal, rumah kos, maupun investasi properti. Dikelilingi berbagai fasilitas pendidikan, kesehatan, dan kawasan kampus, properti ini menawarkan nilai investasi yang sangat menjanjikan.",
    "details": [
      "Luas Tanah: 2,6 Are (260 m²)",
      "Cocok untuk pembangunan rumah tinggal, rumah kos, maupun investasi",
      "±2 menit ke RS Bali Jimbaran",
      "±2 menit ke Bintang Mandiri School",
      "±5 menit ke Kampus Universitas Udayana (UNUD)",
      "±15 menit ke Bandara Internasional I Gusti Ngurah Rai"
    ]
  },
  {
    "id": 19,
    "slug": "tanah-dijual-murah-dekat-gwk-ungasan",
    "type": "sale",
    "title": "Tanah Dijual Murah – Dekat GWK, Ungasan",
    "location": "Ungasan, Bali",
    "price": "Rp520.000.000 / are (Nego)",
    "images": [
      "/assets/tanah-deket-gwk/1.jpeg",
      "/assets/tanah-deket-gwk/2.jpeg",
      "/assets/tanah-deket-gwk/3.jpeg",
      "/assets/tanah-deket-gwk/4.jpeg",
      "/assets/tanah-deket-gwk/5.jpeg"
    ],
    "landArea": "3.5 Are (350 m²)",
    "zoning": "Kuning",
    "leaseTerm": "",
    "minRental": "",
    "access": "yang baik, serta lokasi strategis dekat berbagai destinasi wisata populer di Bali Selatan. Pilihan ideal untuk membangun villa, rumah tinggal, maupun sebagai aset investasi.",
    "view": "",
    "status": "SHM (Sertifikat Hak Milik)",
    "frontage": "±5 Meter",
    "description": "Kesempatan memiliki tanah dengan harga menarik di kawasan Ungasan, Kuta Selatan, Badung, Bali. Berlokasi dekat dengan Garuda Wisnu Kencana (GWK) dan berada di lingkungan villa, lahan ini sangat cocok untuk pembangunan rumah tinggal, villa, maupun investasi properti.",
    "details": [
      "Tanah Dijual Murah – Dekat GWK, Ungasan",
      "Luas Tanah: 1,5 Are / 150 m²",
      "Berada di lingkungan villa",
      "Cocok untuk pembangunan hunian maupun villa",
      "±8 menit ke Garuda Wisnu Kencana (GWK)",
      "±13 menit ke Pantai Pandawa"
    ]
  },
  {
    "id": 20,
    "slug": "tanah-dijual-dekat-mcdonald-s-jimbaran-kuta-selatan",
    "type": "sale",
    "title": "Tanah Dijual – Dekat McDonald’s Jimbaran, Kuta Selatan",
    "location": "Jimbaran, Kuta Selatan, Bali",
    "price": "Rp800.000.000 / are",
    "images": [
      "/assets/tanah-deket-mcd/1.jpeg",
      "/assets/tanah-deket-mcd/2.jpeg",
      "/assets/tanah-deket-mcd/3.jpeg",
      "/assets/tanah-deket-mcd/4.jpeg",
      "/assets/tanah-deket-mcd/5.jpeg",
      "/assets/tanah-deket-mcd/6.jpeg"
    ],
    "landArea": "4 Are (400 m²)",
    "zoning": "Kuning / Yellow Zone",
    "leaseTerm": "",
    "minRental": "",
    "access": "jalan, tanah ini menawarkan fleksibilitas dan akses yang sangat baik. Sangat cocok untuk pembangunan rumah tinggal, villa, maupun investasi properti.",
    "view": "",
    "status": "3 SHM (Sertifikat Hak Milik)",
    "frontage": "",
    "description": "Kesempatan memiliki lahan strategis di kawasan Jimbaran, Kuta Selatan, Badung, Bali. Berlokasi dekat McDonald’s Jimbaran dengan posisi hook yang mendapatkan dua akses jalan, tanah ini menawarkan fleksibilitas dan akses yang sangat baik. Sangat cocok untuk pembangunan rumah tinggal, villa, maupun investasi properti.",
    "details": [
      "Tanah Dijual – Dekat McDonald’s Jimbaran, Kuta Selatan",
      "Lokasi: Dekat McDonald’s Jimbaran, Kuta Selatan, Badung, Bali",
      "Posisi: Hook – mendapat dua akses jalan",
      "Luas Tanah: 510 m² / 5,10 Are",
      "Akses Jalan: ±5 Meter",
      "Mendapat akses dari 2 jalan"
    ]
  },
  {
    "id": 21,
    "slug": "tanah-dijual-depan-jalan-utama-lingkar-timur-udayana-jimbaran",
    "type": "sale",
    "title": "Tanah Dijual – Depan Jalan Utama Lingkar Timur Udayana, Jimbaran",
    "location": "Jl. Lingkar Timur Udayana, Jimbaran, Bali",
    "price": "Rp900.000.000 / are",
    "images": [
      "/assets/tanah-depan-lingkar-timur-udayana/1.jpeg",
      "/assets/tanah-depan-lingkar-timur-udayana/2.jpeg",
      "/assets/tanah-depan-lingkar-timur-udayana/3.jpeg"
    ],
    "landArea": "5 Are (500 m²)",
    "zoning": "Kuning",
    "leaseTerm": "",
    "minRental": "",
    "access": "yang sangat mudah. Lokasinya sangat ideal untuk berbagai jenis usaha maupun investasi properti karena berada di kawasan yang terus berkembang.",
    "view": "",
    "status": "SHM (Sertifikat Hak Milik)",
    "frontage": "",
    "description": "Peluang investasi terbaik di kawasan Jimbaran! Lahan ini berada tepat di depan Jalan Utama Lingkar Timur Udayana dengan visibilitas tinggi dan akses yang sangat mudah. Lokasinya sangat ideal untuk berbagai jenis usaha maupun investasi properti karena berada di kawasan yang terus berkembang.",
    "details": [
      "Luas Tanah: 8 Are (800 m²)",
      "Sangat cocok untuk berbagai kebutuhan usaha maupun investasi",
      "±3 menit ke Kampus Universitas Udayana (UNUD)",
      "±8 menit ke Sidewalk Jimbaran",
      "±10 menit ke Garuda Wisnu Kencana (GWK)",
      "Berada di jalur utama dengan akses yang mudah dijangkau"
    ]
  },
  {
    "id": 22,
    "slug": "tanah-disewakan-jl-uluwatu-ii-jimbaran-bawah",
    "type": "lease",
    "title": "Tanah Disewakan – Jl. Uluwatu II, Jimbaran Bawah",
    "location": "Jl. Uluwatu II, Jimbaran Bawah, Bali",
    "price": "Rp15.000.000 / are / tahun",
    "images": [
      "/assets/tanah-dewata-pandel/1.jpeg",
      "/assets/tanah-dewata-pandel/2.jpeg",
      "/assets/tanah-dewata-pandel/3.jpeg",
      "/assets/tanah-dewata-pandel/4.jpeg",
      "/assets/tanah-dewata-pandel/5.jpeg"
    ],
    "landArea": "40 Are (4,000 m²)",
    "zoning": "Perdagangan dan Jasa, sehingga sangat ideal untuk berbagai jenis usaha maupun investasi jangka panjang.",
    "leaseTerm": "Hingga 20 Tahun (dengan opsi perpanjangan)",
    "minRental": "20 Are",
    "access": "yang mudah dijangkau",
    "view": "",
    "status": "SHM (Sertifikat Hak Milik)",
    "frontage": "",
    "description": "Peluang terbaik untuk menyewa lahan komersial di kawasan strategis Jimbaran Bawah. Berlokasi di Jl. Uluwatu II, dekat Dewata Padel, tanah ini berada di zona Perdagangan dan Jasa, sehingga sangat ideal untuk berbagai jenis usaha maupun investasi jangka panjang.",
    "details": [
      "Luas Tanah Total: 40 Are (4.000 m²)",
      "Sangat cocok untuk berbagai kebutuhan usaha dan pengembangan bisnis",
      "Berada dekat Dewata Padel",
      "±15 menit ke Bandara Internasional I Gusti Ngurah Rai",
      "±8 menit ke Garuda Wisnu Kencana (GWK)",
      "±5 menit ke RS Bali Jimbaran"
    ]
  },
  {
    "id": 23,
    "slug": "tanah-dijual-jl-gong-cendana-jimbaran",
    "type": "sale",
    "title": "Tanah Dijual – Jl. Gong Cendana, Jimbaran",
    "location": "Jl. Gong Cendana, Jimbaran, Bali",
    "price": "Rp600.000.000 / are (Nego)",
    "images": [
      "/assets/tanah-gong-cendana/1.jpeg",
      "/assets/tanah-gong-cendana/2.jpeg",
      "/assets/tanah-gong-cendana/3.jpeg",
      "/assets/tanah-gong-cendana/4.jpeg",
      "/assets/tanah-gong-cendana/5.jpeg",
      "/assets/tanah-gong-cendana/6.jpeg"
    ],
    "landArea": "7.5 Are (750 m²)",
    "zoning": "Kuning",
    "leaseTerm": "",
    "minRental": "",
    "access": "mudah dijangkau",
    "view": "",
    "status": "SHM (Sertifikat Hak Milik)",
    "frontage": "±50 Meter",
    "description": "Miliki lahan strategis di kawasan Jimbaran yang berkembang pesat. Berlokasi di Jl. Gong Cendana, dekat Kori Nuansa dan Taman Griya, tanah ini sangat cocok untuk pembangunan villa, rumah tinggal, maupun investasi properti dengan nilai yang terus meningkat.",
    "details": [
      "Luas Tanah: 7,5 Are (750 m²)",
      "Lingkungan sekitar sudah terdapat villa dan rumah hunian",
      "Dekat kawasan Kori Nuansa",
      "Akses jalan mudah dijangkau",
      "Berada di kawasan hunian yang berkembang dan memiliki potensi investasi tinggi",
      "Sangat cocok untuk pembangunan villa, rumah tinggal, maupun proyek investasi"
    ]
  },
  {
    "id": 24,
    "slug": "tanah-dijual-dekat-kampus-teknik-sipil-universitas-udayana-jimbaran",
    "type": "sale",
    "title": "Tanah Dijual – Dekat Kampus Teknik Sipil Universitas Udayana, Jimbaran",
    "location": "Jl. Tukad Nangka, Jimbaran, Bali",
    "price": "Rp475.000.000 / are (Nego)",
    "images": [
      "/assets/tanah-kampus-teknik-sipil/1.jpeg",
      "/assets/tanah-kampus-teknik-sipil/2.jpeg",
      "/assets/tanah-kampus-teknik-sipil/3.jpeg",
      "/assets/tanah-kampus-teknik-sipil/4.jpeg",
      "/assets/tanah-kampus-teknik-sipil/5.jpeg",
      "/assets/tanah-kampus-teknik-sipil/6.jpeg"
    ],
    "landArea": "3 Are (300 m²)",
    "zoning": "Kuning",
    "leaseTerm": "",
    "minRental": "",
    "access": "jalan, sehingga sangat cocok untuk pembangunan rumah tinggal, rumah kos, villa, maupun investasi properti.",
    "view": "",
    "status": "2 SHM (Sertifikat Hak Milik)",
    "frontage": "±5 Meter",
    "description": "Kesempatan memiliki lahan strategis di kawasan pendidikan Jimbaran. Berlokasi di Jl. Tukad Nangka, tanah ini berada dekat Kampus Teknik Sipil Universitas Udayana dan memiliki dua akses jalan, sehingga sangat cocok untuk pembangunan rumah tinggal, rumah kos, villa, maupun investasi properti.",
    "details": [
      "Tanah Dijual – Dekat Kampus Teknik Sipil Universitas Udayana, Jimbaran",
      "Luas Tanah: 8 Are (800 m²)",
      "Memiliki 2 akses jalan",
      "Berpotensi menggunakan air sumur bor",
      "Berada dekat Kampus Teknik Sipil Universitas Udayana",
      "Cocok untuk pembangunan rumah tinggal, rumah kos mahasiswa, villa, maupun investasi"
    ]
  },
  {
    "id": 25,
    "slug": "tanah-dijual-jl-merak-2-ungasan",
    "type": "sale",
    "title": "Tanah Dijual – Jl. Merak 2, Ungasan",
    "location": "Jl. Merak 2, Ungasan, Bali",
    "price": "Rp550.000.000 / are (Nett)",
    "images": [
      "/assets/tanah-merak-ungasan/1.jpeg",
      "/assets/tanah-merak-ungasan/2.jpeg",
      "/assets/tanah-merak-ungasan/3.jpeg",
      "/assets/tanah-merak-ungasan/4.jpeg"
    ],
    "landArea": "2.8 Are (280 m²)",
    "zoning": "",
    "leaseTerm": "",
    "minRental": "",
    "access": "serta sirkulasi yang lebih baik. Berada di lingkungan perumahan dengan jalan hotmix dan kondisi tanah datar siap bangun, properti ini sangat cocok untuk pembangunan rumah tinggal maupun investasi.",
    "view": "",
    "status": "SHM (Sertifikat Hak Milik)",
    "frontage": "±25 Meter",
    "description": "Kesempatan memiliki lahan strategis di kawasan Ungasan dengan posisi hook dan dua arah hadap, memberikan akses serta sirkulasi yang lebih baik. Berada di lingkungan perumahan dengan jalan hotmix dan kondisi tanah datar siap bangun, properti ini sangat cocok untuk pembangunan rumah tinggal maupun investasi.",
    "details": [
      "Luas Tanah: 2,8 Are / 280 m²",
      "Akses Jalan: Hotmix",
      "Posisi hook dengan dua sisi akses",
      "Berada di lingkungan perumahan yang nyaman",
      "Akses jalan hotmix selebar ±6 meter",
      "Cocok untuk rumah tinggal maupun investasi properti"
    ]
  },
  {
    "id": 26,
    "slug": "tanah-disewakan-depan-jalan-utama-perdana-bukit-jimbaran",
    "type": "lease",
    "title": "Tanah Disewakan – Depan Jalan Utama Perdana Bukit Jimbaran",
    "location": "Perdana Bukit, Jimbaran, Bali",
    "price": "Rp13.000.000 / are / tahun (Nego)",
    "images": [
      "/assets/tanah-perdanaa-bukit/1.jpeg",
      "/assets/tanah-perdanaa-bukit/2.jpeg",
      "/assets/tanah-perdanaa-bukit/3.jpeg"
    ],
    "landArea": "2 Hektare (20,000 m²)",
    "zoning": "",
    "leaseTerm": "10 Tahun dengan opsi perpanjangan",
    "minRental": "5 Are",
    "access": "yang ramai dan mudah dijangkau, lahan ini sangat cocok untuk berbagai jenis usaha maupun pengembangan properti dalam jangka panjang.",
    "view": "",
    "status": "",
    "frontage": "",
    "description": "Peluang menarik untuk menyewa lahan strategis di kawasan Perdana Bukit Jimbaran. Berada tepat di depan jalan utama dengan akses yang ramai dan mudah dijangkau, lahan ini sangat cocok untuk berbagai jenis usaha maupun pengembangan properti dalam jangka panjang.",
    "details": [
      "Lokasi strategis dengan akses yang mudah",
      "Berada di kawasan yang ramai dan terus berkembang",
      "Cocok untuk berbagai jenis usaha",
      "Potensi investasi yang menjanjikan di kawasan Bukit Jimbaran",
      "Akses Lokasi",
      "±5 menit ke Kampus Universitas Udayana"
    ]
  },
  {
    "id": 27,
    "slug": "brand-new-modern-santorini-villa-for-sale-goa-gong-jimbaran",
    "type": "sale",
    "title": "Brand New Modern Santorini Villa for Sale – Goa Gong, Jimbaran",
    "location": "Goa Gong, Jimbaran, Bali",
    "price": "Rp4.000.000.000 / unit",
    "images": [
      "/assets/villa-goa-gong/1.jpeg",
      "/assets/villa-goa-gong/2.jpeg",
      "/assets/villa-goa-gong/3.jpeg",
      "/assets/villa-goa-gong/4.jpeg",
      "/assets/villa-goa-gong/5.jpeg",
      "/assets/villa-goa-gong/6.jpeg",
      "/assets/villa-goa-gong/7.jpeg",
      "/assets/villa-goa-gong/8.jpeg"
    ],
    "landArea": "150 m²",
    "zoning": "Kuning",
    "leaseTerm": "",
    "minRental": "",
    "access": "mudah menuju berbagai destinasi wisata terbaik di Bali. Tersedia hanya 2 unit, menjadikannya pilihan ideal untuk hunian maupun investasi.",
    "view": "Garuda Wisnu Kencana (GWK)",
    "status": "Freehold (SHM)",
    "frontage": "",
    "description": "Nikmati kemewahan tinggal di Brand New Modern Santorini Villa yang mengusung desain elegan dengan sentuhan arsitektur Santorini. Berlokasi di kawasan Goa Gong, villa ini menawarkan pemandangan langsung ke GWK, lingkungan yang eksklusif, serta akses mudah menuju berbagai destinasi wisata terbaik di Bali. Tersedia hanya 2 unit, menjadikannya pilihan ideal untuk hunian maupun investasi.",
    "details": [
      "Luas Tanah: 150 m²",
      "3 Kamar Tidur",
      "Private Swimming Pool 3 × 6 meter (Lantai 2)",
      "Akses Jalan Paving",
      "Berada di lingkungan villa yang nyaman dan eksklusif",
      "Dekat Pantai Melasti"
    ]
  }
];
