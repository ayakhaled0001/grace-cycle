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
  return (
    <div className="my-8 md:my-14 w-[95%] md:w-[90%] rounded-xl py-2 mx-auto bg-[#EEEADF] px-4 md:px-8">
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
    </div>
  );
}

export default Categories;
