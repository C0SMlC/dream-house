const { X } = require("lucide-react");

export const RentalAgreementOverlay = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>

        {/* Agreement Image */}
        <div className="w-full h-72 bg-neutral-100 dark:bg-gray-700">
          <img
            src="/Agreement.jpg"
            alt="Rental Agreement"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid md:grid-cols-2">
          {/* Left Section */}
          <div className="p-8 bg-blue-600 text-white">
            <h2 className="text-2xl font-bold mb-2">Online Rent Agreement</h2>
            <p className="mb-6">
              Best Online Rent Agreement Services in Navi Mumbai
            </p>
            <div className="relative w-full max-w-md">
              <img
                src="/Agreement1.jpg"
                alt="Agreement Illustration"
                className="w-full"
              />
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="p-8 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Get a Call back
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please fill this form to get an assured callback
            </p>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Contact no"
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                SUBMIT
              </button>
            </form>

            <div className="text-center mt-6 text-blue-600 dark:text-blue-400">
              For Inquiry Contact us on 9137821151
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
