export const AboutSection = () => (
  <section className="bg-gray-100 py-16">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <img
          src="/appartment.png"
          alt="Dream Home"
          className="w-full max-w-md"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">
          About Dream Homes Properties
        </h2>
        <p className="text-gray-700 mb-4">
          At Dream Homes Properties, we are dedicated to turning your dream of
          finding the perfect home into reality. With a commitment to excellence
          and personalized service, we specialize in offering a wide range of
          properties tailored to meet your unique needs. Whether you&apos re
          buying, selling, or investing, our experienced team ensures a seamless
          and rewarding experience at every step.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          READ MORE
        </button>
      </div>
    </div>
  </section>
);
