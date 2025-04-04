import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useEffect, useState } from "react";
function MainDishes() {
  const [isFav, setIsFav] = useState(false);
  const [mainDishes, setMainDishes] = useState([]);
  useEffect(function () {
    async function fetchFoods() {
      try {
        const res = await fetch(
          `https://gracecycleapi.azurewebsites.net/api/web/home/foods`
        );
        const data = await res.json();
        console.log(data["Main Dishes"]);
        setMainDishes(data["Main Dishes"]);
      } catch (error) {
        console.log("Error fetching foods ", error);
      }
    }
    fetchFoods();
  }, []);
  return (
    <section className="w-10/12 mx-auto bg-semiDarkBeige my-5 flex flex-wrap justify-center py-4 relative">
      <div className="absolute -top-5 left-1 right-1 flex justify-between mx-4 ">
        <span className="bg-white p-1 rounded-md font-sans text-lg  font-semibold">
          Main dishes
        </span>
        <span className="bg-white p-1 rounded-md  font-sans text-lg text-lightBrownYellow underline ">
          {/* will be a Link to a route */}
          <a href="#">Shop More</a>
        </span>
      </div>
      {mainDishes.map((food) => (
        <div
          className="m-3 w-3/12 font-sans border border-stone-700 rounded-xl relative "
          key={food.id}>
          <div className="flex absolute justify-between m-3 left-0 right-0 ">
            <span className=" bg-semiDarkBeige px-2 py-1 rounded-md">
              {food.quantity}+ left
            </span>
            <span className="flex items-center bg-semiDarkBeige px-2 py-1 rounded-md">
              <img
                src="icons/star.svg"
                alt="star"
                className="w-3 text-center mr-1 overflow-hidden"
              />
              {food.rating}
            </span>
          </div>
          <img src={food.picUrl} alt="" className="" />
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
                %{food.discountPercentage}
              </span>
            </div>
            <h1 className="font-sans text-xl font-medium ">{food.name}</h1>
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
            <button className="text-center w-full p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default MainDishes;
