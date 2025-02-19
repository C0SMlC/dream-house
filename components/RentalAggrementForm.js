import React, { useState } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  FileText,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export const RentalAgreementOverlay = ({ isVisible, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
          formType: "rental",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "" });
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

  const benefits = [
    "Quick Documentation",
    "Legal Verification",
    "Digital Signatures",
    "Home Visit Available",
    "Government Approved",
    "24/7 Support",
  ];

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rental-form-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transform-gpu animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative grid md:grid-cols-2">
          {/* Left Section - Content */}
          <div className="p-8 lg:p-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
            <div className="absolute top-4 left-4">
              <FileText className="h-8 w-8 text-white/80" />
            </div>

            <button
              onClick={onClose}
              className="absolute left-4 top-4 text-white/80 hover:text-white transition-colors"
              aria-label="Close rental agreement form"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mt-12">
              <h2 id="rental-form-title" className="text-3xl font-bold mb-4">
                Online Rental Agreement
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Get your rental agreement prepared online with legal
                verification
              </p>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-blue-300" />
                      <span className="text-sm text-white/90">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur">
                  <p className="text-sm text-white/90">
                    &quot;Streamlined process, professional service. Got my
                    agreement done in 24 hours!&quot;
                  </p>
                  <p className="mt-2 text-white/80 text-sm font-medium">
                    — Recent Customer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="p-8 lg:p-12 bg-white dark:bg-gray-900">
            <h3 className="text-2xl font-semibold mb-2 dark:text-white">
              Request a Callback
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Fill out the form below and we&apos;ll get back to you within 24
              hours
            </p>

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
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full flex items-center justify-center gap-2 
                  ${
                    isSubmitting
                      ? "bg-blue-400"
                      : "bg-blue-600 hover:bg-blue-700"
                  } 
                  text-white py-3.5 rounded-xl transition-all duration-200 
                  transform hover:-translate-y-0.5 hover:shadow-lg
                `}
              >
                {isSubmitting ? (
                  "Processing..."
                ) : (
                  <>
                    Get Started Now
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl text-center animate-fade-in">
                  Success! We&apos;ll contact you shortly.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-center animate-fade-in">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Need immediate assistance?
              </p>
              <a
                href="tel:+919137821151"
                className="text-blue-600 dark:text-blue-400 font-semibold text-lg hover:text-blue-700 transition-colors"
              >
                +91 91378 21151
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
