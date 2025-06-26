import BtnGreen from "../../Ui/BtnGreen";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

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
      <p className="text-semilightGrey font-nunito py-2 mob470:py-3 mob560:py-3 md:py-5 px-2 mob470:px-3 mob560:px-4 md:px-0 text-xs mob470:text-sm mob560:text-sm md:text-base">
        Charity &gt;&gt; {getCategory()} &gt;&gt; {dish.name}
      </p>

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row justify-center gap-3 mob470:gap-4 mob560:gap-6 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8">
        {/* Image Section */}
        <div className="w-full lg:w-6/12 flex justify-center">
          <img
            src={dish.picUrl}
            alt={dish.name}
            className="w-full max-w-xs mob470:max-w-sm mob560:max-w-md md:max-w-lg lg:max-w-none rounded-md h-48 mob470:h-56 mob560:h-64 md:h-72 lg:h-80 object-cover"
          />
        </div>

        {/* Dish Information Section */}
        <div className="w-full lg:w-4/12 px-0 mob470:px-1 mob560:px-2 md:px-4 space-y-3 mob470:space-y-3 mob560:space-y-4">
          <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
            {getCategory().charAt(0).toUpperCase() + getCategory().slice(1)}
          </h1>

          <h2 className="flex flex-col sm:flex-row text-xl mob470:text-2xl mob560:text-2xl md:text-3xl py-1 gap-1 mob470:gap-2 mob560:gap-2">
            <span className="break-words">{dish.name}</span>
            <span className="flex items-center text-base mob470:text-lg mob560:text-lg md:text-xl">
              (
              <img
                src="/icons/star.svg"
                alt="star"
                className="w-3 mob470:w-4 mob560:w-4 text-center mr-1"
              />
              {dish.rating})
            </span>
          </h2>

          <p className="py-1 mob470:py-2 mob560:py-2">
            <span className="line-through text-lg mob470:text-xl mob560:text-xl md:text-2xl">
              EGP{dish.unitPrice}
            </span>
            <span className="text-btnsGreen text-xl mob470:text-2xl mob560:text-2xl md:text-3xl px-1 font-semibold">
              EGP{dish.newPrice}
            </span>
          </p>

          <div className="space-y-2 mob470:space-y-3 mob560:space-y-3">
            <h3 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl pt-2 mob470:pt-3 mob560:pt-4">
              Vendor
            </h3>

            <p className="flex items-center pt-1 underline text-btnsGreen text-sm mob470:text-base mob560:text-base md:text-lg">
              <img
                src="/icons/person.svg"
                alt="person"
                className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
              />
              {dish.vName}
            </p>

            <p className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
              <img
                src="/icons/clock.svg"
                alt="clock"
                className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
              />
              {dish.opened ? "Open" : "Closed"}
            </p>

            <p className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
              <img
                src="/icons/send.svg"
                alt="location"
                className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
              />
              It is 10 km away from you
            </p>
          </div>
        </div>

        {/* Shopping Cart Section */}
        <div className="w-full lg:w-3/12 p-3 mob470:p-4 mob560:p-4 md:p-6 border-2 border-lightBrownYellow rounded-lg mx-0 md:mx-5 space-y-3 mob470:space-y-4 mob560:space-y-4">
          <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
            Available:
          </h1>
          <span className="text-base mob470:text-lg mob560:text-lg md:text-xl font-nunito">
            {dish.quantity} Pieces
          </span>

          <div className="flex items-center justify-around my-3 mob470:my-4 mob560:my-4">
            <button className="border-2 border-btnsGreen rounded-md p-2 mob470:p-3 mob560:p-3 md:py-5 md:px-2 hover:bg-btnsGreen hover:text-white transition-colors">
              <img
                src="/icons/minus.svg"
                alt="discard item"
                className="w-3 h-3 mob470:w-4 mob470:h-4 mob560:w-4 mob560:h-4 md:w-5 md:h-5"
              />
            </button>
            <span className="text-lg mob470:text-xl mob560:text-xl md:text-2xl font-nunitoBold">
              2
            </span>
            <button className="border-2 border-btnsGreen bg-btnsGreen rounded-md p-2 mob470:p-3 mob560:p-3 md:p-2 hover:bg-green-600 transition-colors">
              <img
                src="/icons/add.svg"
                alt="add item"
                className="w-3 h-3 mob470:w-4 mob470:h-4 mob560:w-4 mob560:h-4 md:w-5 md:h-5"
              />
            </button>
          </div>

          <p className="font-nunito text-lg mob470:text-xl mob560:text-xl md:text-2xl border border-nescafe py-2 md:py-1 rounded-md px-2 md:px-1">
            Total: <span>EGP {dish.newPrice * 2}</span>
          </p>

          <BtnGreen className="w-full text-sm mob470:text-base mob560:text-base md:text-lg py-2 mob470:py-3 mob560:py-3 md:py-2">
            Add to Cart
          </BtnGreen>
        </div>
      </div>

      {/* Description Section */}
      <div className="py-4 mob470:py-5 mob560:py-5 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8">
        <h4 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
          Description
        </h4>
        <p className="py-2 md:py-1 text-base mob470:text-lg mob560:text-lg md:text-xl leading-relaxed">
          {dish.description ||
            `${dish.name} is a delicious and high-quality dish prepared with fresh ingredients. This item is part of our charity program to reduce food waste while providing you with excellent meals at discounted prices.`}
        </p>
      </div>
    </>
  );
}

DishInfo.propTypes = {
  dishId: PropTypes.string.isRequired,
};

export default DishInfo;
