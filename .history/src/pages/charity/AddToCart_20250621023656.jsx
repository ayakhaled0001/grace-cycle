import DishInfo from "../../components/charityCom/cartCom/DishInfo";
import DishReview from "../../components/charityCom/cartCom/DishReview";
import { useParams } from "react-router-dom";
import HomeFooter from "../../components/homeCom/HomeFooter";

function AddToCart() {
  const { dishId } = useParams();

  return (
    <>
    
    <HomeFooter /></>
    <div className="pt-20 px-20 bg-bgBeigeWhite ">
      <DishInfo dishId={dishId} />
      <DishReview />

    </div>
  );
}

export default AddToCart;
