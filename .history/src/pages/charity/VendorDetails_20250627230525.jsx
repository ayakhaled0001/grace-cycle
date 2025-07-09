import DishInfo from "../../components/charityCom/cartCom/DishInfo";
import { useParams } from "react-router-dom";

export default function VendorDetails() {
  const { vendorId } = useParams();

  return (
    <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
      <DishInfo itemId={vendorId} itemType="vendor" showShoppingCart={false} />
    </div>
  );
}
