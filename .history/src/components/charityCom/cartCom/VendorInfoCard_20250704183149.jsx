import PropTypes from "prop-types";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

const VendorInfoCard = ({ vendor }) => {
  if (!vendor) return null;
  return (
    <div className="flex flex-col lg:flex-row justify-center gap-6 px-6 lg:px-8">
      {/* Vendor Image Section */}
      <div className="w-full lg:w-5/12 flex justify-center relative">
        {/* Favorite Icon */}
        <span className="shadow-xl rounded-full bg-semiDarkBeige p-2 mob470:p-3 absolute left-3 bottom-3 z-10">
          <FavoriteOutlinedIcon
            className="cursor-pointer text-lg mob470:text-xl text-paleBarkYellow"
            // TODO: Add favorite logic if needed
          />
        </span>
        <img
          src={vendor.picUrl}
          alt={vendor.displayName}
          className="w-full max-w-sm mob470:max-w-md mob560:max-w-md md:max-w-lg lg:max-w-none rounded-md h-56 mob470:h-64 mob560:h-64 md:h-72 lg:h-80 object-cover"
        />
      </div>
      {/* Vendor Information Section */}
      <div className="w-full lg:w-5/12 px-0 mob470:px-1 mob560:px-2 md:px-4 space-y-4">
        <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
          Vendor Details
        </h1>
        <h2 className="flex flex-col sm:flex-row text-xl mob470:text-2xl mob560:text-2xl md:text-3xl py-1 gap-2">
          <span className="break-words">{vendor.displayName}</span>
          <span className="flex items-center text-base mob470:text-lg mob560:text-lg md:text-xl">
            (
            <img
              src="/icons/star.svg"
              alt="star"
              className="w-3 mob470:w-4 mob560:w-4 text-center mr-1"
            />
            {vendor.rating})
          </span>
        </h2>
        <div className="space-y-3">
          <div className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
            <img
              src="/icons/send.svg"
              alt="location"
              className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
            />
            <span className="font-semibold text-lightBrownYellow">
              Address:
            </span>
            <span className="ml-2">{vendor.address}</span>
          </div>
          <div className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
            <img
              src="/icons/clock.svg"
              alt="clock"
              className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
            />
            <span className="font-semibold text-lightBrownYellow">
              Working Hours:
            </span>
            <span className="ml-2">
              {vendor.opening} - {vendor.closing}
            </span>
          </div>
          <div className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
            <img
              src="/icons/star.svg"
              alt="rating"
              className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
            />
            <span className="font-semibold text-lightBrownYellow">Rating:</span>
            <span className="ml-2">{vendor.rating}/5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

VendorInfoCard.propTypes = {
  vendor: PropTypes.object.isRequired,
};

export default VendorInfoCard;
