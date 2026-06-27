import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { content } from "@/content/data";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: "#0F172A",
  colorScheme: "dark"
};

export const metadata: Metadata = {
  title: content.site.title,
  description: content.site.description,
  metadataBase: new URL(content.site.url),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg"
  },
  openGraph: {
    title: content.site.title,
    description: content.site.description,
    url: content.site.url,
    siteName: content.site.title,
    images: [
      {
        url: content.gallery[0].src,
        width: 1200,
        height: 630,
        alt: content.site.title
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: content.site.title,
    description: content.site.description,
    images: [content.gallery[0].src]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
