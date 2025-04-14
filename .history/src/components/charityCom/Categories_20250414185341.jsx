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
    <div className="flex flex-col items-center">
      <h1>All Categories </h1>
      <div className="flex gap-5">
        {data.map((cat) => (
          <div key={cat.label}>
            <img src={cat.img} alt={cat.label} className="bg-white w-40" />
            <span>{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
