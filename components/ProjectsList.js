import ProjectCard from "./ProjectCard";

export default function ProjectsList({ title, subtitle }) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((index) => (
          <ProjectCard
            key={index}
            title="Prajapati Magnum"
            location="2,3,4 bhk Apartment, Dronagiri"
            priceRange="1.4cr-2cr"
          />
        ))}
      </div>
    </section>
  );
}
