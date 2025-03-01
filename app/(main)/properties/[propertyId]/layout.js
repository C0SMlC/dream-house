import "@/app/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PropertyLayout({ children }) {
  return (
    <div
      className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200`}
    >
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
