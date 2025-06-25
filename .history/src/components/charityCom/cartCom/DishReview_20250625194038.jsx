import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";
import PropTypes from "prop-types";

const ReviewCard = ({ imgSrc, name, date, rating, reviewText }) => {
  return (
    <div className="border border-nescafe rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <img src={imgSrc} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h5 className="font-bold">{name}</h5>
          <div className="flex items-center text-sm text-gray-500">
            <div className="flex text-semiBrightYellow">
              {[...Array(5)].map((_, i) =>
                i < rating ? (
                  <StarRoundedIcon key={i} style={{ fontSize: "1rem" }} />
                ) : (
                  <StarBorderRoundedIcon key={i} style={{ fontSize: "1rem" }} />
                )
              )}
            </div>
            <span className="ml-2">{date}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700">{reviewText}</p>
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
    <section className="mt-10 pt-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Column: Ratings Overview */}
        <div className="w-full md:w-5/6">
          <h3 className="text-2xl font-bold font-nunitoBold text-lightBrownYellow mb-4">
            Ratings and Reviews
          </h3>
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 mb-4 w-2/6">
              <span className="text-5xl font-bold">4.5</span>
              <div className="flex flex-col">
                <div>
                  <StarRoundedIcon className="text-semiBrightYellow" />
                  <StarRoundedIcon className="text-semiBrightYellow" />
                  <StarRoundedIcon className="text-semiBrightYellow" />
                  <StarRoundedIcon className="text-semiBrightYellow" />
                  <StarHalfRoundedIcon className="text-semiBrightYellow" />
                </div>
              </div>
            </div>
            {/* Rating Bars */}
            <div className="space-y-1 w-full">
              {[
                { rating: 5, value: 90 },
                { rating: 4, value: 60 },
                { rating: 3, value: 30 },
                { rating: 2, value: 15 },
                { rating: 1, value: 5 },
              ].map(({ rating, value }) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="w-4 font-nunito">{rating}</span>
                  <progress
                    className="w-full h-3 rounded-full overflow-hidden [&::-webkit-progress-bar]:bg-zinc-400 [&::-webkit-progress-value]:bg-btnsGreen [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:bg-btnsGreen"
                    value={value}
                    max="100"></progress>
                </div>
              ))}
            </div>
          </div>

          {/* Rate this item */}
          <div className="mt-8">
            <h4 className="text-xl font-bold text-lightBrownYellow">
              Rate this Item
            </h4>
            <p className="text-gray-600 mb-2">Tell others what you think</p>
            <div className="flex items-center gap-2 text-gray-300 mb-4">
              <StarRoundedIcon
                style={{ fontSize: "4rem" }}
                className="text-[#bdbdbd] hover:text-semiBrightYellow"
              />
              <StarRoundedIcon
                style={{ fontSize: "4rem" }}
                className="text-[#bdbdbd] hover:text-semiBrightYellow"
              />
              <StarRoundedIcon
                style={{ fontSize: "4rem" }}
                className="text-[#bdbdbd] hover:text-semiBrightYellow"
              />
              <StarRoundedIcon
                style={{ fontSize: "4rem" }}
                className="text-[#bdbdbd] hover:text-semiBrightYellow"
              />{" "}
              <StarRoundedIcon
                style={{ fontSize: "4rem" }}
                className="text-[#bdbdbd] hover:text-semiBrightYellow"
              />
            </div>
            <button className="w-full border border-btnsGreen text-btnsGreen font-semibold py-2 rounded-lg hover:bg-btnsGreen hover:text-white transition">
              Write a review
            </button>
          </div>
        </div>

        {/* Right Column: Reviews List */}
        <div className="w-full md:w-2/3  md:pl-10">
          <h3 className="text-2xl font-bold font-nunitoBold text-lightBrownYellow mb-4">
            Reviews of others
          </h3>
          <div className="space-y-6">
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
          <button className="text-btnsGreen font-semibold mt-4 underline">
            See more reviews
          </button>
        </div>
      </div>
    </section>
  );
}

export default DishReview;
