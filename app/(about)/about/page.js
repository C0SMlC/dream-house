import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "About Dream Homes Properties | Your Trusted Real Estate Partner",
  description:
    "Learn about Dream Homes Properties, our mission, values, and why we are the best choice for finding your dream property in India.",
  keywords:
    "dream homes about, real estate company, property experts, trusted realtors, real estate mission",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <PageHero
        title="About Us"
        subtitle="Get to know the team behind your dream home"
        imagePath="/hero1.jpg"
      />

      <section className="container mx-auto py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Founded in 2010, Dream Homes Properties began with a simple
              mission: to help people find not just houses, but homes where
              memories are made. What started as a small team of passionate real
              estate enthusiasts has grown into one of India&apos;s most trusted
              property consultancies.
            </p>
            <p className="text-gray-700 mb-6">
              With over 5,000 successful property transactions and countless
              families helped, we continue to stand by our founding principles
              of honesty, transparency, and client-first service.
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Our Values
              </h3>
              <ul className="space-y-3">
                {[
                  "Integrity in every transaction",
                  "Client satisfaction above all",
                  "Market knowledge expertise",
                  "Innovative property solutions",
                ].map((value, index) => (
                  <li key={index} className="flex items-center">
                    <span className="bg-primary/10 rounded-full p-1 mr-3 text-primary">
                      <FaCheck />
                    </span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/hero2.jpg"
              alt="Dream Homes Properties Team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Why Choose Dream Homes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Guidance",
                description:
                  "Our team consists of certified real estate professionals with decades of combined experience in the Indian property market.",
                icon: "🏆",
              },
              {
                title: "Curated Properties",
                description:
                  "We personally verify each property in our portfolio to ensure quality, legal compliance, and value for money.",
                icon: "🔍",
              },
              {
                title: "End-to-End Support",
                description:
                  "From property search to paperwork to post-purchase assistance, we're with you at every step of your journey.",
                icon: "🤝",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Our Achievements</h2>
          <p className="text-gray-600 mt-3">
            Milestones that mark our journey of excellence
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: "5000+", label: "Properties Sold" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "15+", label: "Years Experience" },
            { number: "20+", label: "Cities Covered" },
          ].map((stat, index) => (
            <div key={index} className="bg-primary/5 p-6 rounded-lg">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
