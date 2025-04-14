// this section will be linked to another pages ---------------------------

const data = [
  { label: "Main Dishes", img: "services/maindishes.png", path: "" },
  { label: "Baked Goods", img: "services/bakedgoods.png", path: "" },
  { label: "Healthy", img: "services/healthy.png", path: "" },
  { label: "Dessert", img: "services/desserts.png", path: "" },
  { label: "Drinks", img: "services/drinks.png", path: "" },
  { label: "Magic Bags", img: "services/magicbags.png" },
  { label: "Restaurants", img: "services/restaurants.png" },
  { label: "Supermarkets", img: "services/supermarketspng.png" },
];

function Categories() {
  return (
    <div className="my-14">
      <h1 className="font-sans text-xl font-bold my-5">All Categories </h1>
      <div className="flex gap-5 justify-center my-5">
        {data.map((cat) => (
          <div key={cat.label} className="flex flex-col items-center">
            <img src={cat.img} alt={cat.label} className=" w-40" />
            <span className=" font-medium my-2">{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
