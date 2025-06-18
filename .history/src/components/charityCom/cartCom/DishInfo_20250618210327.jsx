import BtnGreen from "../../Ui/BtnGreen";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function DishInfo({ dishId }) {
  const { mainDishes, bakedGoods, dessert, drinks } = useSelector(
    (state) => state.servicesFood
  );
  const { bags } = useSelector((state) => state.bags);

  // Find the dish from all categories
  const allDishes = [...mainDishes, ...bakedGoods, ...dessert, ...drinks];
  const dish =
    allDishes.find((d) => d.id === parseInt(dishId)) ||
    bags.find((b) => b.id === parseInt(dishId));

  if (!dish) {
    return <div>Dish not found</div>;
  }

  // Determine category for breadcrumb
  const getCategory = () => {
    if (mainDishes.find((d) => d.id === parseInt(dishId))) return "main dishes";
    if (bakedGoods.find((d) => d.id === parseInt(dishId))) return "baked goods";
    if (dessert.find((d) => d.id === parseInt(dishId))) return "desserts";
    if (drinks.find((d) => d.id === parseInt(dishId))) return "drinks";
    if (bags.find((b) => b.id === parseInt(dishId))) return "magic bags";
    return "food";
  };

  return (
    <>
      <p className="text-semilightGrey font-nunito py-5">
        Charity &gt;&gt; {getCategory()} &gt;&gt; {dish.name}
      </p>
      <div className="flex justify-center">
        <img
          src={dish.picUrl}
          alt={dish.name}
          className="w-6/12 rounded-md h-80"
        />
        <div className="px-4">
          <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-2xl">
            {getCategory().charAt(0).toUpperCase() + getCategory().slice(1)}
          </h1>
          <h2 className="flex text-3xl py-1">
            {dish.name}
            <span className="flex">
              (
              <img
                src="/icons/star.svg"
                alt="star"
                className="w-4 text-center mr-1 "
              />
              {dish.rating})
            </span>
          </h2>
          <p className="py-2">
            <span className="line-through text-2xl">EGP{dish.unitPrice}</span>
            <span className="text-btnsGreen text-3xl px-1 font-semibold">
              EGP{dish.newPrice}
            </span>
          </p>
          <h3 className="text-lightBrownYellow font-semibold font-nunitoBold text-2xl pt-4">
            Vendor
          </h3>
          <p className="flex pt-1 underline text-btnsGreen text-lg ">
            <img
              src="/icons/person.svg"
              alt="star"
              className="w-4 text-center mr-2 "
            />
            {dish.vName}
          </p>
          <p className="flex pt-1 text-lg">
            <img
              src="/icons/clock.svg"
              alt="star"
              className="w-4 text-center mr-2 "
            />
            {dish.opened ? "Open" : "Closed"}
          </p>
          <p className="flex pt-1 text-lg ">
            <img
              src="/icons/send.svg"
              alt="star"
              className="w-4 text-center mr-2 "
            />
            It is 10 km away from you
          </p>
        </div>
        <div className="p-4 border-2 border-lightBrownYellow rounded-lg mx-5 w-3/12">
          <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-2xl">
            Available:
          </h1>
          <span className="text-xl font-nunito">{dish.quantity} Pieces</span>
          <div className="flex items-center justify-around my-4">
            <button className="border-2 border-btnsGreen rounded-md py-5 px-2">
              <img src="/icons/minus.svg" alt="discard item" />
            </button>
            <span className="text-2xl font-nunitoBold">2</span>
            <button className="border-2 border-btnsGreen bg-btnsGreen rounded-md p-2">
              <img src="/icons/add.svg" alt="add item" />
            </button>
          </div>
          <p className="font-nunito text-2xl border border-nescafe py-1 rounded-md px-1">
            Total: <span>EGP {dish.newPrice * 2}</span>
          </p>
          <BtnGreen>Add to Cart</BtnGreen>
        </div>
      </div>
      <div className=" py-5">
        <h4 className="text-lightBrownYellow font-semibold font-nunitoBold text-2xl">
          Description
        </h4>
        <p className="py-1 text-xl">
          {dish.description ||
            `${dish.name} is a delicious and high-quality dish prepared with fresh ingredients. This item is part of our charity program to reduce food waste while providing you with excellent meals at discounted prices.`}
        </p>
      </div>
    </>
  );
}

export default DishInfo;
