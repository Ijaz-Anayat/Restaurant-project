import type { Metadata, Viewport } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Manrope, Outfit } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import { getRestaurantJsonLd, site } from "@/lib/site";
import "./globals.css";

const display = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display-family",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [
      {
        url: site.ogImage,
        width: 1600,
        height: 1067,
        alt: "A plated dish in low warm light",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [site.ogImage],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: site.colors.charcoal,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = {
    "--charcoal": site.colors.charcoal,
    "--cream": site.colors.cream,
    "--ember": site.colors.ember,
    "--gold": site.colors.gold,
    "--muted": site.colors.muted,
  } as CSSProperties;

  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full antialiased`} style={theme} suppressHydrationWarning>
      <body className="min-h-full bg-charcoal font-sans text-cream" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getRestaurantJsonLd()) }}
        />
        <Providers>{children}</Providers>
      </body>
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [
      {
        url: site.ogImage,
        width: 1600,
        height: 1067,
        alt: "A plated dish in low warm light",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [site.ogImage],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: site.colors.charcoal,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = {
    "--charcoal": site.colors.charcoal,
    "--cream": site.colors.cream,
    "--ember": site.colors.ember,
    "--gold": site.colors.gold,
    "--muted": site.colors.muted,
  } as React.CSSProperties;

  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full antialiased`} style={theme}>
      <body className="min-h-full bg-charcoal font-sans text-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getRestaurantJsonLd()) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
