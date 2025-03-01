import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import PageHero from "@/components/PageHero";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function ContactPage() {
  const socialIcons = {
    facebook: <Facebook />,
    instagram: <Instagram />,
    twitter: <Twitter />,
    linkedin: <Linkedin />,
  };

  return (
    <main className="min-h-screen">
      <PageHero
        title="Contact Us"
        subtitle="We're here to help with all your real estate needs"
        imagePath="/hero1.jpg"
      />

      <section className="container mx-auto py-16 px-4 md:px-6 text-gray-700 dark:text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">
              Get in Touch
            </h2>
            <p className=" mb-8">
              Whether you&apot;re looking to buy, sell, or just have questions
              about the property market, our team of experts is ready to assist
              you. Fill out the form below, and we&apot;ll get back to you
              promptly.
            </p>

            <div className="space-y-6 mb-12">
              {[
                {
                  icon: <FaPhone />,
                  title: "Phone",
                  content: "+91 98765 43210",
                  link: "tel:+919876543210",
                },
                {
                  icon: <FaEnvelope />,
                  title: "Email",
                  content: "info@dreamhomesproperties.in",
                  link: "mailto:info@dreamhomesproperties.in",
                },
                {
                  icon: <FaMapMarkerAlt />,
                  title: "Address",
                  content:
                    "123 Real Estate Avenue, Mumbai, Maharashtra 400001, India",
                },
                {
                  icon: <FaClock />,
                  title: "Business Hours",
                  content:
                    "Monday-Saturday: 9AM-6PM | Sunday: By Appointment Only",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-primary mt-1 mr-4">{item.icon}</div>
                  <div className="dark:text-white text-gray-900">
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="hover:text-primary transition"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p>{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {["facebook", "instagram", "twitter", "linkedin"].map(
                  (social) => (
                    <a
                      key={social}
                      href={`https://www.${social}.com/dreamhomesproperties`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary/10 hover:bg-primary text-primary hover:text-white p-3 rounded-full transition-colors"
                    >
                      {socialIcons[social]}{" "}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg  dark:bg-gray-900 dark:text-white">
            <h3 className="text-2xl font-semibold text-primary mb-6">
              Send us a Message
            </h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-900 dark:text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-900 dark:text-white"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-900 dark:text-white"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-900 dark:text-white"
                  placeholder="Property Inquiry"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-900 dark:text-white"
                  placeholder="Hello, I'm interested in..."
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-black border font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:text-white"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="h-[400px] relative">
        <div className="absolute inset-0 bg-gray-300">
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <p className="text-gray-500">
              Google Maps integration will be displayed here
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
