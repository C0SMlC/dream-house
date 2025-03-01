import { LayoutGrid, Sparkles, Building2, CheckSquare } from "lucide-react";

export default function PropertyAmenities({
  amenities,
  features,
  societyFeatures,
}) {
  return (
    <section
      className="mt-8 rounded-lg shadow-sm p-6"
      aria-labelledby="amenities-heading"
    >
      <header className="mb-6">
        <h2
          id="amenities-heading"
          className="text-xl font-semibold flex items-center gap-2"
        >
          <CheckSquare className="icon" aria-hidden="true" />
          Amenities & Features
        </h2>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {amenities?.length > 0 && (
          <article>
            <h3 className="font-medium mb-2">Amenities</h3>
            <ul className="space-y-2">
              {amenities.map((amenity, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Sparkles
                    className="icon w-5 h-5 text-blue-600"
                    aria-hidden="true"
                  />
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </article>
        )}
        {features?.length > 0 && (
          <article>
            <h3 className="font-medium mb-2">Features</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <LayoutGrid
                    className="icon w-5 h-5 text-blue-600"
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        )}
        {societyFeatures?.length > 0 && (
          <article>
            <h3 className="font-medium mb-2">Society Features</h3>
            <ul className="space-y-2">
              {societyFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Building2
                    className="icon w-5 h-5 text-blue-600"
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        )}
      </div>
    </section>
  );
}
