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

        <DishReview itemType="bag" />
      </div>
      <HomeFooter />
    </>
  );
}
