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
      <div className="m-3">
        <img src="services/foodlistingtest.png" alt="" className="w-3/12" />
        <div>
          <h1>grilled salmom</h1>
        </div>
      </div>
    </section>
  );
}

export default MainDishes;
