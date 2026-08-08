import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Header, Footer, FloatingWhatsApp } from "@/components/layout";
import { SITE } from "@/lib/config";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "white",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Hoskey Production — Where Stories Come Alive",
    template: "%s — Hoskey Production",
  },
  description:
    "Broadcast and media production company in Ghana. TV production, brand films, documentaries, Demes shr Studios, and technical stage engineering founded by Ziblim Abu James.",
  applicationName: "Hoskey Production",
  authors: [{ name: "Ziblim Abu James (Demes shr)" }],
  generator: "Next.js",
  keywords: [
    "Hoskey Production",
    "Demes shr",
    "Ghana media production",
    "TV production Ghana",
    "podcast studio Ghana",
    "broadcast live streaming",
    "sound engineering Ghana",
  ],
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: SITE.url,
    siteName: "Hoskey Production",
    title: "Hoskey Production — Where Stories Come Alive",
    description:
      "Broadcast and media production company in Ghana. TV production, brand films, documentaries, Demes shr Studios, and technical stage engineering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoskey Production — Where Stories Come Alive",
    description:
      "Broadcast and media production company in Ghana. Production services, Demes shr Studios, and technical stage engineering.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hoskey Production",
  legalName: "Hoskey Production",
  url: SITE.url,
  foundingDate: "2024-12-01",
  founder: {
    "@type": "Person",
    name: "Ziblim Abu James",
    alternateName: "Demes shr",
    alumniOf: "Unimac IFT",
    homeLocation: {
      "@type": "Place",
      name: "Walawala, northern Ghana",
    },
  },
  slogan: "Where Stories Come Alive",
  description:
    "Broadcast and media production company in Ghana specializing in TV, brand films, documentaries, Demes shr Studios, and technical stage engineering.",
  telephone: "+233597948979",
  address: {
    "@type": "PostalAddress",
    addressCountry: "GH",
    addressLocality: "Walawala",
  },
  sameAs: [`https://wa.me/${SITE.whatsapp}`],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${ibmPlexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD),
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-paper text-ink">
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
