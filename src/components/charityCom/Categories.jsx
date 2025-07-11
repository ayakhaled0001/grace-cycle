import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FavoriteOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRecommendedItems,
  loadSelectedCategoryFromStorage,
} from "../../redux/FoodSlice";
import { Skeleton } from "@mui/material";

// Skeleton component for loading state
const RecommendedSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full lg:w-[85%] mx-auto">
    {Array.from({ length: 3 }).map((_, idx) => (
      <div
        className="w-full max-w-xs border border-stone-700 rounded-xl relative bg-white"
        key={idx}
      >
        {/* صورة */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={192}
          sx={{ borderRadius: "12px 12px 0 0" }}
        />
        <div className="p-2 relative">
          {/* Favorite دائرة */}
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={{ position: "absolute", left: -16, top: -32 }}
          />
          {/* discount */}
          <Skeleton
            variant="rectangular"
            width={80}
            height={32}
            sx={{
              position: "absolute",
              right: 8,
              top: -48,
              borderRadius: "16px",
            }}
          />
          {/* خطوط */}
          <div className="mt-8">
            <Skeleton width="60%" height={32} />
            <Skeleton width="40%" height={24} />
            <Skeleton width="80%" height={24} />
            {/* زر */}
            <Skeleton
              width="100%"
              height={36}
              sx={{ mt: 2, borderRadius: "12px" }}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// this section will be linked to another pages ---------------------------

const data = [
  { label: "Main Dishes", img: "services/maindishes.png", path: "" },
  { label: "Baked Goods", img: "services/bakedgoods.png", path: "" },
  { label: "Healthy", img: "services/healthy.png", path: "" },
  { label: "Dessert", img: "services/desserts.png", path: "" },
  { label: "Drinks", img: "services/drinks.png", path: "" },
  { label: "Magic Bags", img: "services/magicbags.png", path: "" },
  { label: "Restaurants", img: "services/restaurants.png", path: "" },
  { label: "Supermarkets", img: "services/supermarketspng.png", path: "" },
];

function Categories() {
  const dispatch = useDispatch();
  const { recommendedItems, recommendedLoading, selectedCategory, cart } =
    useSelector((state) => state.servicesFood);

  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(recommendedItems.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  // Load selected category from localStorage on component mount
  useEffect(() => {
    dispatch(loadSelectedCategoryFromStorage());

    // If no category is loaded and no recommended items, load random items
    setTimeout(() => {
      if (!selectedCategory && recommendedItems.length === 0) {
        console.log(
          "No category loaded, fetching random items for initial display"
        );
        dispatch(fetchRecommendedItems("random"));
      }
    }, 100);
  }, [dispatch, selectedCategory, recommendedItems.length]);

  // Fetch recommended items when category changes or when cart is empty
  useEffect(() => {
    if (selectedCategory) {
      console.log("Category changed to:", selectedCategory);
      console.log("Dispatching fetchRecommendedItems...");
      dispatch(fetchRecommendedItems(selectedCategory));
    } else if (recommendedItems.length === 0 || (cart && cart.length === 0)) {
      // If no category selected and no recommended items, or cart is empty, show random items
      console.log(
        "No category selected or cart is empty, showing random items"
      );
      dispatch(fetchRecommendedItems("random"));
    }
  }, [selectedCategory, dispatch, recommendedItems.length, cart]);

  // Log loading state changes
  useEffect(() => {
    console.log("Recommended loading state:", recommendedLoading);
    console.log("Recommended items count:", recommendedItems.length);
  }, [recommendedLoading, recommendedItems.length]);

  return (
    <div className="my-8 md:my-14 w-[95%] md:w-[90%] rounded-xl py-2 mx-auto bg-[#EEEADF] px-4 md:px-8">
      <div>
        <h1 className="text-lg md:text-xl font-bold my-3 md:my-5 font-nunitoBold text-center md:text-left">
          All Categories{" "}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-5 justify-items-center my-3 md:my-5">
          {data.map((cat) => (
            <div key={cat.label} className="flex flex-col items-center">
              <img
                src={cat.img}
                alt={cat.label}
                className="w-20 md:w-24 lg:w-32"
              />
              <span className="font-medium my-1 md:my-2 font-nunitoBold text-sm md:text-base text-center">
                {cat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-offWhite w-full rounded-md px-2">
          <div className="py-4 mob470:py-5 mob560:py-5 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8">
            <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl mb-2">
              Recommended For You
            </h1>
            {(selectedCategory?.toLowerCase() === "magic bags" ||
              selectedCategory?.toLowerCase() === "random") && (
              <p className="text-gray-600 text-sm md:text-base mb-4">
                Explore a variety of items from different categories
              </p>
            )}

            <div className="relative">
              {console.log(
                "Rendering recommended section - loading:",
                recommendedLoading,
                "items count:",
                recommendedItems.length
              )}
              {recommendedLoading ? (
                <RecommendedSkeleton />
              ) : recommendedItems.length > 0 ? (
                <>
                  <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 -ml-4"
                    onClick={prevSlide}
                  >
                    <svg
                      className="w-6 h-6 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      ></path>
                    </svg>
                  </button>

                  <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 -mr-4"
                    onClick={nextSlide}
                  >
                    <svg
                      className="w-6 h-6 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>

                  <div className="overflow-hidden">
                    <div
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                      }}
                    >
                      {recommendedItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex-shrink-0 w-full mob470:w-1/2 mob560:w-1/2 md:w-1/3 lg:w-1/4 px-2"
                        >
                          <div className="border border-stone-700 rounded-xl relative bg-white">
                            <div className="flex absolute justify-between m-2 mob470:m-3 left-0 right-0 z-10">
                              <span className="bg-semiDarkBeige px-1 mob470:px-2 py-1 rounded-md text-xs mob470:text-sm">
                                {item.quantity || 0}+ left
                              </span>
                              <span className="flex items-center bg-semiDarkBeige px-1 mob470:px-2 py-1 rounded-md text-xs mob470:text-sm">
                                <img
                                  src="/icons/star.svg"
                                  alt="star"
                                  className="w-2 mob470:w-3 text-center mr-1"
                                />
                                {item.rating || 0}
                              </span>
                            </div>

                            <img
                              src={item.picUrl}
                              alt={item.name}
                              className="w-full rounded-se-xl rounded-ss-xl h-32 mob470:h-36 mob560:h-40 md:h-48 object-cover"
                            />

                            <div className="p-2 mob470:p-3 relative">
                              <div className="flex justify-between">
                                <span className="shadow-xl rounded-full bg-semiDarkBeige p-2 mob470:p-3 absolute -left-3 mob470:-left-4 -top-8 mob470:-top-10">
                                  <FavoriteOutlined className="cursor-pointer text-lg mob470:text-xl text-paleBarkYellow" />
                                </span>
                                <span className="bg-semiBrightYellow py-2 mob470:py-3 px-1 mob470:px-1.5 rounded-full text-sm mob470:text-base mob560:text-lg md:text-xl font-bold absolute right-2 -top-12 mob470:-top-16">
                                  %{item.discountPercentage || 0}
                                </span>
                              </div>

                              <h1 className="text-sm mob470:text-base mob560:text-lg md:text-xl font-medium mt-2">
                                {item.name}
                              </h1>
                              <span className="text-xs mob470:text-sm">
                                {item.vName}
                              </span>
                              <span className="text-xs mob470:text-sm">
                                (opened)
                              </span>

                              <div className="flex justify-between py-1 mob470:py-2">
                                <span className="text-sm mob470:text-base mob560:text-lg">
                                  Price
                                </span>
                                <div>
                                  <span className="text-xs mob470:text-sm px-1 line-through">
                                    EGP{item.unitPrice}
                                  </span>
                                  <span className="text-btnsGreen font-semibold text-sm mob470:text-base mob560:text-lg">
                                    EGP{item.newPrice}
                                  </span>
                                </div>
                              </div>

                              <Link
                                to={`/CharityPage/cart/${item.id}`}
                                className="text-center w-full p-1.5 mob470:p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold inline-block text-sm mob470:text-base hover:bg-btnsGreen hover:text-white transition-colors"
                                onClick={() => {
                                  console.log(
                                    "Navigating to item details:",
                                    item.id,
                                    item.name
                                  );
                                }}
                              >
                                More Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center mt-4 space-x-2">
                    {Array.from({ length: totalSlides }, (_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "bg-btnsGreen w-6"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        onClick={() => goToSlide(index)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center py-8">
                  <div className="text-lg text-gray-500">
                    {selectedCategory
                      ? `No recommendations available for ${selectedCategory}`
                      : "Add items to your cart to see recommendations"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
