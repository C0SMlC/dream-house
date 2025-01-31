export default function PropertyHeader({ property }) {
  return (
    <div className="border-b pb-4">
      <h1 className="text-2xl font-semibold">{property.title}</h1>
      <p className="text-gray-600 mt-2 dark:text-white">{property.location}</p>
      <div className="flex gap-4 mt-4">
        <span className="text-lg font-medium">₹{property.price}/M</span>
        <span>{property.flat_area} Sq.Ft</span>
      </div>
    </div>
  );
}
