function AddToCart() {
  return (
    <div className="pt-20 px-12 bg-bgBeigeWhite ">
      <p className="text-semilightGrey font-nunito py-5">
        Charity &gt;&gt; main dishes &gt;&gt; Girlled Salmon
      </p>
      <div className="flex">
        <img
          src="/about/aboutmain.png"
          alt=""
          className="w-4/12 rounded-md h-64"
        />
        <div className="px-4">
          <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-3xl">
            Main Dishes
          </h1>
          <h2 className="flex text-2xl">
            Grilled Salmon
            <span className="flex">
              (
              <img
                src="/icons/star.svg"
                alt="star"
                className="w-4 text-center mr-1 "
              />
              4.5)
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
