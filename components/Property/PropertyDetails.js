import React from "react";
import {
  Home,
  Building,
  MapPin,
  Clock,
  Tag,
  CalendarCheck,
  Trees,
  Phone,
} from "lucide-react";

export default function PropertyDetails({ property }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Price Details
        </h2>
        <div className="text-3xl font-bold text-blue-600">
          ₹{property.price.toLocaleString("en-IN")}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Building className="w-5 h-5" />
          Property Details
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600">Type:</span>
            <span className="font-medium">{property.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600">Availability:</span>
            <span className="font-medium">{property.availability}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600">Total Floors:</span>
            <span className="font-medium">{property.total_floors}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600">Property On:</span>
            <span className="font-medium">Floor {property.property_on}</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Location Details
        </h2>
        <div className="space-y-4">
          {property.house_no && (
            <div>
              <span className="text-gray-600">House No:</span>
              <span className="ml-2 font-medium">{property.house_no}</span>
            </div>
          )}
          <div>
            <span className="text-gray-600">Locality:</span>
            <span className="ml-2 font-medium">{property.locality}</span>
          </div>
          <div>
            <span className="text-gray-600">City:</span>
            <span className="ml-2 font-medium">{property.city}</span>
          </div>
          {property.location && (
            <div>
              <span className="text-gray-600">Complete Address:</span>
              <span className="ml-2 font-medium">{property.location}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Listing Details
        </h2>
        <div className="space-y-4">
          <div>
            <span className="text-gray-600">Listed On:</span>
            <span className="ml-2 font-medium">
              {new Date(property.created_at).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Last Updated:</span>
            <span className="ml-2 font-medium">
              {new Date(property.updated_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-6">
        <Phone className="w-5 h-5" />
        Get Owner Details
      </button>
    </div>
  );
}

// Enhanced PropertyAmenities Component
export function PropertyAmenities({ amenities, features, societyFeatures }) {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Trees className="w-6 h-6" />
        Amenities & Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {amenities?.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-4">Amenities</h3>
            <ul className="space-y-3">
              {amenities.map((amenity, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {amenity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {features?.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-4">Features</h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {societyFeatures?.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-4">Society Features</h3>
            <ul className="space-y-3">
              {societyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
