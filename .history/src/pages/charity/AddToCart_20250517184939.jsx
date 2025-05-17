function AddToCart() {
  return (
    <div className="pt-20 px-20 bg-bgBeigeWhite ">
      <p className="text-semilightGrey font-nunito py-5">
        Charity &gt;&gt; main dishes &gt;&gt; Girlled Salmon
      </p>
      <div className="flex">
        <img
          src="/about/aboutmain.png"
          alt=""
          className="w-5/12 rounded-md h-72"
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
          <p className="py-2">
            <span className="line-through text-2xl">EGP160</span>
            <span className="text-btnsGreen text-3xl px-1 font-semibold">
              EGP136
            </span>
          </p>
          <h3 className="text-lightBrownYellow font-semibold font-nunitoBold text-2xl pt-4">
            Vendor
          </h3>
          <p className="flex pt-1 underline text-btnsGreen text-lg ">
            <img
              src="/icons/person.svg"
              alt="star"
              className="w-4 text-center mr-2 "
            />
            Al Shallal Restaurant
          </p>
          <p className="flex pt-1 text-lg">
            <img
              src="/icons/clock.svg"
              alt="star"
              className="w-4 text-center mr-2 "
            />
            Open from 10:00 AM to 12:00 AM
          </p>
          <p className="flex pt-1 text-lg ">
            <img
              src="/icons/send.svg"
              alt="star"
              className="w-4 text-center mr-2 "
            />
            It is 10 km away from you
          </p>
        </div>
        <div className="p-5 border-2 border-lightBrownYellow rounded-md mx-5">
          <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-2xl">
            Available:
          </h1>
          <span className="text-xl font-nunito">5 Pieces</span>
          <div>
            <button className="border-2 border-btnsGreen">
              <img src="/icons/minus.svg" alt="discard" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
