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
          <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-2xl">
            Main Dishes
          </h1>
          <h2 className="flex text-3xl py-1">
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
          <p className="pt-0">
            <span className="line-through text-2xl">EGP160</span>
            <span className="text-btnsGreen text-3xl px-1 font-semibold">
              EGP136
            </span>
          </p>
          <h3 className="text-lightBrownYellow font-semibold font-nunitoBold text-2xl pt-2">
            Vendor
          </h3>
          <p className="flex pt-1 underline text-btnsGreen text-lg">
            <img
              src="/icons/person.svg"
              alt="star"
              className="w-4 text-center mr-2 "
            />
            Al Shallal Restaurant
          </p>
          <p className="flex pt-1 ">
            <img
              src="/icons/clock.svg"
              alt="star"
              className="w-4 text-center mr-2 "
            />
            Open from 10:00 AM to 12:00 AM
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
