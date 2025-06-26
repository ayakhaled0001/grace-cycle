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
    <div className="my-8 mob470:my-10 mob560:my-12 md:my-14 w-[95%] mob470:w-[92%] mob560:w-[90%] md:w-10/12 mx-auto px-2 mob470:px-3 mob560:px-4">
      <h1 className="font-sans text-lg mob470:text-xl md:text-xl font-bold my-3 mob470:my-4 mob560:my-5">
        All Categories{" "}
      </h1>
      <div className="grid grid-cols-2 mob470:grid-cols-3 mob560:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 mob470:gap-4 mob560:gap-5 justify-center my-3 mob470:my-4 mob560:my-5">
        {data.map((cat) => (
          <div key={cat.label} className="flex flex-col items-center">
            <img
              src={cat.img}
              alt={cat.label}
              className="w-24 h-24 mob470:w-28 mob470:h-28 mob560:w-32 mob560:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover"
            />
            <span className="font-medium my-1 mob470:my-2 text-xs mob470:text-sm mob560:text-base text-center">
              {cat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
