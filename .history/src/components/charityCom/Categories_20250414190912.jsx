// this section will be linked to another pages ---------------------------

const data = [
  { label: "Main Dishes", img: "services/maindishes.png" },
  { label: "Baked Goods", img: "services/bakedgoods.png" },
  { label: "Healthy", img: "services/healthy.png" },
  { label: "Dessert", img: "services/desserts.png" },
  { label: "Drinks", img: "services/drinks.png" },
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
            <span className="bg-white font-medium">{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
