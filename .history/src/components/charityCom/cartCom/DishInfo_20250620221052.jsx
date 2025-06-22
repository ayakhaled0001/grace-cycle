import BtnGreen from "../../Ui/BtnGreen";
import { useSelector } from "react-redux";
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

function DishInfo({ dishId }) {
  const { mainDishes, bakedGoods, dessert, drinks } = useSelector(
    (state) => state.servicesFood
  );
  const { bags } = useSelector((state) => state.bags);

  // Find the dish from all categories
  const allDishes = [...mainDishes, ...bakedGoods, ...dessert, ...drinks];
  const dish =
    allDishes.find((d) => d.id === parseInt(dishId)) ||
    bags.find((b) => b.id === parseInt(dishId));

  if (!dish) {
    return <div>Dish not found</div>;
  }

  // Determine category for breadcrumb
  const getCategory = () => {
    if (mainDishes.find((d) => d.id === parseInt(dishId))) return "main dishes";
    if (bakedGoods.find((d) => d.id === parseInt(dishId))) return "baked goods";
    if (dessert.find((d) => d.id === parseInt(dishId))) return "desserts";
    if (drinks.find((d) => d.id === parseInt(dishId))) return "drinks";
    if (bags.find((b) => b.id === parseInt(dishId))) return "magic bags";
    return "food";
  };

  return (
    <>
      <p className="text-semilightGrey font-nunito py-5">
        Charity &gt;&gt; {getCategory()} &gt;&gt; {dish.name}
      </p>
      <div className="flex justify-center">
        <img
          src={dish.picUrl}
          alt={dish.name}
          className="w-6/12 rounded-md h-80"
        />
        <div className="px-4">
          <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-2xl">
            {getCategory().charAt(0).toUpperCase() + getCategory().slice(1)}
          </h1>
          <h2 className="flex text-3xl py-1">
            {dish.name}
            <span className="flex">
              (
              <img
                src="/icons/star.svg"
                alt="star"
                className="w-4 text-center mr-1 "
              />
              {dish.rating})
            </span>
          </h2>
          <p className="py-2">
            <span className="line-through text-2xl">EGP{dish.unitPrice}</span>
            <span className="text-btnsGreen text-3xl px-1 font-semibold">
              EGP{dish.newPrice}
            </span>
          </p>
          <h3 className="text-lightBrownYellow font-semibold font-nunitoBold text-2xl pt-4">
            Vendor
          </h3>
          <p className="flex pt-1 underline text-btnsGreen text-lg ">
            <img
              src="/icons/person.svg"
              alt="star"
              className="w-4 text-center mr-2 "
            />
            {dish.vName}
          </p>
          <p className="flex pt-1 text-lg">
            <img
              src="/icons/clock.svg"
              alt="star"
              className="w-4 text-center mr-2 "
            />
            {dish.opened ? "Open" : "Closed"}
          </p>
          <p className="flex pt-1 text-lg ">
            <img
              src="/icons/send.svg"
              alt="star"
              className="w-4 text-center mr-2 "
            />
            It is 10 km away from you
          </p>
        </div>
        <div className="p-4 border-2 border-lightBrownYellow rounded-lg mx-5 w-3/12">
          <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-2xl">
            Available:
          </h1>
          <span className="text-xl font-nunito">{dish.quantity} Pieces</span>
          <div className="flex items-center justify-around my-4">
            <button className="border-2 border-btnsGreen rounded-md py-5 px-2">
              <img src="/icons/minus.svg" alt="discard item" />
            </button>
            <span className="text-2xl font-nunitoBold">2</span>
            <button className="border-2 border-btnsGreen bg-btnsGreen rounded-md p-2">
              <img src="/icons/add.svg" alt="add item" />
            </button>
          </div>
          <p className="font-nunito text-2xl border border-nescafe py-1 rounded-md px-1">
            Total: <span>EGP {dish.newPrice * 2}</span>
          </p>
          <BtnGreen>Add to Cart</BtnGreen>
        </div>
      </div>
      <div className=" py-5">
        <h4 className="text-lightBrownYellow font-semibold font-nunitoBold text-2xl">
          Description
        </h4>
        <p className="py-1 text-xl">
          {dish.description ||
            `${dish.name} is a delicious and high-quality dish prepared with fresh ingredients. This item is part of our charity program to reduce food waste while providing you with excellent meals at discounted prices.`}
        </p>
      </div>

      {/* Ratings and Reviews Section */}
      <div className="mt-10 pt-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Column: Ratings Overview */}
          <div className="w-full md:w-1/3">
            <h3 className="text-2xl font-bold font-nunitoBold text-lightBrownYellow mb-4">
              Ratings and Reviews
            </h3>
            <div></div>
            <div className="flex flex-col gap-4 mb-4">
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
            <div className="space-y-1">
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
                    className="w-full h-2.5 rounded-full [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-btnsGreen [&::-moz-progress-bar]:bg-btnsGreen"
                    value={value}
                    max="100"></progress>
                </div>
              ))}
            </div>

            {/* Rate this item */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-lightBrownYellow">
                Rate this Item
              </h4>
              <p className="text-gray-600 mb-2">Tell others what you think</p>
              <div className="flex items-center gap-2 text-gray-300 mb-4">
                <StarBorderRoundedIcon style={{ fontSize: "2.5rem" }} />
                <StarBorderRoundedIcon style={{ fontSize: "2.5rem" }} />
                <StarBorderRoundedIcon style={{ fontSize: "2.5rem" }} />
                <StarBorderRoundedIcon style={{ fontSize: "2.5rem" }} />
                <StarBorderRoundedIcon style={{ fontSize: "2.5rem" }} />
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
      </div>
    </>
  );
}

DishInfo.propTypes = {
  dishId: PropTypes.string.isRequired,
};

export default DishInfo;
