import { Facebook, Instagram, X, Youtube } from "lucide-react";

export const ContactFormOverlay = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Contact us</h2>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Contact No."
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <textarea
                  placeholder="Description"
                  rows="4"
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded w-full">
                SUBMIT
              </button>
            </form>
          </div>

          <div className="bg-blue-600 text-white p-8">
            <div className="mb-8">
              <h3 className="font-bold mb-4">Visit us</h3>
              <p>Shop No 8, Vian Plot</p>
              <p>Navi Sector-47</p>
              <p>Dronagiri, Navi Mumbai</p>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-4">Connect us</h3>
              <div className="flex space-x-4">
                {["Facebook", "Instagram", "whatsapp", "Youtube"].map(
                  (social) => (
                    <a
                      key={social}
                      href={`#${social}`}
                      className="hover:opacity-80"
                    >
                      <social />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
