import DishInfo from "../../components/charityCom/cartCom/DishInfo";
import DishReview from "../../components/charityCom/cartCom/DishReview";
import { useParams } from "react-router-dom";
import HomeFooter from "../../components/homeCom/HomeFooter";

function AddToCart() {
  const { dishId } = useParams();

  return (
    <>
      <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 bg-bgBeigeWhite ">
        <DishInfo dishId={dishId} />
        <DishReview />
      </div>
      <HomeFooter />
    </>
  );
}

export default AddToCart;
