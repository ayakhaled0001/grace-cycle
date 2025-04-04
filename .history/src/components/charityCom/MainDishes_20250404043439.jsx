function MainDishes() {
  return (
    <section className="w-10/12 mx-auto bg-semiDarkBeige my-5">
      <div className="relative -top-3 flex justify-between w-12/12 mx-4">
        <span className="bg-white p-1 rounded-md font-sans text-lg font-medium font-semibold">
          Main dishes
        </span>
        <span className="bg-white p-1 rounded-md  font-sans text-lg text-lightBrownYellow underline ">
          {/* will be a Link to a route */}
          <a href="#">Shop More</a>
        </span>
      </div>
      <div className="m-3 w-3/12 font-sans">
        <img src="services/foodlistingtest.png" alt="" className="" />
        <div className="p-2">
          <h1 className="font-sans text-xl font-medium">grilled salmon</h1>
          <span>Al Shallal Restaurant</span> <span>(opened)</span>
          <div className="flex justify-between py-3">
            <span className="text-lg">Price</span>
            <div className="">
              <span className="text-sm px-1 ">EGP160 </span>
              <span className="text-btnsGreen font-semibold text-lg ">
                {" "}
                EGP136
              </span>
            </div>
          </div>
          <button>Add to cart</button>
        </div>
      </div>
    </section>
  );
}

export default MainDishes;
