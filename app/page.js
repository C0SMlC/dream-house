"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import ProjectsList from "@/components/ProjectsList";
import Header from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/Testimonial";
import { ContactFormOverlay } from "@/components/ContactFormOverlay";

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [hasShownForm, setHasShownForm] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

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

  return (
    <>
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4">
          <SearchBar />
          <ProjectsList
            title="Recommended Projects"
            subtitle="The most search projects in Dronagiri, Navi Mumbai"
          />
          <ProjectsList
            title="Projects for sale"
            subtitle="Featured projects in Dronagiri, Navi Mumbai"
          />
          <ProjectsList
            title="Rent Properties"
            subtitle="The most search projects for rent in Dronagiri, Navi Mumbai"
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
