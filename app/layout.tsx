import type { Metadata, Viewport } from "next";
import { Inter, Nunito, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ThemeProvider } from "@/components/site/theme-provider";
import { revealScript } from "@/components/site/reveal";
import {
  jsonLd,
  ogImage,
  organizationLd,
  siteDescription,
  siteKeywords,
  siteName,
  siteShortName,
  siteUrl,
  websiteLd,
} from "@/lib/seo";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const heading = Nunito({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  // Only used for small figures below the fold; not worth a preload on every page.
  preload: false,
});

const shareTitle = "NFVCB — National Film and Video Censors Board";
const shareDescription =
  "Classifying films, licensing distribution and exhibition, and protecting the Nigerian viewing public since 1993.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NFVCB — National Film and Video Censors Board | Film Classification & Licensing in Nigeria",
    template: "%s · NFVCB",
  },
  description: siteDescription,
  keywords: siteKeywords,
  applicationName: siteShortName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "government",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    locale: "en_NG",
    title: shareTitle,
    description: shareDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    images: [ogImage.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1512",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${sans.variable} ${heading.variable} ${mono.variable} h-full`}
    >
      <head>
        {/* Runs before first paint, so scroll reveals never wait on hydration. */}
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd([organizationLd, websiteLd])}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
