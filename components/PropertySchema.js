export default function PropertySchema({ property }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: `${property.num_of_bedrooms} BHK ${property.property_type} for ${property.type}`,
    price: property.price,
    priceCurrency: "INR",
    address: {
      "@type": "PostalAddress",
      addressLocality: property.locality,
      addressRegion: property.city,
    },
    numberOfBedrooms: property.num_of_bedrooms,
    numberOfBathrooms: property.num_of_bathroom,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.flat_area,
      unitText: "SQFT",
    },
    image: property.property_photos?.map((photo) => photo.photo_url) || [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
