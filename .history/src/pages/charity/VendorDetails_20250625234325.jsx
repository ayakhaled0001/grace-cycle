import DishInfo from "../../components/charityCom/cartCom/DishInfo";
import HomeFooter from "../../components/homeCom/HomeFooter";
import { useParams } from "react-router-dom";

export default function VendorDetails() {
  const { vendorName } = useParams();

  // TODO: Use vendorName to fetch vendor-specific data
  // For now, using a placeholder itemId

  return (
    <>
      <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
        <DishInfo itemId="1" itemType="dish" showShoppingCart={false} />
      </div>
      <HomeFooter />
    </>
  );
}
