import DishInfo from "../../components/charityCom/cartCom/DishInfo";

export default function VendorDetails() {
  return (
    <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
      <DishInfo itemId="1" itemType="dish" showShoppingCart={false} />
    </div>
  );
}
