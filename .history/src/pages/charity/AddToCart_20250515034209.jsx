function AddToCart() {
  return (
    <div className="pt-20 px-10 bg-bgBeigeWhite">
      <p className="text-semilightGrey font-nunito">
        Charity &gt;&gt; main dishes &gt;&gt; Girlled Salmon
      </p>
      <div className="flex absolute justify-between m-3 left-0 right-0 overflow-hidden">
        <span className=" bg-semiDarkBeige px-2 py-1 rounded-md">+ left</span>
        <span className="flex items-center bg-semiDarkBeige px-2 py-1 rounded-md">
          <img
            src="icons/star.svg"
            alt="star"
            className="w-3 text-center mr-1 "
          />
          5
        </span>
      </div>
    </div>
  );
}

export default AddToCart;
