import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../../redux/FoodSlice";
import { setCurrentPage, fetchAllFoods } from "../../redux/FoodFilterSlice";

const FoodResults = ({ onClear }) => {
  const dispatch = useDispatch();
  const {
    allFoods,
    totalCount,
    currentPage,
    pageSize,
    loading,
    error,
    searchTerm,
    sortBy,
    categoryId,
    maxPriceFilter,
  } = useSelector((state) => state.foodFilter);

  const { categories } = useSelector((state) => state.categories);

  const totalPages = Math.ceil(totalCount / pageSize);

  // Get category name by ID
  const getCategoryName = () => {
    if (!categoryId) return "Food Results";
    const category = categories.find(
      (cat) => cat.id.toString() === categoryId.toString()
    );
    return category ? category.name : "Food Results";
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    dispatch(
      fetchAllFoods({
        search: searchTerm,
        sort: sortBy,
        categoryId: categoryId,
        maxPrice: maxPriceFilter,
        pageIndex: page,
        pageSize: 9,
      })
    );
  };

  const handleToggleFav = (id, isCurrentlyFavorited) => {
    dispatch(toggleFavorite({ foodId: id, isCurrentlyFavorited }));
  };

  if (error) {
    return (
      <div className="w-11/12 md:w-10/12 mx-auto bg-semiDarkBeige my-5 p-4 md:p-8 text-center rounded-lg">
        <p className="text-red-600 font-nunitoBold text-base md:text-lg">
          Error: {error}
        </p>
        <button
          onClick={onClear}
          className="mt-4 bg-btnsGreen text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors">
          Clear Search
        </button>
      </div>
    );
  }

  return (
    <section className="w-11/12 md:w-10/12 lg:w-[80%] mx-auto bg-semiDarkBeige my-5 flex flex-col py-4 relative rounded-lg font-nunitoBold">
      <div className="absolute -top-5 left-1 right-1 flex flex-col sm:flex-row justify-between mx-4 gap-2">
        <span className="bg-white p-1 rounded-md text-base md:text-lg font-semibold text-center sm:text-left">
          {getCategoryName()} ({totalCount} items)
        </span>
        <button
          onClick={onClear}
          className="bg-white p-1 rounded-md text-base md:text-lg text-lightBrownYellow underline hover:text-btnsGreen">
          Clear Search
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 justify-items-center w-full lg:w-[80%] mx-auto">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="w-full max-w-xs border border-stone-700 rounded-xl relative">
              <Skeleton
                sx={{ bgcolor: "grey.900", borderRadius: "12px 12px 0 0" }}
                variant="rectangular"
                width="100%"
                height={128}
              />
              <div className="p-2">
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </div>
            </div>
          ))}
        </div>
      ) : allFoods.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 font-nunitoBold text-lg">
            No food found matching your criteria
          </p>
          <button
            onClick={onClear}
            className="mt-4 bg-btnsGreen text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors">
            Clear Search
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full lg:w-[85%] mx-auto">
            {allFoods.map((food) => (
              <div
                className="w-full max-w-xs border border-stone-700 rounded-xl relative mx-auto"
                key={food.id}>
                <div className="flex absolute justify-between m-3 left-0 right-0 overflow-hidden">
                  <span className="bg-semiDarkBeige px-2 py-1 rounded-md">
                    {food.quantity ||
                      food.availableQuantity ||
                      food.stockQuantity ||
                      0}
                    + left
                  </span>
                  <span className="flex items-center bg-semiDarkBeige px-2 py-1 rounded-md">
                    <img
                      src="/icons/star.svg"
                      alt="star"
                      className="w-3 text-center mr-1"
                    />
                    {food.rating || food.averageRating || food.rate || 0}
                  </span>
                </div>

                <img
                  src={
                    food.picUrl ||
                    food.imageUrl ||
                    food.photoUrl ||
                    food.image ||
                    "/public/services/foodlistingtest.png"
                  }
                  alt={food.name || food.title || "Food item"}
                  className="w-full rounded-se-xl rounded-ss-xl h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "/public/services/foodlistingtest.png";
                  }}
                />

                <div className="p-2 relative">
                  <div className="flex justify-between">
                    <span className="shadow-xl rounded-full bg-semiDarkBeige p-3 absolute -left-4 -top-10">
                      <FavoriteOutlinedIcon
                        className={`cursor-pointer ${
                          food.isFav ? "text-btnsGreen" : "text-paleBarkYellow"
                        }`}
                        onClick={() => handleToggleFav(food.id, food.isFav)}
                      />
                    </span>
                    {food.discountPercentage && (
                      <span className="bg-semiBrightYellow py-3 px-1.5 rounded-full text-xl font-bold absolute right-2 -top-16">
                        %{food.discountPercentage}
                      </span>
                    )}
                  </div>

                  <h1 className="text-xl font-medium">
                    {food.name || food.title}
                  </h1>
                  <span>
                    {food.vName ||
                      food.vendorName ||
                      food.restaurantName ||
                      food.vendor ||
                      "Unknown Vendor"}
                  </span>
                  <span>({food.isOpen ? "opened" : "closed"})</span>

                  <div className="flex justify-between py-2">
                    <span className="text-lg">Price</span>
                    <div className="">
                      <span className="text-sm px-1 line-through">
                        EGP{food.unitPrice || food.originalPrice || food.price}
                      </span>
                      <span className="text-btnsGreen font-semibold text-lg">
                        EGP{food.newPrice || food.discountedPrice || food.price}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/CharityPage/cart/${food.id}`}
                    className="text-center w-full p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold inline-block hover:bg-btnsGreen hover:text-white transition-colors duration-300">
                    More Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center mt-4 md:mt-6 gap-1 md:gap-2 px-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 sm:px-3 py-1.5 sm:py-2 border border-lightGrey rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs sm:text-sm md:text-base">
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                // Show only current page, first page, last page, and pages around current
                const shouldShow =
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1);

                if (!shouldShow) {
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span
                        key={page}
                        className="px-1 sm:px-2 py-1.5 sm:py-2 text-xs sm:text-sm">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm md:text-base ${
                      currentPage === page
                        ? "bg-btnsGreen text-white border-btnsGreen"
                        : "border-lightGrey hover:bg-gray-50"
                    }`}>
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 sm:px-3 py-1.5 sm:py-2 border border-lightGrey rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs sm:text-sm md:text-base">
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

FoodResults.propTypes = {
  onClear: PropTypes.func.isRequired,
};

export default FoodResults;
