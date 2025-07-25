import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { toggleFav } from "../../../redux/FoodSlice";

export default function SimilarItems() {
  const dispatch = useDispatch();
  const { similarItems, isLoading, error } = useSelector(
    (state) => state.foodListing
  );
  const { isFav } = useSelector((state) => state.servicesFood);

  // If loading, show skeleton
  if (isLoading) {
    return (
      <div className="py-4 mob470:py-5 mob560:py-5 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8">
        <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl mb-4">
          You might also like
        </h1>
        <div className="flex flex-wrap justify-center">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="m-2 mob470:m-3 w-full mob470:w-[48%] mob560:w-[47%] md:w-[31%] lg:w-[23%] xl:w-[23%] 1500:w-[31%] border border-stone-700 rounded-xl relative animate-pulse">
              <div className="h-32 mob470:h-36 mob560:h-40 md:h-48 bg-gray-300 rounded-t-xl"></div>
              <div className="p-2 mob470:p-3">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If error or no similar items, don't show the section
  if (error || !similarItems || similarItems.length === 0) {
    return null;
  }

  return (
    <div className="py-4 mob470:py-5 mob560:py-5 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8">
      <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl mb-4">
        You might also like
      </h1>
      <div className="flex flex-wrap justify-center">
        {similarItems.map((food) => (
          <div
            className="m-2 mob470:m-3 w-full mob470:w-[48%] mob560:w-[47%] md:w-[31%] lg:w-[23%] xl:w-[23%] 1500:w-[31%] border border-stone-700 rounded-xl relative"
            key={food.id}>
            <div className="flex absolute justify-between m-2 mob470:m-3 left-0 right-0">
              <span className="bg-semiDarkBeige px-1 mob470:px-2 py-1 rounded-md text-xs mob470:text-sm">
                {food.quantity}+ left
              </span>
              <span className="flex items-center bg-semiDarkBeige px-1 mob470:px-2 py-1 rounded-md text-xs mob470:text-sm">
                <img
                  src="/icons/star.svg"
                  alt="star"
                  className="w-2 mob470:w-3 text-center mr-1"
                />
                {food.rating}
              </span>
            </div>
            <img
              src={food.picUrl}
              alt={food.name}
              className="w-full rounded-se-xl rounded-ss-xl h-32 mob470:h-36 mob560:h-40 md:h-48 object-cover"
            />
            <div className="p-2 mob470:p-3 relative">
              <div className="flex justify-between">
                <span className="shadow-xl rounded-full bg-semiDarkBeige p-2 mob470:p-3 absolute -left-3 mob470:-left-4 -top-8 mob470:-top-10">
                  <FavoriteOutlinedIcon
                    className={`cursor-pointer text-lg mob470:text-xl ${
                      food.isFavourite
                        ? "text-btnsGreen"
                        : "text-paleBarkYellow"
                    }`}
                    onClick={() => {
                      dispatch(toggleFav({ id: food.id }));
                    }}
                  />
                </span>
                <span className="bg-semiBrightYellow py-2 mob470:py-3 px-1 mob470:px-1.5 rounded-full text-sm mob470:text-base mob560:text-lg md:text-xl font-bold absolute right-2 -top-12 mob470:-top-16">
                  %{food.discountPercentage}
                </span>
              </div>
              <h1 className="text-sm mob470:text-base mob560:text-lg md:text-xl font-medium">
                {food.name}
              </h1>
              <span className="text-xs mob470:text-sm">{food.vName}</span>{" "}
              <span className="text-xs mob470:text-sm">(opened)</span>
              <div className="flex justify-between py-1 mob470:py-2">
                <span className="text-sm mob470:text-base mob560:text-lg">
                  Price
                </span>
                <div className="">
                  <span className="text-xs mob470:text-sm px-1 line-through">
                    EGP{food.unitPrice}
                  </span>
                  <span className="text-btnsGreen font-semibold text-sm mob470:text-base mob560:text-lg">
                    EGP{food.newPrice}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/CharityPage/vendor/${food.vendorId}`}
                  className="flex-1 text-center p-1.5 mob470:p-2 border-2 border-lightBrownYellow rounded-xl text-lightBrownYellow font-semibold inline-block text-sm mob470:text-base hover:bg-lightBrownYellow hover:text-white transition-colors">
                  View Vendor
                </Link>
                <Link
                  to={`/CharityPage/cart/${food.id}`}
                  className="flex-1 text-center p-1.5 mob470:p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold inline-block text-sm mob470:text-base hover:bg-btnsGreen hover:text-white transition-colors">
                  Add to Cart
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
