import BtnGreen from "../../Ui/BtnGreen";
function DishInfo() {
  return (
    <>
      <p className="text-semilightGrey font-nunito py-5">
        Charity &gt;&gt; main dishes &gt;&gt; Girlled Salmon
      </p>
      <div className="flex justify-center">
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
        <div className="p-4 border-2 border-lightBrownYellow rounded-lg mx-5 w-3/12">
          <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-2xl">
            Available:
          </h1>
          <span className="text-xl font-nunito">5 Pieces</span>
          <div className="flex items-center justify-around my-4">
            <button className="border-2 border-btnsGreen rounded-md py-5 px-2">
              <img src="/icons/minus.svg" alt="discard item" />
            </button>
            <span className="text-2xl font-nunitoBold">2</span>
            <button className="border-2 border-btnsGreen bg-btnsGreen rounded-md p-2">
              <img src="/icons/add.svg" alt="add item" />
            </button>
          </div>
          <p className="font-nunito text-2xl border border-nescafe py-1 rounded-md px-1">
            Total: <span>EGP 272</span>
          </p>
          <BtnGreen>Add to Cart</BtnGreen>
        </div>
      </div>
      <div className="px-10 py-5">
        <h4 className="text-lightBrownYellow font-semibold font-nunitoBold text-2xl">
          Description
        </h4>
        <p className="py-1 text-xl">
          Grilled Salmon is a healthy and tasty dish where salmon fillets are
          grilled to achieve a seared outside and moist inside, with a smoky
          flavor. Simple seasoning like salt, pepper, and lemon often highlights
          the fish&apos;s natural taste, though marinades can add complexity.
          Crispy skin provides a nice contrast. It&apos;s a versatile main
          course that pairs well with various side dishes.
        </p>
      </div>
    </>
  );
}

export default DishInfo;
