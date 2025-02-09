"use client";

import { useState } from "react";

const PropertyForm = () => {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    property_type: "",
    location: "",
    city: "",
    locality: "",
    price: "",
    house_no: "",
    num_of_bedrooms: "",
    num_of_bathroom: "",
    balconies: "",
    flat_area: "",
    other_rooms: "",
    furnishing: "",
    parking: false,
    total_floors: "",
    property_on: "",
    availability: "",
    amenities: [],
    features: [],
    society_building_features: [],
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayInput = (e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...files]);
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    setVideos((prev) => [...prev, ...files]);
  };

  // Video removal handler
  const removeVideo = (index) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const cleanedFormData = {
        ...formData,
        num_of_bedrooms: formData.num_of_bedrooms
          ? Number(formData.num_of_bedrooms)
          : null,
        num_of_bathroom: formData.num_of_bathroom
          ? Number(formData.num_of_bathroom)
          : null,
        price: formData.price ? Number(formData.price) : null,
        balconies: formData.balconies ? Number(formData.balconies) : null,
        flat_area: formData.flat_area ? Number(formData.flat_area) : null,
        total_floors: formData.total_floors
          ? Number(formData.total_floors)
          : null,
        property_on: formData.property_on ? Number(formData.property_on) : null,
      };

      const formDataToSend = new FormData();

      formDataToSend.append("json", JSON.stringify(cleanedFormData));

      photos.forEach((photo) => {
        formDataToSend.append("photos", photo);
      });

      videos.forEach((video) => {
        formDataToSend.append("videos", video);
      });

      const response = await fetch("/api/properties", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit property");
      }

      // setStep(1);
      // setFormData({
      //   title: "",
      //   type: "",
      //   property_type: "",
      //   location: "",
      //   city: "",
      //   locality: "",
      //   house_no: "",
      //   num_of_bedrooms: "",
      //   num_of_bathroom: "",
      //   balconies: "",
      //   flat_area: "",
      //   other_rooms: "",
      //   furnishing: "",
      //   parking: false,
      //   total_floors: "",
      //   property_on: "",
      //   availability: "",
      //   amenities: [],
      //   features: [],
      //   society_building_features: [],
      //   password: "",
      // });
      // setPhotos([]);
      // setVideos([]);

      alert("Property submitted successfully!");
    } catch (error) {
      console.error("Error submitting property:", error);
      if (error.message.includes("invalid_type")) {
        alert("Please check all numeric fields are entered correctly");
      } else {
        alert(error.message);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Add New Property
              </h2>
              <span className="text-sm text-gray-500">Step {step} of 4</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Listing Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Sell">Sell</option>
                    <option value="Rent">Rent</option>
                    <option value="PG">PG</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                    required
                  >
                    <option value="">Select Property Type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Locality
                  </label>
                  <input
                    type="text"
                    name="locality"
                    value={formData.locality}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    House Number
                  </label>
                  <input
                    type="text"
                    name="house_no"
                    value={formData.house_no}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Bedrooms
                  </label>
                  <input
                    type="number"
                    name="num_of_bedrooms"
                    value={formData.num_of_bedrooms}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Bathrooms
                  </label>
                  <input
                    type="number"
                    name="num_of_bathroom"
                    value={formData.num_of_bathroom}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Balconies
                  </label>
                  <input
                    type="number"
                    name="balconies"
                    value={formData.balconies}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Flat Area (sq ft)
                  </label>
                  <input
                    type="number"
                    name="flat_area"
                    value={formData.flat_area}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Other Rooms
                  </label>
                  <input
                    type="text"
                    name="other_rooms"
                    value={formData.other_rooms}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Furnishing
                  </label>
                  <select
                    name="furnishing"
                    value={formData.furnishing}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                  >
                    <option value="">Select Furnishing</option>
                    <option value="Furnished">Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parking Available
                  </label>
                  <input
                    type="checkbox"
                    name="parking"
                    checked={formData.parking}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 rounded text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Floors
                  </label>
                  <input
                    type="number"
                    name="total_floors"
                    value={formData.total_floors}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property On Floor
                  </label>
                  <input
                    type="number"
                    name="property_on"
                    value={formData.property_on}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md  text-black"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                  >
                    <option value="">Select Availability</option>
                    <option value="Ready to move">Ready to move</option>
                    <option value="Under Construction">
                      Under Construction
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photos
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Videos
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleVideoUpload}
                    className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100"
                  />
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {videos.map((video, index) => (
                      <div key={index} className="relative">
                        <video
                          src={URL.createObjectURL(video)}
                          className="w-full h-24 object-cover rounded-md"
                          controls
                        />
                        <button
                          type="button"
                          onClick={() => removeVideo(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-black"
                    required
                  />
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  disabled={uploading}
                >
                  Previous
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={uploading}
                >
                  Next
                </button>
              ) : (
                <button
                  type={step === 4 ? "submit" : "button"}
                  disabled={uploading}
                  className="ml-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400"
                >
                  {uploading ? "Uploading..." : "Submit Property"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
