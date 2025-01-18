import React from "react";
import { Facebook, Instagram, MessageCircle, Youtube, X } from "lucide-react";

export const ContactFormOverlay = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const socialIcons = {
    Facebook: <Facebook />,
    Instagram: <Instagram />,
    WhatsApp: <MessageCircle />,
    Youtube: <Youtube />,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Contact Form Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Contact us</h2>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Address and Social Section */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Visit us
                </h3>
                <address className="not-italic text-gray-600 space-y-2">
                  <p>Shop No 8, Vian Plot</p>
                  <p>Navi Sector-47</p>
                  <p>Dronagiri, Navi Mumbai</p>
                </address>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Connect with us
                </h3>
                <div className="flex space-x-4">
                  {Object.entries(socialIcons).map(([platform, icon]) => (
                    <a
                      key={platform}
                      href={`#${platform.toLowerCase()}`}
                      className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
