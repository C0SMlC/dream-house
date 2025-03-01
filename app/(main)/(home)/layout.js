import "@/app/globals.css";
import Header from "@/components/Header";
import HeroSlideshow from "@/components/HeroSlideshow";
import Footer from "@/components/Footer";

export default function PropertiesLayout({ children }) {
  return (
    <div>
      <Header />
      <HeroSlideshow />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
