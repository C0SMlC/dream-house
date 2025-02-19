import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Youtube,
  X,
  Mail,
  User,
  Phone,
  MessageSquare,
  MapPin,
} from "lucide-react";

export const ContactFormOverlay = ({ isVisible, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          formType: "contact",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  const socialIcons = {
    Facebook: <Facebook />,
    Instagram: <Instagram />,
    WhatsApp: <MessageCircle />,
    Youtube: <Youtube />,
  };
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overlay-enter"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-form-title"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl p-0 shadow-2xl form-enter relative overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full transition-all duration-200 hover:bg-white/20"
            aria-label="Close contact form"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-5 h-full">
            {/* Contact Form Section - 3 columns */}
            <div className="md:col-span-3 p-8 lg:p-12">
              <div className="mb-8">
                <h2
                  id="contact-form-title"
                  className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
                >
                  Get in Touch
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We&spos;d love to hear from you. Please fill out this form.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
                    aria-label="Your name"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
                    aria-label="Your email"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
                    aria-label="Your phone number"
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="4"
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
                    aria-label="Your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${
                    isSubmitting
                      ? "bg-blue-400"
                      : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                  } text-white py-3 px-6 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl text-center animate-fade-in">
                    Message sent successfully!
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-center animate-fade-in">
                    Failed to send message. Please try again.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info Section - 2 columns */}
            <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 p-8 lg:p-12 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 mt-1" />
                    <address className="not-italic">
                      <p className="font-semibold mb-1">Visit our office</p>
                      <p>Shop No 8, Vian Plot</p>
                      <p>Navi Sector-47</p>
                      <p>Dronagiri, Navi Mumbai</p>
                    </address>
                  </div>

                  <div className="pt-8">
                    <p className="font-semibold mb-4">Connect with us</p>
                    <div className="flex space-x-4">
                      {Object.entries(socialIcons).map(([platform, icon]) => (
                        <a
                          key={platform}
                          href={`#${platform.toLowerCase()}`}
                          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200"
                          aria-label={`Follow us on ${platform}`}
                        >
                          {icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute bottom-0 right-0 opacity-10">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="100" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
