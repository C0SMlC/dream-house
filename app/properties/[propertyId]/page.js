import { Suspense } from "react";
import PropertyDetails from "@/components/Property/PropertyDetails";
import PropertyHeader from "@/components/Property/PropertyHeader";
import PropertyGallery from "@/components/Property/PropertyGallery";
import PropertyOverview from "@/components/Property/PropertyOverview";
import PropertyAmenities from "@/components/Property/PropertyAmenities";

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

export default async function PropertyPage({ params }) {
  const { propertyId } = await params;
  const propertyResponse = await getProperty(propertyId);
  const property = propertyResponse.data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PropertyHeader property={property} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <Suspense fallback={<div>Loading gallery...</div>}>
            {
              <PropertyGallery
                photos={property?.property_photos?.map(
                  (photo_url) => photo_url
                )}
                videos={property?.property_videos?.map(
                  (video_url) => video_url
                )}
              />
            }
          </Suspense>
          <PropertyOverview property={property} />
          <PropertyAmenities
            amenities={property.amenities}
            features={property.features}
            societyFeatures={property.society_building_features}
          />
        </div>
        <PropertyDetails property={property} />
      </div>
    </div>
  );
}
