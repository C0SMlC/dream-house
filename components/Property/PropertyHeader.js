import Head from "next/head";

export default function PropertyHeader({ property }) {
  return (
    <>
      <Head>
        <title>{property.title} | Real Estate Property</title>
        <meta
          name="description"
          content={`${property.title} located in ${property.location} - ${property.flat_area} Sq.Ft for ₹${property.price}/M`}
        />
      </Head>

      <header className="border-b pb-4">
        <h1 className="text-2xl font-semibold">{property.title}</h1>
        <address className="text-gray-600 mt-2 dark:text-white not-italic">
          {property.location}
        </address>
        <div className="flex gap-4 mt-4" aria-label="Property details">
          <span className="text-lg font-medium">₹{property.price}/M</span>
          <span>{property.flat_area} Sq.Ft</span>
        </div>
      </header>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          name: property.title,
          address: {
            "@type": "PostalAddress",
            addressLocality: property.location,
          },
          floorSize: {
            "@type": "QuantitativeValue",
            value: property.flat_area,
            unitCode: "SQFT",
          },
          price: property.price,
          priceCurrency: "INR",
          priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        })}
      </script>
    </>
  );
}
