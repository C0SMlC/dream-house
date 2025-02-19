import { Inter } from "next/font/google";
import "../../globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { NavBar } from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dream House Proprties",
  description: "Your Dream Home",
};

export default function PropertyLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200`}
      >
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
