// RentalAgreementOverlay.js
import React, { useState } from "react";
import { X } from "lucide-react";

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>

        {/* Agreement Image */}
        <div className="w-full h-72 bg-neutral-100 dark:bg-gray-700">
          <img
            src="/Agreement.jpg"
            alt="Rental Agreement"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid md:grid-cols-2">
          {/* Left Section */}
          <div className="p-8 bg-blue-600 text-white">
            <h2 className="text-2xl font-bold mb-2">Online Rent Agreement</h2>
            <p className="mb-6">
              Best Online Rent Agreement Services in Navi Mumbai
            </p>
            <div className="relative w-full max-w-md">
              <img
                src="/Agreement1.jpg"
                alt="Agreement Illustration"
                className="w-full"
              />
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="p-8 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Get a Call back
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please fill this form to get an assured callback
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Contact no"
                  required
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${
                  isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white py-3 rounded-lg transition-colors`}
              >
                {isSubmitting ? "Submitting..." : "SUBMIT"}
              </button>

              {submitStatus === "success" && (
                <div className="text-green-600 dark:text-green-400 text-center">
                  Request submitted successfully!
                </div>
              )}
              {submitStatus === "error" && (
                <div className="text-red-600 dark:text-red-400 text-center">
                  Failed to submit request. Please try again.
                </div>
              )}
            </form>

            <div className="text-center mt-6 text-blue-600 dark:text-blue-400">
              For Inquiry Contact us on 9137821151
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
