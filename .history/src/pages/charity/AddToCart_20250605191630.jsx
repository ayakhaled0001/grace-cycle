import DishInfo from "../../components/charityCom/cartCom/DishInfo";
import DishReview from "../../components/charityCom/cartCom/DishReview";

function AddToCart() {
  return (
    <div className="pt-20 px-20 bg-bgBeigeWhite ">
      <DishInfo />
      <DishReview />
    </div>
  );
}

export default AddToCart;
