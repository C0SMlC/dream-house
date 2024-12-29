export const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Pratik",
      text: "I have known this builder from quite long as one of my friends has contacted the builder for his own property building matter. I selected this builder.",
    },
  ];

  return (
    <section className="py-16 dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12">
          Here is what customers think about us
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:text-white dark:border-white"
            >
              <p className="mb-4">{testimonial.text}</p>
              <p className="font-bold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
