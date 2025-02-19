import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  title: {
    default: "Dream House Properties | Real Estate in Navi Mumbai",
    template: "%s | Dream House Properties",
  },
  description:
    "Find your dream home in Navi Mumbai. Browse apartments, flats and properties for sale and rent in Dronagiri and surrounding areas.",
  keywords: [
    "real estate",
    "property",
    "Navi Mumbai",
    "Dronagiri",
    "apartments",
    "flats",
    "rent",
    "sale",
    "property listings",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "Dream House Properties - Real Estate in Navi Mumbai",
    description:
      "Find your perfect home in Navi Mumbai with Dream House Properties",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "Dream House Properties",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dream House Properties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream House Properties - Real Estate in Navi Mumbai",
    description:
      "Find your perfect home in Navi Mumbai with Dream House Properties",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
