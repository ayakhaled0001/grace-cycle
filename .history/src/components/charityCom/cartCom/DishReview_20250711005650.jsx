import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ReviewCard = ({ imgSrc, name, date, rating, reviewText }) => {
  return (
    <div className="border border-nescafe rounded-lg p-2 mob470:p-3 mob560:p-3 md:p-4 mb-3 mob470:mb-4 mob560:mb-4">
      <div className="flex items-start md:items-center mb-2 gap-2 mob470:gap-3 mob560:gap-3 md:gap-4">
        <img
          src={imgSrc}
          alt={name}
          className="w-8 h-8 mob470:w-10 mob470:h-10 mob560:w-10 mob560:h-10 md:w-12 md:h-12 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h5 className="font-bold text-xs mob470:text-sm mob560:text-sm md:text-base">
            {name}
          </h5>
          <div className="flex flex-col sm:flex-row sm:items-center text-xs mob470:text-xs mob560:text-xs md:text-sm text-gray-500 gap-1 sm:gap-2">
            <div className="flex text-semiBrightYellow">
              {[...Array(5)].map((_, i) =>
                i < rating ? (
                  <StarRoundedIcon key={i} style={{ fontSize: "0.75rem" }} />
                ) : (
                  <StarBorderRoundedIcon
                    key={i}
                    style={{ fontSize: "0.75rem" }}
                  />
                )
              )}
            </div>
            <span className="text-xs">{date}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-xs mob470:text-sm mob560:text-sm md:text-base leading-relaxed">
        {reviewText}
      </p>
    </div>
  );
};

ReviewCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reviewText: PropTypes.string.isRequired,
};

