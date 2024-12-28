"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import HeroSlideshow from "./HeroSlideshow";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors z-50">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between ">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-xl">
            Logo
          </Link>
          <div className="hidden md:hidden gap-6">
            <Link href="/about" className="dark:text-gray-200">
              ABOUT US
            </Link>
            <Link href="/contact" className="dark:text-gray-200 md:hidden">
              CONTACT US
            </Link>
          </div>
        </div>

        <div className="hidden gap-4 z-50 md:flex items-center">
          <ThemeToggle />
          <Link
            href="/rental-agreement"
            className="flex items-center gap-2 dark:text-gray-200"
          >
            <span className="animate-pulse w-2 h-2 rounded-full bg-red-500"></span>
            RENTAL AGREEMENT
          </Link>
          <button className="px-3 py-1 border rounded dark:border-gray-600 dark:text-gray-200">
            Send SMS
          </button>
          <button className="px-3 py-1 border rounded dark:border-gray-600 dark:text-gray-200">
            Send Email
          </button>
        </div>
      </nav>
      <HeroSlideshow />
    </header>
  );
}
