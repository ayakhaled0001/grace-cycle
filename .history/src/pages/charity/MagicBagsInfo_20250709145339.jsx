import DishInfo from "../../components/charityCom/cartCom/DishInfo";
import DishReview from "../../components/charityCom/cartCom/DishReview";
import SimilarItems from "../../components/charityCom/cartCom/SimilarItems";
import SimilarBags from "../../components/charityCom/SimilarBags";
import HomeFooter from "../../components/homeCom/HomeFooter";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchBagDetails } from "../../redux/BagDetailsSlice";

export default function MagicBagsInfo() {
  const { bagId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (bagId) {
      dispatch(fetchBagDetails(bagId));
    }
  }, [dispatch, bagId]);

  return (
    <>
      <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
        <DishInfo itemId={bagId} itemType="bag" />

        <DishReview itemType="bag" />
        <SimilarBags />
      </div>
      <HomeFooter />
    </>
  );
}
