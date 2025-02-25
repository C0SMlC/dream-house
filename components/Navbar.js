import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export function NavBar() {
  <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
    <div className="flex items-center gap-8">
      <Link href="/" className="font-bold text-xl">
        Logo
      </Link>
      <div className="hidden md:flex gap-6">
        <Link href="/about" className="dark:text-gray-200">
          ABOUT US
        </Link>
        <Link href="/contact" className="hidden dark:text-gray-200 md:flex">
          CONTACT US
        </Link>
      </div>
    </div>

    <div className="hidden gap-4 z-50 md:flex items-center">
      <ThemeToggle />
      <button
        onClick={() => setShowRentalAgreement(true)}
        className="flex items-center gap-2 dark:text-gray-200"
      >
        <span className="animate-pulse w-2 h-2 rounded-full bg-red-500"></span>
        RENTAL AGREEMENT
      </button>
      <button className="px-3 py-1 border rounded dark:border-gray-600 dark:text-gray-200">
        Send SMS
      </button>
      <button className="px-3 py-1 border rounded dark:border-gray-600 dark:text-gray-200">
        Send Email
      </button>
    </div>
  </nav>;
}
