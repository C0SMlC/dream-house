import React from "react";
import { Bed, Bath, Home, Square, Car, DoorOpen, Sofa } from "lucide-react";

export default function PropertyOverview({ property }) {
  return (
    <section
      className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
      aria-labelledby="property-overview-heading"
      itemScope
      itemType="https://schema.org/SingleFamilyResidence"
    >
      <h2
        id="property-overview-heading"
        className="text-2xl font-semibold mb-6 flex items-center gap-2"
      >
        <Home className="w-6 h-6" aria-hidden="true" />
        <span itemProp="name">Property Overview</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {property.num_of_bedrooms && (
          <div className="flex items-center gap-3">
            <Bed className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <div>
              <span className="text-gray-600 dark:text-gray-300 block text-sm">
                Bedrooms
              </span>
              <span className="font-medium" itemProp="numberOfRooms">
                {property.num_of_bedrooms}
              </span>
            </div>
          </div>
        )}
        {property.num_of_bathroom && (
          <div className="flex items-center gap-3">
            <Bath className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <div>
              <span className="text-gray-600 dark:text-gray-300 block text-sm">
                Bathrooms
              </span>
              <span className="font-medium" itemProp="numberOfBathroomsTotal">
                {property.num_of_bathroom}
              </span>
            </div>
          </div>
        )}
        {property.balconies && (
          <div className="flex items-center gap-3">
            <DoorOpen className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <div>
              <span className="text-gray-600 dark:text-gray-300 block text-sm">
                Balconies
              </span>
              <span className="font-medium">{property.balconies}</span>
            </div>
          </div>
        )}
        {property.furnishing && (
          <div className="flex items-center gap-3">
            <Sofa className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <div>
              <span className="text-gray-600 dark:text-gray-300 block text-sm">
                Furnishing
              </span>
              <span className="font-medium" itemProp="amenityFeature">
                {property.furnishing}
              </span>
            </div>
          </div>
        )}
        {property.flat_area && (
          <div className="flex items-center gap-3">
            <Square className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <div>
              <span className="text-gray-600 dark:text-gray-300 block text-sm">
                Area
              </span>
              <span className="font-medium">
                <span itemProp="floorSize">{property.flat_area}</span> sq ft
              </span>
            </div>
          </div>
        )}
        {property.parking !== undefined && (
          <div className="flex items-center gap-3">
            <Car className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <div>
              <span className="text-gray-600 dark:text-gray-300 block text-sm">
                Parking
              </span>
              <span className="font-medium" itemProp="amenityFeature">
                {property.parking ? "Available" : "Not Available"}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
