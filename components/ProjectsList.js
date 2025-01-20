import { Loader2 } from "lucide-react";
import ProjectCard from "./ProjectCard";

export default function ProjectsList({ loading, title, subtitle, properties }) {
  if (loading) {
    return (
      <div className="my-8">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600 mb-4">{subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="border rounded-lg p-4 h-[300px] flex items-center justify-center"
            >
              <div className="text-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="my-8">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600 mb-4">{subtitle}</p>
        <div className="text-center">
          <p className="text-gray-500">No properties available.</p>
        </div>
      </div>
    );
  }
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property, index) => (
          <ProjectCard
            key={index}
            title={property.title}
            location={`${property.num_of_bedrooms} BHK Apartment, ${property.city}`}
            priceRange={property.price}
            images={property.property_photos.map((photo_url) => photo_url)}
          />
        ))}
      </div>
    </section>
  );
}
