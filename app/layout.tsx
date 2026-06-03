import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "Lefu Čínská restaurace Praha | Autentická čínská kuchyně",
    template: "%s | Lefu Čínská restaurace Praha",
  },
  description:
    "Lefu Čínská restaurace nabízí autentickou čínskou kuchyni v srdci Prahy. Tradiční recepty, prémiové ingredience, nezapomenutelný gastronomický zážitek od roku 1998.",
  keywords: [
    "čínská restaurace Praha",
    "nejlepší čínská restaurace Praha",
    "autentická čínská restaurace",
    "čínské jídlo Praha",
    "pekingská kachna Praha",
    "rezervace restaurace Praha",
    "Lefu restaurace",
    "dim sum Praha",
  ],
  authors: [{ name: "Lefu Čínská restaurace" }],
  creator: "Lefu Čínská restaurace",
  publisher: "Lefu Čínská restaurace",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://lefu-restaurace.cz"
  ),
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "/",
    siteName: "Lefu Čínská restaurace",
    title: "Lefu Čínská restaurace Praha | Autentická čínská kuchyně",
    description:
      "Autentická čínská kuchyně v srdci Prahy. Pekingská kachna, dim sum, a tradiční čínské pokrmy od roku 1998.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lefu Čínská restaurace Praha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lefu Čínská restaurace Praha",
    description: "Autentická čínská kuchyně v srdci Prahy od roku 1998.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Lefu Čínská restaurace",
              description:
                "Autentická čínská kuchyně v srdci Prahy od roku 1998",
              url: process.env.NEXT_PUBLIC_APP_URL || "https://lefu-restaurace.cz",
              telephone: "+420222333444",
              email: "info@lefu-restaurace.cz",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Václavské náměstí 1",
                addressLocality: "Praha",
                postalCode: "110 00",
                addressCountry: "CZ",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "50.0796",
                longitude: "14.4241",
              },
              servesCuisine: "Chinese",
              priceRange: "$$",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
                  opens: "11:30",
                  closes: "22:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Friday", "Saturday"],
                  opens: "11:30",
                  closes: "23:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Sunday",
                  opens: "12:00",
                  closes: "22:00",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "380",
              },
              hasMenu: `${process.env.NEXT_PUBLIC_APP_URL || "https://lefu-restaurace.cz"}/menu`,
              acceptsReservations: "True",
            }),
          }}
        />
      </head>
      <body className="bg-dark-bg text-white antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
