export default function PropertyDetails({ property }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800 dark:text-white">
      <h2 className="text-xl font-semibold mb-4">Contact Details</h2>
      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
        Get Owner Details
      </button>
      <div className="mt-6">
        <h3 className="font-medium mb-2">Property Info</h3>
        <div className="space-y-3">
          <div>
            <span className="text-gray-600 dark:text-white">
              Property Type:
            </span>
            <span className="ml-2">{property.property_type}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-white">Availability:</span>
            <span className="ml-2">{property.availability}</span>
          </div>
          {property.total_floors && (
            <div>
              <span className="text-gray-600 dark:text-white">
                Total Floors:
              </span>
              <span className="ml-2">{property.total_floors}</span>
            </div>
          )}
          {property.property_on !== undefined && (
            <div>
              <span className="text-gray-600 dark:text-white">
                Floor Number:
              </span>
              <span className="ml-2">{property.property_on}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
