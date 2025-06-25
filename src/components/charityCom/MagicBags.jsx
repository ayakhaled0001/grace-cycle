import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBags } from "../../redux/BagsSlice";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

export default function MagicBags() {
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();
  const { bags, isLoading, error } = useSelector((state) => state.bags);

  useEffect(() => {
    dispatch(getBags());
  }, [dispatch]);

  if (isLoading)
    return (
      <section className="w-10/12 mx-auto bg-offWhite my-8 flex flex-wrap justify-center py-4 relative rounded-lg font-nunitoBold">
        <div className="absolute -top-5 left-1 right-1 flex justify-between mx-4">
          <span className="bg-white p-1 rounded-md text-lg  font-semibold">
            Magin Bags
          </span>
          <span className="bg-white p-1 rounded-md text-lg text-lightBrownYellow underline ">
            <a href="#">Shop More</a>
          </span>
        </div>
        <div className="flex flex-col gap-4 w-full mx-auto mt-10 font-nunitoBold ">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center rounded-xl p-4 w-[100%] h-44 bg-semiDarkBeige box-border"
            >
              <Skeleton
                variant="rectangular"
                width="40%"
                height={160}
                className="rounded-xl"
              />
              <div className="flex flex-col p-4 w-[60%]">
                <Skeleton width="60%" height={32} />
                <Skeleton width="40%" height={24} />
                <Skeleton width="80%" height={24} />
                <Skeleton width="100%" height={36} />
              </div>
              <div className="flex flex-col justify-center items-center w-[50%]">
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
    <section className="w-10/12 mx-auto bg-offWhite my-8 flex flex-wrap justify-center py-4 relative rounded-lg font-nunitoBold">
      <div className="absolute -top-5 left-1 right-1 flex justify-between mx-4">
        <span className="bg-white p-1 rounded-md text-lg  font-semibold">
          Magin Bags
        </span>
        <span className="bg-white p-1 rounded-md text-lg text-lightBrownYellow underline ">
          {/* will be a Link to a route */}
          <a href="#">Shop More</a>
        </span>
      </div>
      <div className="flex flex-col gap-4 w-full mx-auto mt-10 font-nunitoBold ">
        {bags.map((bag, index) => (
          <div
            key={index}
            className="flex items-center rounded-xl p-4 w-[100%] h-44 bg-semiDarkBeige box-border"
          >
            <div className="flex w-[50%] h-[100%] bg-cover bg-center">
              <div className="relative w-[40%] h-[100%] rounded-xl">
                <img
                  src={bag.picUrl}
                  alt=""
                  className=" w-full h-full rounded-xl"
                />
                <span className="absolute text-semiDarkBeige text-sm px-4 rounded-md top-2 left-2 bg-lightGreen ">
                  {bag.quantity}+ bag left
                </span>
                <span className="absolute shadow-xl rounded-full bg-semiDarkBeige  p-2 -left-2 -bottom-2">
                  <FavoriteOutlinedIcon
                    className={` cursor-pointer
                ${isFav ? "text-btnsGreen" : "text-paleBarkYellow"}`}
                    onClick={() => setIsFav(!isFav)}
                  />
                </span>
              </div>
              <div className="flex flex-col p-4 w-[60%]">
                <h3 className="text-lg">
                  {bag.name}(
                  <StarIcon style={{ width: "20px", color: "#BC870B" }} />
                  {bag.rating})
                </h3>
                <div className="flex justify-start items-center py-0">
                  <p>{bag.vName}</p>
                  <p
                    className={`${
                      bag.opened ? "text-[#008000]" : "text-red-500"
                    } font-semibold`}
                  >
                    {" "}
                    {bag.opened ? " (opened)" : " (closed)"}
                  </p>
                </div>
                <div className="text-sm text-darkgray mt-2">
                  {bag.foods.join(", ")}
                </div>
              </div>
            </div>
            <div className="flex w-[50%] h-[100%] justify-end">
              <div className="flex flex-col justify-center items-center w-[50%]">
                <span className="bg-[#F8BD00] px-6 rounded-lg">
                  {bag.discount}% OFF
                </span>
                <div className="flex justify-center items-center my-2">
                  <span className="text-sm px-1 line-through ">
                    EGP{bag.price}
                  </span>
                  <span className="text-btnsGreen font-semibold text-lg ">
                    EGP{bag.newPrice}
                  </span>
                </div>
                <Link
                  to={`/CharityPage/cart/${bag.id}`}
                  className="text-center w-full p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold inline-block"
                >
                  Add to Cart
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
