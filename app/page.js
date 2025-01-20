"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import ProjectsList from "@/components/ProjectsList";
import Header from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/Testimonial";
import { ContactFormOverlay } from "@/components/ContactFormOverlay";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [hasShownForm, setHasShownForm] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [properties, setProperties] = useState({
    sell: [],
    rent: [],
    pg: [],
  });
  const [loading, setLoading] = useState({
    sell: true,
    rent: true,
    pg: true,
  });
  const [error, setError] = useState(null);

  const fetchPropertiesByType = async (type) => {
    try {
      const response = await fetch(
        `/api/properties?type=${encodeURIComponent(type)}`
      );
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || `Failed to fetch ${type} properties`);
      }

      setProperties((prev) => ({
        ...prev,
        [type.toLowerCase()]: result.data.data.properties,
      }));

      setLoading((prev) => ({
        ...prev,
        [type.toLowerCase()]: false,
      }));
    } catch (err) {
      setError(err.message);
      setLoading((prev) => ({
        ...prev,
        [type.toLowerCase()]: false,
      }));
    }
  };

  useEffect(() => {
    fetchPropertiesByType("Sell");
    fetchPropertiesByType("Rent");
    fetchPropertiesByType("PG");
  }, []);

  // Scroll handler remains the same
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      const isScrollingDown = currentScrollPosition > lastScrollPosition;

      if (isScrollingDown && !hasShownForm && !showContactForm) {
        const aboutSection = document.querySelector("#about-section");
        if (aboutSection) {
          const rect = aboutSection.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            setShowContactForm(true);
            setHasShownForm(true);
          }
        }
      }

      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPosition, hasShownForm, showContactForm]);

  const handleCloseForm = () => {
    setShowContactForm(false);
    setHasShownForm(true);
  };

  if (loading.sell && loading.rent && loading.pg) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4">
          <SearchBar />
          <ProjectsList
            title="Projects for Sale"
            subtitle="Featured projects in Dronagiri, Navi Mumbai"
            properties={properties.sell}
            loading={loading.sell}
          />
          <ProjectsList
            title="Rental Properties"
            subtitle="Available rental properties in Dronagiri, Navi Mumbai"
            properties={properties.rent}
            loading={loading.rent}
          />
          <ProjectsList
            title="PG Accommodations"
            subtitle="Available PG accommodations in Dronagiri, Navi Mumbai"
            properties={properties.pg}
            loading={loading.pg}
          />
        </div>

        <div id="about-section">
          <AboutSection />
        </div>

        <TestimonialsSection />
      </div>

      <ContactFormOverlay
        isVisible={showContactForm}
        onClose={handleCloseForm}
      />
    </>
  );
}
