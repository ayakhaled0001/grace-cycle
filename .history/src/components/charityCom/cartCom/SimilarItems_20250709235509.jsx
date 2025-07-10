import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { toggleFav } from "../../../redux/FoodSlice";
import { useState, useRef, useEffect } from "react";

export default function SimilarItems() {
  const dispatch = useDispatch();
  const { similarItems, isLoading, error } = useSelector(
    (state) => state.foodListing
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Calculate items per slide based on screen size
  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 4; // lg
      if (window.innerWidth >= 768) return 3; // md
      if (window.innerWidth >= 560) return 2; // mob560
      if (window.innerWidth >= 470) return 2; // mob470
      return 1; // mobile
    }
    return 4; // default
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  // Calculate max index
  const maxIndex = Math.max(0, similarItems?.length - itemsPerSlide || 0);

  // Update items per slide on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset current index when items change or items per slide changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [similarItems, itemsPerSlide, currentIndex, maxIndex]);

  // If loading, show skeleton
  if (isLoading) {
    return (
      <div className="py-4 mob470:py-5 mob560:py-5 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8">
        <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl mb-4">
          You might also like
        </h1>

        {/* Skeleton Slider Container */}
        <div className="relative">
          {/* Skeleton Navigation Arrows */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg -ml-4">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
          </div>

          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg -mr-4">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
          </div>

          {/* Skeleton Slider Track */}
          <div className="overflow-hidden">
            <div className="flex">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="flex-shrink-0 w-full mob470:w-1/2 mob560:w-1/2 md:w-1/3 lg:w-1/4 px-2">
                  <div className="border border-stone-700 rounded-xl relative bg-white animate-pulse">
                    {/* Skeleton Quantity and Rating Badges */}
                    <div className="flex absolute justify-between m-2 mob470:m-3 left-0 right-0 z-10">
                      <div className="bg-gray-300 px-1 mob470:px-2 py-1 rounded-md text-xs mob470:text-sm w-12 h-4"></div>
                      <div className="flex items-center bg-gray-300 px-1 mob470:px-2 py-1 rounded-md text-xs mob470:text-sm w-8 h-4">
                        <div className="w-2 mob470:w-3 h-2 mob470:h-3 bg-gray-400 rounded mr-1"></div>
                        <div className="w-4 h-2 bg-gray-400 rounded"></div>
                      </div>
                    </div>

                    {/* Skeleton Image */}
                    <div className="h-32 mob470:h-36 mob560:h-40 md:h-48 bg-gray-300 rounded-se-xl rounded-ss-xl"></div>

                    <div className="p-2 mob470:p-3 relative">
                      {/* Skeleton Favorite Icon */}
                      <div className="shadow-xl rounded-full bg-gray-300 p-2 mob470:p-3 absolute -left-3 mob470:-left-4 -top-8 mob470:-top-10 w-8 h-8"></div>

                      {/* Skeleton Discount Badge */}
                      <div className="bg-gray-300 py-2 mob470:py-3 px-1 mob470:px-1.5 rounded-full text-sm mob470:text-base mob560:text-lg md:text-xl font-bold absolute right-2 -top-12 mob470:-top-16 w-8 h-6"></div>

                      {/* Skeleton Food Name */}
                      <div className="h-4 bg-gray-300 rounded mb-2 mt-2 w-3/4"></div>

                      {/* Skeleton Vendor Name */}
                      <div className="h-3 bg-gray-300 rounded mb-1 w-1/2"></div>

                      {/* Skeleton Status */}
                      <div className="h-3 bg-gray-300 rounded mb-2 w-16"></div>

                      {/* Skeleton Price Section */}
                      <div className="flex justify-between py-1 mob470:py-2">
                        <div className="h-3 bg-gray-300 rounded w-8"></div>
                        <div className="flex gap-1">
                          <div className="h-3 bg-gray-300 rounded w-12"></div>
                          <div className="h-3 bg-gray-300 rounded w-16"></div>
                        </div>
                      </div>

                      {/* Skeleton Buttons */}
                      <div className="flex gap-2">
                        <div className="flex-1 h-8 bg-gray-300 rounded-xl"></div>
                        <div className="flex-1 h-8 bg-gray-300 rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skeleton Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className={`w-2 h-2 rounded-full bg-gray-300 ${
                  dot === 1 ? "w-6" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If error or no similar items, don't show the section
  if (error || !similarItems || similarItems.length === 0) {
    return null;
  }

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index) => {
    if (index >= 0 && index <= maxIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="py-4 mob470:py-5 mob560:py-5 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8">
      <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl mb-4">
        You might also like
      </h1>

      {/* Slider Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 -ml-4">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {currentIndex < maxIndex && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 -mr-4">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Slider Track */}
        <div className="overflow-hidden">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}>
            {similarItems.map((food) => (
              <div
                key={food.id}
                className="flex-shrink-0 w-full mob470:w-1/2 mob560:w-1/2 md:w-1/3 lg:w-1/4 px-2">
                <div className="border border-stone-700 rounded-xl relative bg-white">
                  <div className="flex absolute justify-between m-2 mob470:m-3 left-0 right-0 z-10">
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
                    <h1 className="text-sm mob470:text-base mob560:text-lg md:text-xl font-medium mt-2">
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
                    <Link
                      to={
                        food.vendorId
                          ? `/CharityPage/cart/${food.id}`
                          : `/CharityPage/vendor/${food.userId || food.id}`
                      }
                      className="text-center w-full p-1.5 mob470:p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold inline-block text-sm mob470:text-base hover:bg-btnsGreen hover:text-white transition-colors">
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {similarItems.length > itemsPerSlide && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-btnsGreen w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
