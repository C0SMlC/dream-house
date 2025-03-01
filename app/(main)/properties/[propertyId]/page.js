import { Suspense } from "react";
import PropertyDetails from "@/components/Property/PropertyDetails";
import PropertyHeader from "@/components/Property/PropertyHeader";
import PropertyOverview from "@/components/Property/PropertyOverview";
import PropertyAmenities from "@/components/Property/PropertyAmenities";
import PropertySchema from "@/components/PropertySchema";
import TabbedGallery from "@/components/TabbedGallery"; // updated import

async function getProperty(propertyId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${propertyId}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch property");
    return res.json();
  } catch (error) {
    console.error("Error fetching property:", error);
    throw error;
  }
}

export async function generateMetadata({ params }) {
  const { propertyId } = await params;
  const propertyResponse = await getProperty(propertyId);
  const property = propertyResponse.data;

  const title = `${property.title} | ${property.locality}, ${property.city}`;
  const description = `${property.num_of_bedrooms} BHK ${
    property.property_type
  } for ${property.type} in ${property.locality}, ${property.city}. ${
    property.flat_area
  } sq ft. Features include ${property.amenities?.join(", ")}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: property.property_photos?.[0]?.photo_url
        ? [{ url: property.property_photos[0].photo_url }]
        : null,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: property.property_photos?.[0]?.photo_url
        ? [property.property_photos[0].photo_url]
        : null,
    },
  };
}

export default async function PropertyPage({ params }) {
  const { propertyId } = await params;
  const propertyResponse = await getProperty(propertyId);
  const property = propertyResponse.data;

  console.log(property);

  return (
    <>
      <PropertySchema property={property} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <header>
          <PropertyHeader property={property} />
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 mb-8">
          {/* Main Content - 2 columns on large screens */}
          <article className="lg:col-span-2">
            {/* Use Suspense while loading */}
            <Suspense fallback={<div>Loading gallery...</div>}>
              <TabbedGallery
                photos={property?.property_photos?.map(
                  (photo) => photo.photo_url
                )}
                videos={property?.property_videos?.map((video) => video)}
              />
            </Suspense>

            <section aria-label="Property Overview">
              <PropertyOverview property={property} />
            </section>

            <section aria-label="Property Features">
              <PropertyAmenities
                amenities={property.amenities}
                features={property.features}
                societyFeatures={property.society_building_features}
              />
            </section>
          </article>

          <aside>
            <PropertyDetails property={property} />
          </aside>
        </section>
      </main>
    </>
  );
}
