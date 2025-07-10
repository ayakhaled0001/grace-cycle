// src/components/charityCom/vendorDetCom/VendorItemsOffered.jsx
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ArrowForwardIosTwoToneIcon from "@mui/icons-material/ArrowForwardIosTwoTone";
const VendorItemsOffered = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-8 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8 lg:w-10/12 mx-auto">
      <div className="grid grid-cols-1 mob470:grid-cols-2 mob560:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden group flex">
            {/* Image */}
            <div className="relative overflow-hidden rounded-md">
              <img
                src={item.picUrl}
                alt={item.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-md"
              />
              {/* Discount Badge */}
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {Math.round(
                  ((item.unitPrice - item.newPrice) / item.unitPrice) * 100
                )}
                % OFF
              </div>
            </div>
            {/* Content */}
            <div className="p-4 w-6/12">
              <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{item.vName}</p>
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                <img src="/icons/star.svg" alt="star" className="w-4 h-4" />
                <span className="text-sm text-gray-600">{item.rating}</span>
              </div>
              {/* Price */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm line-through text-gray-400">
                    EGP {item.unitPrice}
                  </span>
                  <div className="text-lg font-bold text-btnsGreen">
                    EGP {item.newPrice}
                  </div>
                </div>
                <button className="bg-btnsGreen text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors">
                  <ArrowForwardIosTwoToneIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

VendorItemsOffered.propTypes = {
  items: PropTypes.array.isRequired,
};

export default VendorItemsOffered;
