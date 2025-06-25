import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";
import PropTypes from "prop-types";

const ReviewCard = ({ imgSrc, name, date, rating, reviewText }) => {
  return (
    <div className="border border-nescafe rounded-lg p-2 mob560:p-3 md:p-4 mb-3 mob560:mb-4">
      <div className="flex items-start md:items-center mb-2 gap-2 mob560:gap-3 md:gap-4">
        <img
          src={imgSrc}
          alt={name}
          className="w-8 h-8 mob560:w-10 mob560:h-10 md:w-12 md:h-12 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h5 className="font-bold text-xs mob560:text-sm md:text-base">
            {name}
          </h5>
          <div className="flex flex-col sm:flex-row sm:items-center text-xs mob560:text-xs md:text-sm text-gray-500 gap-1 sm:gap-2">
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
      <p className="text-gray-700 text-xs mob560:text-sm md:text-base leading-relaxed">
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

function DishReview() {
  return (
    <section className="mt-6 mob560:mt-8 md:mt-10 pt-6 mob560:pt-8 md:pt-10 px-2 mob560:px-4 md:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-4 mob560:gap-6 md:gap-8 lg:gap-10">
        {/* Left Column: Ratings Overview */}
        <div className="w-full lg:w-5/6 space-y-4 mob560:space-y-6">
          <h3 className="text-lg mob560:text-xl md:text-2xl font-bold font-nunitoBold text-lightBrownYellow mb-3 mob560:mb-4">
            Ratings and Reviews
          </h3>

          <div className="flex flex-col sm:flex-row gap-3 mob560:gap-4 md:gap-6">
            <div className="flex flex-col gap-2 mob560:gap-3 md:gap-4 mb-3 mob560:mb-4 w-full sm:w-2/6">
              <span className="text-3xl mob560:text-4xl md:text-5xl font-bold">
                4.5
              </span>
              <div className="flex flex-col">
                <div className="flex">
                  <StarRoundedIcon className="text-semiBrightYellow text-base mob560:text-lg md:text-xl" />
                  <StarRoundedIcon className="text-semiBrightYellow text-base mob560:text-lg md:text-xl" />
                  <StarRoundedIcon className="text-semiBrightYellow text-base mob560:text-lg md:text-xl" />
                  <StarRoundedIcon className="text-semiBrightYellow text-base mob560:text-lg md:text-xl" />
                  <StarHalfRoundedIcon className="text-semiBrightYellow text-base mob560:text-lg md:text-xl" />
                </div>
              </div>
            </div>

            {/* Rating Bars */}
            <div className="space-y-1 mob560:space-y-2 md:space-y-1 w-full">
              {[
                { rating: 5, value: 90 },
                { rating: 4, value: 60 },
                { rating: 3, value: 30 },
                { rating: 2, value: 15 },
                { rating: 1, value: 5 },
              ].map(({ rating, value }) => (
                <div
                  key={rating}
                  className="flex items-center gap-1 mob560:gap-2">
                  <span className="w-3 mob560:w-4 font-nunito text-xs mob560:text-sm md:text-base">
                    {rating}
                  </span>
                  <progress
                    className="w-full h-1.5 mob560:h-2 md:h-3 rounded-full overflow-hidden [&::-webkit-progress-bar]:bg-zinc-400 [&::-webkit-progress-value]:bg-btnsGreen [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:bg-btnsGreen"
                    value={value}
                    max="100"></progress>
                </div>
              ))}
            </div>
          </div>

          {/* Rate this item */}
          <div className="mt-4 mob560:mt-6 md:mt-8 space-y-2 mob560:space-y-3 md:space-y-4">
            <h4 className="text-base mob560:text-lg md:text-xl font-bold text-lightBrownYellow">
              Rate this Item
            </h4>
            <p className="text-gray-600 mb-2 text-xs mob560:text-sm md:text-base">
              Tell others what you think
            </p>
            <div className="flex items-center gap-1 mob560:gap-1 md:gap-2 text-gray-300 mb-3 mob560:mb-4">
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
            <button className="w-full border border-btnsGreen text-btnsGreen font-semibold py-2 mob560:py-3 md:py-2 rounded-lg hover:bg-btnsGreen hover:text-white transition-colors text-xs mob560:text-sm md:text-base">
              Write a review
            </button>
          </div>
        </div>

        {/* Right Column: Reviews List */}
        <div className="w-full lg:w-2/3 lg:pl-0 xl:pl-10 space-y-3 mob560:space-y-4 md:space-y-6">
          <h3 className="text-lg mob560:text-xl md:text-2xl font-bold font-nunitoBold text-lightBrownYellow mb-3 mob560:mb-4">
            Reviews of others
          </h3>
          <div className="space-y-3 mob560:space-y-4 md:space-y-6">
            <ReviewCard
              imgSrc="/homeMedia/personreview1.png"
              name="Mohamed Soliman"
              date="1/3/25"
              rating={4}
              reviewText="Grilled salmon is a perfect meal for busy weeknights. It doesn't take much time to prepare and cook, and the result is always satisfying."
            />
            <ReviewCard
              imgSrc="/homeMedia/personreview2.png"
              name="Habiba Abdullah"
              date="25/2/25"
              rating={3}
              reviewText="The smell of cooking salmon can be quite strong and can spread throughout the house. You need to make sure you have good ventilation while cooking."
            />
            <ReviewCard
              imgSrc="/homeMedia/personreview3.png"
              name="Ali Mahmoud"
              date="25/2/25"
              rating={5}
              reviewText="Grilling gives salmon a light and distinctive smoky flavor that you can't achieve with other cooking methods. This flavor makes the dish even more appealing."
            />
          </div>
          <button className="text-btnsGreen font-semibold mt-3 mob560:mt-4 underline text-xs mob560:text-sm md:text-base hover:text-green-600 transition-colors">
            See more reviews
          </button>
        </div>
      </div>
    </section>
  );
}

export default DishReview;
