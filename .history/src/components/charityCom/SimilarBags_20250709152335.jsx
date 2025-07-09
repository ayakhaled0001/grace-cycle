import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { Skeleton } from "@mui/material";

export default function SimilarBags() {
  const { similarItems } = useSelector((state) => state.bagDetails.bag) || {};
  const isLoading = useSelector((state) => state.bagDetails.isLoading);
  const error = useSelector((state) => state.bagDetails.error);

  if (isLoading) {
    return (
      <div>
        {[1, 2].map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-center rounded-xl p-4 w-full min-h-44 bg-semiDarkBeige box-border gap-4 mb-4">
            <div className="flex flex-col sm:flex-row w-full h-full bg-cover bg-center gap-4">
              <div className="relative w-full sm:w-[40%] h-48 rounded-xl flex-shrink-0">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={192}
                  className="rounded-xl"
                />
              </div>
              <div className="flex flex-col p-4 w-full sm:w-[60%]">
                <Skeleton width="60%" height={32} />
                <Skeleton width="40%" height={24} />
                <Skeleton width="80%" height={24} />
                <Skeleton width="100%" height={36} />
              </div>
            </div>
            <div className="flex w-full sm:w-[50%] h-full justify-center sm:justify-end">
              <div className="flex flex-col justify-center items-center w-full sm:w-[50%]">
                <Skeleton width={80} height={32} />
                <Skeleton width={100} height={32} />
                <Skeleton width={120} height={36} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  if (!similarItems || similarItems.length === 0) {
    return <div>No similar bags found.</div>;
  }

  return (
    <div>
      {similarItems.map((bag, index) => (
        <div
          key={bag.id || index}
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
              <div className="text-xs mob470:text-sm text-darkgray mt-2">
                {bag.foods && bag.foods.join(", ")}
              </div>
            </div>
          </div>
          <div className="flex w-full sm:w-[50%] h-full justify-center sm:justify-end">
            <div className="flex flex-col justify-center items-center w-full sm:w-[50%]">
              <span className="bg-[#F8BD00] px-6 rounded-lg">
                {bag.discount}% OFF
              </span>
              <div className="flex justify-center items-center my-2">
                <span className="text-sm px-1 line-through">
                  EGP{bag.price}
                </span>
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
      ))}
    </div>
  );
}
