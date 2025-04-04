import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useEffect, useState } from "react";
function MainDishes() {
  const [isFav, setIsFav] = useState(false);
  useEffect(function () {
    async function fetchFoods() {
      const res = await fetch(
        `https://gracecycleapi.azurewebsites.net/api/web/home/foods`
      );
      const data = await res.json();
      console.log(data["Main Dishes"]);
      return data;
    }
    fetchFoods();
  }, []);
  return (
    <section>
      {data["Main Dishes"].map((food) => (
        <div
          className="w-10/12 mx-auto bg-semiDarkBeige my-5"
          key={data["Main Dishes"].id}>
          <div className="relative -top-5 flex justify-between w-12/12 mx-4">
            <span className="bg-white p-1 rounded-md font-sans text-lg  font-semibold">
              Main dishes
            </span>
            <span className="bg-white p-1 rounded-md  font-sans text-lg text-lightBrownYellow underline ">
              {/* will be a Link to a route */}
              <a href="#">Shop More</a>
            </span>
          </div>
          <div className="m-3 w-3/12 font-sans border border-stone-700 rounded-xl relative">
            <div className="flex absolute justify-between m-3 left-0 right-0 ">
              <span className=" bg-semiDarkBeige px-2 py-1 rounded-md">
                5+ left
              </span>
              <span className="flex items-center bg-semiDarkBeige px-2 py-1 rounded-md">
                <img
                  src="icons/star.svg"
                  alt="star"
                  className="w-3 text-center mr-1"
                />
                4.5
              </span>
            </div>
            <img src="services/foodlistingtest.png" alt="" className="" />
            <div className="p-2 relative">
              <div className="flex justify-between">
                {" "}
                <span className="shadow-xl rounded-full bg-semiDarkBeige  p-3 absolute -left-4 -top-10">
                  <FavoriteOutlinedIcon
                    className={` cursor-pointer
                ${isFav ? "text-btnsGreen" : "text-paleBarkYellow"}`}
                    onClick={() => setIsFav(!isFav)}
                  />
                </span>
                <span className="bg-semiBrightYellow py-3 px-1.5 rounded-full text-xl font-bold absolute right-2 -top-16">
                  15%
                </span>
              </div>
              <h1 className="font-sans text-xl font-medium ">grilled salmon</h1>
              <span>Al Shallal Restaurant</span> <span>(opened)</span>
              <div className="flex justify-between py-2">
                <span className="text-lg">Price</span>
                <div className="">
                  <span className="text-sm px-1 line-through ">EGP160 </span>
                  <span className="text-btnsGreen font-semibold text-lg ">
                    EGP136
                  </span>
                </div>
              </div>
              <button className="text-center w-full p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default MainDishes;