function DishReview({
  contains,
  reviews,
  useVendorReviews,
  itemType = "dish",
  vendorReviews,
  vendorReviewsSummary,
  customTitle,
  showRatingSection = true,
}) {
  // Get reviews from different sources based on itemType
  const vendorDetailsState = useSelector((state) => state.vendorDetails);
  const {
    reviews: foodReviews,
    reviewsSummary,
    error: foodListingError,
  } = useSelector((state) => state.foodListing);

  // Determine which reviews to display
  let displayReviews = [];
  let displayReviewsSummary = null;

  if (itemType === "dish") {
    // For dishes, use food listing reviews
    // If there's an API error, fall back to empty reviews
    if (foodListingError) {
      console.log("Food listing API error, using empty reviews");
      displayReviews = [];
      displayReviewsSummary = null;
    } else {
      displayReviews = foodReviews || [];
      displayReviewsSummary = reviewsSummary;
    }
  } else if (useVendorReviews || itemType === "vendor") {
    // For vendor pages, use vendor reviews
    // Priority: props > vendorDetails state
    displayReviews = vendorReviews || vendorDetailsState.reviews || [];
    displayReviewsSummary =
      vendorReviewsSummary || vendorDetailsState.reviewsSummary || null;
  } else {
    // Fallback to passed reviews prop
    displayReviews = reviews || [];
  }

  // Calculate average rating from reviews summary or reviews
  const getAverageRating = () => {
    if (displayReviewsSummary && displayReviewsSummary.averageRating) {
      return displayReviewsSummary.averageRating;
    }
    if (displayReviews.length > 0) {
      const totalRating = displayReviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      return (totalRating / displayReviews.length).toFixed(1);
    }
    return "0.0";
  };

  // Calculate rating distribution
  const getRatingDistribution = () => {
    if (displayReviewsSummary) {
      const total = displayReviewsSummary.totalReviews;
      if (total === 0) return [];

      return [
        { rating: 5, value: (displayReviewsSummary.fiveStars / total) * 100 },
        { rating: 4, value: (displayReviewsSummary.fourStars / total) * 100 },
        { rating: 3, value: (displayReviewsSummary.threeStars / total) * 100 },
        { rating: 2, value: (displayReviewsSummary.twoStars / total) * 100 },
        { rating: 1, value: (displayReviewsSummary.oneStar / total) * 100 },
      ];
    }

    // Fallback calculation from reviews array
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    displayReviews.forEach((review) => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });

    const total = displayReviews.length;
    if (total === 0) return [];

    return [
      { rating: 5, value: (distribution[5] / total) * 100 },
      { rating: 4, value: (distribution[4] / total) * 100 },
      { rating: 3, value: (distribution[3] / total) * 100 },
      { rating: 2, value: (distribution[2] / total) * 100 },
      { rating: 1, value: (distribution[1] / total) * 100 },
    ];
  };

  const averageRating = getAverageRating();
  const ratingDistribution = getRatingDistribution();

  // Get the appropriate title based on itemType or custom title
  const getTitle = () => {
    if (customTitle) return customTitle;

    switch (itemType) {
      case "vendor":
        return "Vendor Ratings and Reviews";
      case "bag":
        return "Magic Bag Ratings and Reviews";
      default:
        return "Ratings and Reviews";
    }
  };

  // Get the appropriate rate button text
  const getRateButtonText = () => {
    switch (itemType) {
      case "vendor":
        return "Rate this Vendor";
      case "bag":
        return "Rate this Magic Bag";
      default:
        return "Rate this Item";
    }
  };

  return (
    <section className="mt-6 mob470:mt-8 mob560:mt-8 md:mt-10 pt-6 mob470:pt-8 mob560:pt-8 md:pt-10 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-4 mob470:gap-6 mob560:gap-6 md:gap-8 lg:gap-10">
        {/* Left Column: Ratings Overview */}
        <div className="w-full lg:w-5/6 space-y-4 mob470:space-y-6 mob560:space-y-6">
          <h3 className="text-lg mob470:text-xl mob560:text-xl md:text-2xl font-bold font-nunitoBold text-lightBrownYellow mb-3 mob470:mb-4 mob560:mb-4">
            {getTitle()}
          </h3>

          {/* Contains section for magic bags */}
          {contains && contains.length > 0 && (
            <div className="mb-4">
              <p className="text-sm mob470:text-base mob560:text-base md:text-lg font-semibold text-lightBrownYellow">
                Contains:
              </p>
              <p className="text-sm mob470:text-base mob560:text-base md:text-lg text-darkgray">
                {contains.join(", ")}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mob470:gap-4 mob560:gap-4 md:gap-6">
            <div className="flex flex-col gap-2 mob470:gap-3 mob560:gap-3 md:gap-4 mb-3 mob470:mb-4 mob560:mb-4 w-full sm:w-2/6">
              <span className="text-3xl mob470:text-4xl mob560:text-4xl md:text-5xl font-bold">
                {averageRating}
              </span>
              <div className="flex flex-col">
                <div className="flex">
                  {[...Array(5)].map((_, i) => {
                    const ratingNum = parseFloat(averageRating);
                    if (i < Math.floor(ratingNum)) {
                      return (
                        <StarRoundedIcon
                          key={i}
                          className="text-semiBrightYellow text-base mob470:text-lg mob560:text-lg md:text-xl"
                        />
                      );
                    } else if (
                      i === Math.floor(ratingNum) &&
                      ratingNum % 1 > 0
                    ) {
                      return (
                        <StarHalfRoundedIcon
                          key={i}
                          className="text-semiBrightYellow text-base mob470:text-lg mob560:text-lg md:text-xl"
                        />
                      );
                    } else {
                      return (
                        <StarBorderRoundedIcon
                          key={i}
                          className="text-semiBrightYellow text-base mob470:text-lg mob560:text-lg md:text-xl"
                        />
                      );
                    }
                  })}
                </div>
              </div>
              {displayReviewsSummary && (
                <span className="text-sm text-gray-600">
                  {displayReviewsSummary.totalReviews} reviews
                </span>
              )}
            </div>

            {/* Rating Bars */}
            <div className="space-y-1 mob470:space-y-2 mob560:space-y-2 md:space-y-1 w-full">
              {ratingDistribution.map(({ rating, value }) => (
                <div
                  key={rating}
                  className="flex items-center gap-1 mob470:gap-2 mob560:gap-2">
                  <span className="w-3 mob470:w-4 mob560:w-4 font-nunito text-xs mob470:text-sm mob560:text-sm md:text-base">
                    {rating}
                  </span>
                  <progress
                    className="w-full h-1.5 mob470:h-2 mob560:h-2 md:h-3 rounded-full overflow-hidden [&::-webkit-progress-bar]:bg-zinc-400 [&::-webkit-progress-value]:bg-btnsGreen [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:bg-btnsGreen"
                    value={value}
                    max="100"></progress>
                </div>
              ))}
            </div>
          </div>

          {/* Rate this item */}
          <div className="mt-4 mob470:mt-6 mob560:mt-6 md:mt-8 space-y-2 mob470:space-y-3 mob560:space-y-3 md:space-y-4">
            <h4 className="text-base mob470:text-lg mob560:text-lg md:text-xl font-bold text-lightBrownYellow">
              {getRateButtonText()}
            </h4>
            <p className="text-gray-600 mb-2 text-xs mob470:text-sm mob560:text-sm md:text-base">
              Tell others what you think
            </p>
            <div className="flex items-center gap-1 mob470:gap-1 mob560:gap-1 md:gap-2 text-gray-300 mb-3 mob470:mb-4 mob560:mb-4">
              <StarRoundedIcon
                style={{ fontSize: "2.5rem" }}
                className="text-[#bdbdbd] hover:text-semiBrightYellow cursor-pointer transition-colors"
              />
              <StarRoundedIcon
                style={{ fontSize: "2.5rem" }}
                className="text-[#bdbdbd] hover:text-semiBrightYellow cursor-pointer transition-colors"
              />
              <StarRoundedIcon
                style={{ fontSize: "2.5rem" }}
                className="text-[#bdbdbd] hover:text-semiBrightYellow cursor-pointer transition-colors"
              />
              <StarRoundedIcon
                style={{ fontSize: "2.5rem" }}
                className="text-[#bdbdbd] hover:text-semiBrightYellow cursor-pointer transition-colors"
              />
              <StarRoundedIcon
                style={{ fontSize: "2.5rem" }}
                className="text-[#bdbdbd] hover:text-semiBrightYellow cursor-pointer transition-colors"
              />
            </div>
            <button className="w-full border border-btnsGreen text-btnsGreen font-semibold py-2 mob470:py-3 mob560:py-3 md:py-2 rounded-lg hover:bg-btnsGreen hover:text-white transition-colors text-xs mob470:text-sm mob560:text-sm md:text-base">
              Write a review
            </button>
          </div>
        </div>

        {/* Right Column: Reviews List */}
        <div className="w-full lg:w-2/3 lg:pl-0 xl:pl-10 space-y-3 mob470:space-y-4 mob560:space-y-4 md:space-y-6">
          <h3 className="text-lg mob470:text-xl mob560:text-xl md:text-2xl font-bold font-nunitoBold text-lightBrownYellow mb-3 mob470:mb-4 mob560:mb-4">
            Reviews of others
          </h3>
          <div className="space-y-3 mob470:space-y-4 mob560:space-y-4 md:space-y-6">
            {displayReviews.length > 0 ? (
              displayReviews.map((review, idx) => (
                <ReviewCard
                  key={idx}
                  imgSrc={"/homeMedia/personreview1.png"} // You may want to use a real avatar if available
                  name={review.customerName || "Anonymous"}
                  date={review.date || ""}
                  rating={review.rating}
                  reviewText={review.comment}
                />
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
          <button className="text-btnsGreen font-semibold mt-3 mob470:mt-4 mob560:mt-4 underline text-xs mob470:text-sm mob560:text-sm md:text-base hover:text-green-600 transition-colors">
            See more reviews
          </button>
        </div>
      </div>
    </section>
  );
}

DishReview.propTypes = {
  contains: PropTypes.arrayOf(PropTypes.string),
  reviews: PropTypes.array,
  useVendorReviews: PropTypes.bool,
  itemType: PropTypes.oneOf(["dish", "bag", "vendor"]),
  vendorReviews: PropTypes.array,
  vendorReviewsSummary: PropTypes.object,
  customTitle: PropTypes.string,
};

export default DishReview;
