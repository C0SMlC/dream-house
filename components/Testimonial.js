"use client";
import { useState } from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Pratik Sharma",
      role: "Property Buyer",
      location: "Navi Mumbai",
      rating: 5,
      text: "I have known this builder from quite long as one of my friends has contacted the builder for his own property building matter. I selected this builder for their transparency and quality work.",
      image: "/testimonials/pratik.jpg", // Add actual image path
    },
    {
      id: 2,
      name: "Rahul Mehta",
      role: "Home Owner",
      location: "Dronagiri",
      rating: 5,
      text: "Exceptional service and professional approach. The team guided me throughout the property buying process making it seamless.",
      image: "/testimonials/rahul.jpg",
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "First-time Buyer",
      location: "Navi Mumbai",
      rating: 5,
      text: "As a first-time property buyer, I was nervous but their team made the entire process smooth and transparent. Highly recommended!",
      image: "/testimonials/priya.jpg",
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section
      className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      aria-labelledby="testimonials-title"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            id="testimonials-title"
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600"
          >
            Customer Testimonials
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hear what our valued customers have to say about their experience
            with Dream House Properties
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 bg-blue-500 rounded-full p-3">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="pt-4">
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    &quot;{testimonial.text}&quot;
                  </p>
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center mt-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600 dark:text-gray-400">
                Happy Customers
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600 dark:text-gray-400">
                Satisfaction Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10+</div>
              <div className="text-gray-600 dark:text-gray-400">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1000+</div>
              <div className="text-gray-600 dark:text-gray-400">
                Properties Sold
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
