# Sky Property Bali - Minimalist Property Broker Website

A world-class, premium minimalistic website for **Sky Property Bali** featuring editorial-style layouts, a dark-mode detail overlay, an interactive villa specs viewer, and a inquiry drawer, built with Next.js, Framer Motion, and Tailwind CSS v4.

---

## 🎨 Color Palette & Aesthetic System

- **Primary (Charcoal)**: `#1C1B1A` - Used for primary body text, titles, headers, and footer backgrounds.
- **Secondary (Sand)**: `#F4F1EA` - Natural beige used for main page backgrounds and component outlines.
- **Accent (Terracotta)**: `#C85A32` - Burnt orange terracotta used for call-to-actions, badges, highlights, and icons.
- **Border / Muted Lines**: `#E3DFD5` - Hairline separators for clean editorial spacing.

---

## 📁 Key File Structure

```text
/home/bryanmarius/sky-property-bali/
├── assets/                  <-- Provided assets (logo, villas 1-5)
├── public/
│   └── assets/              <-- [ACTION REQUIRED] Place assets folder here
├── src/
│   └── app/
│       ├── globals.css      <-- Styling configurations (Tailwind v4 @theme variables)
│       ├── layout.tsx       <-- Google Fonts and SEO layout configuration
│       └── page.tsx         <-- Interactive Client Component villa explorer & specs viewer
├── next.config.ts           <-- Next.js config file
├── postcss.config.mjs       <-- PostCSS configurations for Tailwind v4 compile
├── tsconfig.json            <-- TypeScript configuration
└── package.json             <-- Project dependencies (Next 15, Framer Motion, Lucide)
```

---

## 🚀 Setup & Launch Instructions

### 1. Move Asset Files to Public (Required)
Next.js serves static images out of the `public/` directory. To make them visible to the browser, move the existing `assets/` folder inside a new `public/` directory:
```bash
mkdir -p public
mv assets public/
```

### 2. Install Dependencies
Install all required Node modules:
```bash
npm install
```

### 3. Start Development Server
Run the local Next.js dev server:
```bash
npm run dev
```

The application will be live at: **[http://localhost:3000](http://localhost:3000)**.
# sky-property
