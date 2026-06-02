import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SKY Property Bali | High-End Minimalist Villas & Real Estate",
  description: "Curated collection of the most premium, design-driven properties and luxury villas in Bali. Explore details, specifications, and layout designs.",
  keywords: ["Bali luxury villas", "Bali real estate", "minimalist villa Bali", "Sky Property Bali", "Bali property broker"],
  authors: [{ name: "SKY Property Bali" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="antialiased bg-secondary text-primary">
        {children}
      </body>
    </html>
  );
}
