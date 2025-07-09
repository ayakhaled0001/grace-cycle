import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBags } from "../../redux/BagsSlice";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

export default function MagicBags() {
  const dispatch = useDispatch();
  const { bags, isLoading, error } = useSelector((state) => state.bags);

  useEffect(() => {
    dispatch(getBags());
  }, [dispatch]);

  if (isLoading)
    return (
      <section className="w-11/12 md:w-10/12 mx-auto bg-offWhite my-8 flex flex-wrap justify-center py-4 relative rounded-lg font-nunitoBold">
        <div className="absolute -top-5 left-1 right-1 flex flex-col sm:flex-row justify-between mx-4 gap-2">
          <span className="bg-white p-1 rounded-md text-base md:text-lg font-semibold text-center sm:text-left">
            Magic Bags
          </span>
          <span className="bg-white p-1 rounded-md text-base md:text-lg text-lightBrownYellow underline text-center sm:text-right">
            <a href="#">Shop More</a>
          </span>
        </div>
        <div className="flex flex-col gap-4 w-full mx-auto mt-10 font-nunitoBold">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-center rounded-xl p-4 w-full min-h-44 bg-semiDarkBeige box-border gap-4">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={160}
                className="rounded-xl sm:w-[40%] flex-shrink-0"
              />
              <div className="flex flex-col p-4 w-full sm:w-[60%]">
                <Skeleton width="60%" height={32} />
                <Skeleton width="40%" height={24} />
                <Skeleton width="80%" height={24} />
                <Skeleton width="100%" height={36} />
              </div>
              <div className="flex flex-col justify-center items-center w-full sm:w-[50%]">
                <Skeleton width={80} height={32} />
                <Skeleton width={100} height={32} />
                <Skeleton width={120} height={36} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="w-11/12 md:w-10/12 mx-auto bg-offWhite my-8 flex flex-wrap justify-center py-4 relative rounded-lg font-nunitoBold">
      <div className="absolute -top-5 left-1 right-1 flex flex-col sm:flex-row justify-between mx-4 gap-2">
        <span className="bg-white p-1 rounded-md text-base md:text-lg font-semibold text-center sm:text-left">
          Magic Bags
        </span>
        <span className="bg-white p-1 rounded-md text-base md:text-lg text-lightBrownYellow underline text-center sm:text-right">
          <a href="#">Shop More</a>
        </span>
      </div>
      <div className="flex flex-col gap-4 w-full mx-auto mt-10 font-nunitoBold">
        {bags.map((bag, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center rounded-xl p-4 w-full min-h-44 bg-semiDarkBeige box-border gap-4">
            <div className="flex flex-col sm:flex-row w-full h-full bg-cover bg-center gap-4">
              <div className="relative w-full sm:w-[40%] h-48 rounded-xl flex-shrink-0">
                <img
                  src={bag.picUrl}
                  alt=""
                  className="w-full h-full rounded-xl object-cover"
                />
                <span className="absolute text-semiDarkBeige text-sm px-4 rounded-md top-2 left-2 bg-lightGreen">
                  {bag.quantity}+ bag left
                </span>
              </div>
              <div className="flex flex-col p-4 w-full sm:w-[60%]">
                <h3 className="text-lg">
                  {bag.name}(
                  <StarIcon style={{ width: "16px", color: "#BC870B" }} />
                  {bag.rating})
                </h3>
                <div className="flex justify-start items-center py-0">
                  <p className="text-xs mob470:text-sm">{bag.vName}</p>
                  <p
                    className={`text-xs mob470:text-sm ${
                      bag.opened ? "text-[#008000]" : "text-red-500"
                    } font-semibold`}>
                    {" "}
                    {bag.opened ? " (opened)" : " (closed)"}
                  </p>
                </div>
                <div className="flex flex-col p-3 mob470:p-4 w-full md:w-[60%] mt-3 md:mt-0">
                  <h3 className="text-sm mob470:text-base mob560:text-lg">
                    {bag.name}(
                    <StarIcon style={{ width: "16px", color: "#BC870B" }} />
                    {bag.rating})
                  </h3>
                  <div className="flex justify-start items-center py-0">
                    <p className="text-xs mob470:text-sm">{bag.vName}</p>
                    <p
                      className={`text-xs mob470:text-sm ${
                        bag.opened ? "text-[#008000]" : "text-red-500"
                      } font-semibold`}>
                      {" "}
                      {bag.opened ? " (opened)" : " (closed)"}
                    </p>
                  </div>
                  <div className="text-xs mob470:text-sm text-darkgray mt-2">
                    {bag.foods.join(", ")}
                  </div>
                </div>
              </div>
              <div className="flex w-full md:w-[50%] justify-center md:justify-end mt-3 md:mt-0">
                <div className="flex flex-col justify-center items-center w-full md:w-[50%]">
                  <span className="bg-[#F8BD00] px-4 mob470:px-6 rounded-lg text-xs mob470:text-sm">
                    {bag.discount}% OFF
                  </span>
                  <div className="flex justify-center items-center my-2">
                    <span className="text-xs mob470:text-sm px-1 line-through">
                      EGP{bag.price}
                    </span>
                    <span className="text-btnsGreen font-semibold text-sm mob470:text-base mob560:text-lg">
                      EGP{bag.newPrice}
                    </span>
                  </div>
                </div>
                {/* <div className="flex flex-col justify-center items-center w-full sm:w-auto">
                  <Link
                    to={`/CharityPage/magicbags/${bag.id}`}
                    className="text-center w-full p-1.5 mob470:p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold inline-block text-sm mob470:text-base">
                    Add to Cart
                  </Link>
                </div> */}
              </div>
            </div>
            <div className="flex w-full sm:w-[50%] h-full justify-center sm:justify-end">
              <div className="flex flex-col justify-center items-center w-full sm:w-[50%]">
                <span className="bg-[#F8BD00] px-6 rounded-lg">
                  {bag.discount}% OFF
                </span>
                <div className="flex justify-center items-center my-2">
                  <span className="text-sm px-1 line-through">
                    EGP{bag.price}
                  </span>
                  <span className="text-btnsGreen font-semibold text-lg">
                    EGP{bag.newPrice}
                  </span>
                </div>
                <Link
                  to={`/CharityPage/cart/${bag.id}`}
                  className="text-center w-full p-1.5 mob470:p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold inline-block text-sm mob470:text-base hover:bg-btnsGreen hover:text-white transition-colors duration-300">
                  More Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
