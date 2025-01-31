export default function PropertyOverview({ property }) {
  return (
    <div className="mt-8 dark:bg-gray-800 py-12 px-8">
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {property.num_of_bedrooms && (
          <div className="flex gap-2 items-center">
            <span className="font-medium">Bedrooms:</span>
            <span>{property.num_of_bedrooms}</span>
          </div>
        )}
        {property.num_of_bathroom && (
          <div className="flex gap-2 items-center">
            <span className="font-medium">Bathrooms:</span>
            <span>{property.num_of_bathroom}</span>
          </div>
        )}
        {property.furnishing && (
          <div className="flex gap-2 items-center">
            <span className="font-medium">Furnishing:</span>
            <span>{property.furnishing}</span>
          </div>
        )}
        {property.parking !== undefined && (
          <div className="flex gap-2 items-center">
            <span className="font-medium">Parking:</span>
            <span>{property.parking ? "Available" : "Not Available"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
