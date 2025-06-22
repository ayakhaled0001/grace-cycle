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
    <div className="my-14 w-[90%] rounded-xl py-2 mx-auto bg-[#EEEADF] px-8">
      <h1 className="text-xl font-bold my-5  font-nunitoBold">All Categories </h1>
      <div className="flex gap-5 justify-center my-5">
        {data.map((cat) => (
          <div key={cat.label} className="flex flex-col items-center">
            <img src={cat.img} alt={cat.label} className=" w-32" />
            <span className=" font-medium my-2 font-nunitoBold">{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
