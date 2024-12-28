"use client";
export default function SearchBar() {
  return (
    <div className="relative -mt-16 z-10 bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto text-black">
      <div className="flex gap-4 mb-4 overflow-x-auto">
        <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 whitespace-nowrap">
          Buy
        </button>
        <button className="px-4 py-2 whitespace-nowrap">Rent</button>
        <button className="px-4 py-2 whitespace-nowrap">New Launch</button>
        <button className="px-4 py-2 whitespace-nowrap">Commercial</button>
        <button className="px-4 py-2 whitespace-nowrap">Plots/Land</button>
        <button className="px-4 py-2 whitespace-nowrap">Projects</button>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <select className="px-4 py-2 border rounded-lg">
          <option>All Residential</option>
        </select>
        <input
          type="text"
          placeholder="Search 'Flats for sale in Sector 50 Dronagiri'"
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button className="px-8 py-2 bg-blue-600 text-white rounded-lg">
          Search
        </button>
      </div>
    </div>
  );
}
