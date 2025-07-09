import DishInfo from "../../components/charityCom/cartCom/DishInfo";
import DishReview from "../../components/charityCom/cartCom/DishReview";
import HomeFooter from "../../components/homeCom/HomeFooter";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MagicBagsInfo() {
  const { bagId } = useParams();
  const { bags } = useSelector((state) => state.bags);
  const bag = bags.find(
    (b, index) => (b.id || b.bagId || b._id || index).toString() === bagId
  );

  return (
    <>
      <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
        <DishInfo itemId={bagId} itemType="bag" />
        {/* Description Section */}
        {bag && (
          <div className="py-4 mob470:py-5 mob560:py-5 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8">
            <h4 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
              Description
            </h4>
            <p className="py-2 md:py-1 text-base mob470:text-lg mob560:text-lg md:text-xl leading-relaxed">
              {bag.description ||
                `${bag.name} is a delicious and high-quality magic bag containing multiple items prepared with fresh ingredients. This item is part of our charity program to reduce food waste while providing you with excellent bags at discounted prices.`}
            </p>
            {bag.foods && bag.foods.length > 0 && (
              <div className="mb-4">
                <p className="text-sm mob470:text-base mob560:text-base md:text-lg font-semibold text-lightBrownYellow">
                  Contains:
                </p>
                <p className="text-sm mob470:text-base mob560:text-base md:text-lg text-darkgray">
                  {bag.foods.join(", ")}
                </p>
              </div>
            )}
          </div>
        )}
        <DishReview />
      </div>
      <HomeFooter />
    </>
  );
}
