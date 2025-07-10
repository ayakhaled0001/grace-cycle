// src/components/charityCom/vendorDetCom/SimilarVendors.jsx
import PropTypes from "prop-types";

const SimilarVendors = ({ vendors }) => {
  if (!vendors || vendors.length === 0) return null;

  return (
    <div className="mb-8 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {vendors.length} vendors
        </span>
      </div>
      <div className="grid grid-cols-1 mob470:grid-cols-2 mob560:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {vendors.map((vendor) => (
          <div
            key={vendor.userId}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={vendor.picUrl}
                alt={vendor.displayName}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Rating Badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <img src="/icons/star.svg" alt="star" className="w-3 h-3" />
                {vendor.rating}
              </div>
            </div>
            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">
                {vendor.displayName}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                {vendor.address}
              </p>
              {/* Vendor Type */}
              <div className="flex items-center justify-between">
                <span className="text-xs bg-lightBrownYellow/10 text-lightBrownYellow px-2 py-1 rounded-full">
                  {vendor.vendorType || "Vendor"}
                </span>
                <button className="text-btnsGreen text-sm font-semibold hover:text-green-600 transition-colors">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

SimilarVendors.propTypes = {
  vendors: PropTypes.array.isRequired,
};

export default SimilarVendors;
