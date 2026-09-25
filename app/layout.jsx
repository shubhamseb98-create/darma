import { Roboto } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "../components/providers/SmoothScroll";
import { BookingProvider } from "../components/providers/BookingContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import StickyCTA from "../components/layout/StickyCTA";
import { clinicInfo } from "../data/clinicInfo";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata = {
  title: "Aeterna Dermatology | Dr. Megha Aggarwal | Aesthetic Dermatology Delhi",
  description:
    "Delhi's premier aesthetic clinic led by Dr. Megha Aggarwal (MD Dermatology). Proprietary TD Glowtech 360°, Medical Hydrafacial, Q-Switch Laser, and Dermapen 4.",
  keywords: [
    "Truly Derma",
    "Dr Megha Aggarwal",
    "Truly Derma Pitampura",
    "Truly Derma Rajouri Garden",
    "Hydra Facial Delhi",
    "TD Glowtech 360",
    "Laser Toning Delhi",
    "Laser Hair Reduction Delhi",
    "Fat Loss Clinic Delhi",
    "Dermatologist in Pitampura",
    "Dermatologist in Rajouri Garden",
  ],
  openGraph: {
    title: "Truly Derma Clinic & Academy | Dr. Megha Aggarwal",
    description: "Specialized Skin, Hair, Laser, and Fat Loss Treatments by Certified Experts in Pitampura & Rajouri Garden, New Delhi.",
    url: "https://trulyderma.com",
    siteName: "Truly Derma Clinic & Academy",
    locale: "en_IN",
    type: "website",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "DermatologyClinic"],
    name: clinicInfo.name,
    image: "https://trulyderma.com/logo.png",
    description: clinicInfo.tagline,
    telephone: clinicInfo.contact.phone,
    email: clinicInfo.contact.email,
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "1st Floor, Building 46, Harsh Vihar, Above AU Small Finance Bank",
        addressLocality: "Pitampura",
        addressRegion: "New Delhi",
        postalCode: "110034",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "J2/16, Basement",
        addressLocality: "Rajouri Garden",
        addressRegion: "New Delhi",
        postalCode: "110027",
        addressCountry: "IN",
      }
    ],
    founder: {
      "@type": "Physician",
      name: clinicInfo.doctor.name,
      jobTitle: clinicInfo.doctor.title,
      description: clinicInfo.doctor.qualifications,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:30",
        closes: "19:30",
      },
    ],
    priceRange: "$$",
  };

  return (
    <html lang="en" className={roboto.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-cream-50 text-charcoal-900 min-h-screen flex flex-col antialiased selection:bg-brand-plum selection:text-white">
        <SmoothScrollProvider>
          <BookingProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <StickyCTA />
          </BookingProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
