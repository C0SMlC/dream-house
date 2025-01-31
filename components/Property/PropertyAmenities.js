export default function PropertyAmenities({
  amenities,
  features,
  societyFeatures,
}) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Amenities & Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {amenities?.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Amenities</h3>
            <ul className="space-y-2">
              {amenities.map((amenity, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span>•</span>
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {features?.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Features</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span>•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {societyFeatures?.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Society Features</h3>
            <ul className="space-y-2">
              {societyFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span>•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
