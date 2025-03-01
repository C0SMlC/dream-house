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
import Head from "next/head";

export default function PropertyDetails({ property }) {
  return (
    <>
      <Head>
        <title>
          {property.type} in {property.locality}, {property.city} | ₹
          {property.price.toLocaleString("en-IN")}
        </title>
        <meta
          name="description"
          content={`${property.type} for ${property.availability} in ${property.locality}, ${property.city}. ${property.bedrooms} BHK with ${property.bathrooms} bathrooms.`}
        />
        <meta
          property="og:title"
          content={`${property.type} in ${property.locality}, ${property.city}`}
        />
        <meta
          property="og:description"
          content={`${property.type} for ${property.availability} in ${property.locality}, ${property.city}.`}
        />
        <meta property="og:type" content="website" />
      </Head>

      <section
        className="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800 space-y-6"
        aria-labelledby="property-details-heading"
        itemScope
        itemType="https://schema.org/Accommodation"
      >
        <header>
          <h2
            id="price-details"
            className="text-xl font-semibold mb-4 flex items-center gap-2"
          >
            <Tag className="w-5 h-5" aria-hidden="true" />
            Price Details
          </h2>
          <p className="text-3xl font-bold text-blue-600" itemProp="price">
            ₹{property.price.toLocaleString("en-IN")}
          </p>
          <meta itemProp="priceCurrency" content="INR" />
        </header>

        <section aria-labelledby="property-specs">
          <h2
            id="property-specs"
            className="text-xl font-semibold mb-4 flex items-center gap-2"
          >
            <Building className="w-5 h-5" aria-hidden="true" />
            Property Details
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <Home className="w-4 h-4 text-gray-600" aria-hidden="true" />
              <span className="text-gray-600">Type:</span>
              <span className="font-medium" itemProp="accommodationType">
                {property.type}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CalendarCheck
                className="w-4 h-4 text-gray-600"
                aria-hidden="true"
              />
              <span className="text-gray-600">Availability:</span>
              <span className="font-medium" itemProp="availability">
                {property.availability}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Building className="w-4 h-4 text-gray-600" aria-hidden="true" />
              <span className="text-gray-600">Total Floors:</span>
              <span className="font-medium">{property.total_floors}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-600" aria-hidden="true" />
              <span className="text-gray-600">Property On:</span>
              <span className="font-medium">Floor {property.property_on}</span>
            </li>
          </ul>
        </section>

        <section aria-labelledby="location-details">
          <h2
            id="location-details"
            className="text-xl font-semibold mb-4 flex items-center gap-2"
          >
            <MapPin className="w-5 h-5" aria-hidden="true" />
            Location Details
          </h2>
          <address
            className="space-y-4 not-italic"
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            {property.house_no && (
              <div>
                <span className="text-gray-600">House No:</span>
                <span className="ml-2 font-medium" itemProp="streetAddress">
                  {property.house_no}
                </span>
              </div>
            )}
            <div>
              <span className="text-gray-600">Locality:</span>
              <span className="ml-2 font-medium" itemProp="addressLocality">
                {property.locality}
              </span>
            </div>
            <div>
              <span className="text-gray-600">City:</span>
              <span className="ml-2 font-medium" itemProp="addressRegion">
                {property.city}
              </span>
            </div>
            {property.location && (
              <div>
                <span className="text-gray-600">Complete Address:</span>
                <span className="ml-2 font-medium">{property.location}</span>
              </div>
            )}
          </address>
        </section>

        <section aria-labelledby="listing-details">
          <h2
            id="listing-details"
            className="text-xl font-semibold mb-4 flex items-center gap-2"
          >
            <Clock className="w-5 h-5" aria-hidden="true" />
            Listing Details
          </h2>
          <div className="space-y-4">
            <div>
              <span className="text-gray-600">Listed On:</span>
              <span className="ml-2 font-medium">
                <time dateTime={property.created_at} itemProp="datePosted">
                  {new Date(property.created_at).toLocaleDateString()}
                </time>
              </span>
            </div>
            <div>
              <span className="text-gray-600">Last Updated:</span>
              <span className="ml-2 font-medium">
                <time dateTime={property.updated_at} itemProp="dateModified">
                  {new Date(property.updated_at).toLocaleDateString()}
                </time>
              </span>
            </div>
          </div>
        </section>

        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-6">
          <Phone className="w-5 h-5" aria-hidden="true" />
          Get Owner Details
        </button>
      </section>
    </>
  );
}

export function PropertyAmenities({ amenities, features, societyFeatures }) {
  return (
    <section
      className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
      aria-labelledby="amenities-heading"
    >
      <h2
        id="amenities-heading"
        className="text-2xl font-semibold mb-6 flex items-center gap-2"
      >
        <Trees className="w-6 h-6" aria-hidden="true" />
        Amenities & Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {amenities?.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-4">Amenities</h3>
            <ul className="space-y-3" itemProp="amenityFeature">
              {amenities.map((amenity, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2"
                  itemProp="amenityFeature"
                >
                  <span className="text-blue-600 mt-1" aria-hidden="true">
                    •
                  </span>
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
                <li
                  key={index}
                  className="flex items-start gap-2"
                  itemProp="amenityFeature"
                >
                  <span className="text-blue-600 mt-1" aria-hidden="true">
                    •
                  </span>
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
                <li
                  key={index}
                  className="flex items-start gap-2"
                  itemProp="amenityFeature"
                >
                  <span className="text-blue-600 mt-1" aria-hidden="true">
                    •
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
