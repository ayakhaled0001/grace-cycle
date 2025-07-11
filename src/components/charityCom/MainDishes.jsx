import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainDishes, toggleFavorite } from "../../redux/FoodSlice";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

function MainDishes() {
  const dispatch = useDispatch();
  const { mainDishes, loading } = useSelector((state) => state.servicesFood);

  // Determine width based on user type
  const userType =
    typeof window !== "undefined" ? localStorage.getItem("userType") : null;
  const sectionWidth = userType === "Charity" ? "w-11/12 md:w-10/12" : "w-full";

  useEffect(() => {
    dispatch(fetchMainDishes());
  }, [dispatch]);

  console.log("loading state :", loading);

  return (
    <section
      className={`${sectionWidth} mx-auto bg-semiDarkBeige my-5 flex flex-wrap justify-center py-4 relative rounded-lg font-nunitoBold`}
    >
      <div className="absolute -top-5 left-1 right-1 flex flex-col sm:flex-row justify-between mx-4 gap-2">
        <span className="bg-white p-1 rounded-md text-base md:text-lg font-semibold text-center sm:text-left">
          Main dishes
        </span>
        <span className="bg-white p-1 rounded-md text-base md:text-lg text-lightBrownYellow underline text-center sm:text-right">
          {/* will be a Link to a route */}
          <a href="#">Shop More</a>
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full lg:w-[85%] mx-auto">
        {loading || mainDishes.length === 0
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div
                className="w-full max-w-xs border border-stone-700 rounded-xl relative"
                key={idx}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={192}
                  sx={{ borderRadius: "12px 12px 0 0" }}
                />
                <div className="p-2 relative">
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    sx={{ position: "absolute", left: -16, top: -32 }}
                  />
                  <Skeleton width="60%" height={32} />
                  <Skeleton width="40%" height={24} />
                  <Skeleton width="80%" height={24} />
                  <Skeleton width="100%" height={36} />
                </div>
              </div>
            ))
          : mainDishes.map((food) => (
              <div
                className="w-full max-w-xs border border-stone-700 rounded-xl relative"
                key={food.id}
              >
                <div className="flex absolute justify-between m-3 left-0 right-0 overflow-hidden">
                  <span className=" bg-semiDarkBeige px-2 py-1 rounded-md">
                    {food.quantity}+ left
                  </span>
                  <span className="flex items-center bg-semiDarkBeige px-2 py-1 rounded-md">
                    <img
                      src="icons/star.svg"
                      alt="star"
                      className="w-3 text-center mr-1 "
                    />
                    {food.rating}
                  </span>
                </div>
                {loading || mainDishes.length === 0 ? (
                  <Skeleton
                    sx={{ bgcolor: "grey.900", borderRadius: "12px 12px 0 0" }}
                    variant="rectangular"
                    width="100%"
                    height={128}
                  />
                ) : (
                  <img
                    src={food.picUrl}
                    alt=""
                    className=" w-full rounded-se-xl rounded-ss-xl h-48"
                  />
                )}

                <div className="p-2 relative">
                  <div className="flex justify-between">
                    <span className="shadow-xl rounded-full bg-semiDarkBeige  p-3 absolute -left-4 -top-10">
                      <FavoriteOutlinedIcon
                        className={` cursor-pointer
                      ${food.isFav ? "text-btnsGreen" : "text-paleBarkYellow"}`}
                        onClick={() => {
                          dispatch(
                            toggleFavorite({
                              foodId: food.id,
                              isCurrentlyFavorited: food.isFav,
                            })
                          );
                        }}
                      />
                    </span>
                    {loading ? (
                      <Skeleton variant="circular" width={40} height={40} />
                    ) : (
                      <span className="bg-semiBrightYellow py-3 px-1.5 rounded-full text-xl font-bold absolute right-2 -top-16">
                        %{food.discountPercentage}
                      </span>
                    )}
                  </div>
                  {loading ? (
                    <>
                      <Skeleton animation="wave" />
                      <Skeleton animation="wave" />
                      <Skeleton animation="wave" />
                    </>
                  ) : (
                    <>
                      <h1 className="text-xl font-medium ">{food.name}</h1>
                      <span>{food.vName}</span> <span>(opened)</span>
                      <div className="flex justify-between py-2">
                        <span className="text-lg">Price</span>
                        <div className="">
                          <span className="text-sm px-1 line-through ">
                            EGP{food.unitPrice}
                          </span>
                          <span className="text-btnsGreen font-semibold text-lg ">
                            EGP{food.newPrice}
                          </span>
                        </div>
                      </div>
                      {loading ? (
                        <Skeleton animation="wave" />
                      ) : (
                        <Link
                          to={`/CharityPage/cart/${food.id}`}
                          className="text-center w-full p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold inline-block hover:bg-btnsGreen hover:text-white transition-colors duration-300"
                        >
                          More Details
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}

export default MainDishes;
