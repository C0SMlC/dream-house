"use client";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h2 className="text-white text-lg font-bold mb-4">
              Dream House Properties
            </h2>
            <p className="mb-4 text-sm leading-relaxed">
              Your trusted partner in finding the perfect property in Navi
              Mumbai. Specializing in residential and commercial properties in
              Dronagiri and surrounding areas.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="hover:text-blue-400 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="hover:text-pink-400 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-blue-300 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://youtube.com"
                className="hover:text-red-500 transition-colors"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/properties"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Properties
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rental-agreement"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Rental Agreement
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Properties */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Properties</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties?type=buy"
                  className="hover:text-blue-400 transition-colors"
                >
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=rent"
                  className="hover:text-blue-400 transition-colors"
                >
                  Rental Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=pg"
                  className="hover:text-blue-400 transition-colors"
                >
                  PG Accommodation
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=commercial"
                  className="hover:text-blue-400 transition-colors"
                >
                  Commercial Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <address className="not-italic space-y-3">
              <p className="flex items-center gap-2">
                <MapPin size={18} />
                <span>
                  Shop No 8, Vian Plot
                  <br />
                  Navi Sector-47, Dronagiri
                  <br />
                  Navi Mumbai
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={18} />
                <a
                  href="tel:+919137821151"
                  className="hover:text-blue-400 transition-colors"
                >
                  +91 91378 21151
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={18} />
                <a
                  href="mailto:info@dreamhouse.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  info@dreamhouse.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © {currentYear} Dream House Properties. All rights reserved.
            </p>
            <nav aria-label="Footer secondary navigation">
              <ul className="flex flex-wrap gap-6 text-sm">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sitemap"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
