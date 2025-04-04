import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBags } from "../../redux/BagsSlice";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { color } from "framer-motion";

export default function MagicBags() {
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();
  const { bags, isLoading, error } = useSelector((state) => state.bags);

  useEffect(() => {
    dispatch(getBags());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
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
            className="flex items-center hover:border-4 cursor-pointer hover:border-btnsGreen transition-bg duration-200 rounded-xl p-4 w-[100%] h-44 bg-semiDarkBeige box-border"
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
                    onClick={(e) => setIsFav(!isFav)}
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
                  <button className="text-center w-full p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold">
                    Add to Cart
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
