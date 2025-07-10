export default function MagicBagOffered() {
  return (
    <div>
      <div
        key={index}
        className="flex flex-col sm:flex-row items-center rounded-xl p-4 w-full min-h-44 bg-semiDarkBeige box-border gap-4">
        <div className="flex flex-col sm:flex-row w-full h-full bg-cover bg-center gap-4">
          <div className="relative w-full sm:w-[40%] h-48 rounded-xl flex-shrink-0">
            <img
              src={bag.picUrl}
              alt=""
              className="w-full h-full rounded-xl object-cover"
            />
            <span className="absolute text-semiDarkBeige text-sm px-4 rounded-md top-2 left-2 bg-lightGreen">
              {bag.quantity}+ bag left
            </span>
          </div>
          <div className="flex flex-col p-4 w-full sm:w-[60%]">
            <h3 className="text-lg">
              {bag.name}(
              <StarIcon style={{ width: "16px", color: "#BC870B" }} />
              {bag.rating})
            </h3>
            <div className="flex justify-start items-center py-0">
              <p className="text-xs mob470:text-sm">{bag.vName}</p>
              <p
                className={`text-xs mob470:text-sm ${
                  bag.opened ? "text-[#008000]" : "text-red-500"
                } font-semibold`}>
                {" "}
                {bag.opened ? " (opened)" : " (closed)"}
              </p>
            </div>
            <div className="flex flex-col p-3 mob470:p-4 w-full md:w-[60%] mt-3 md:mt-0">
              <h3 className="text-sm mob470:text-base mob560:text-lg">
                {bag.name}(
                <StarIcon style={{ width: "16px", color: "#BC870B" }} />
                {bag.rating})
              </h3>
              <div className="flex justify-start items-center py-0">
                <p className="text-xs mob470:text-sm">{bag.vName}</p>
                <p
                  className={`text-xs mob470:text-sm ${
                    bag.opened ? "text-[#008000]" : "text-red-500"
                  } font-semibold`}>
                  {" "}
                  {bag.opened ? " (opened)" : " (closed)"}
                </p>
              </div>
              <div className="text-xs mob470:text-sm text-darkgray mt-2">
                {bag.foods.join(", ")}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full sm:w-[50%] h-full justify-center sm:justify-end">
          <div className="flex flex-col justify-center items-center w-full sm:w-[50%]">
            <span className="bg-[#F8BD00] px-6 rounded-lg">
              {bag.discount}% OFF
            </span>
            <div className="flex justify-center items-center my-2">
              <span className="text-sm px-1 line-through">EGP{bag.price}</span>
              <span className="text-btnsGreen font-semibold text-lg">
                EGP{bag.newPrice}
              </span>
            </div>
            <Link
              to={`/CharityPage/magicbags/${bag.id}`}
              className="text-center w-full p-1.5 mob470:p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold inline-block text-sm mob470:text-base hover:bg-btnsGreen hover:text-white transition-colors duration-300">
              More Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
