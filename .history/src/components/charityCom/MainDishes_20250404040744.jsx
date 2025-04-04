function MainDishes() {
  return (
    <section className="w-10/12 mx-auto bg-semiDarkBeige my-5">
      <div className="relative -top-3 flex justify-between w-12/12 mx-4">
        <span className="bg-white p-1 rounded-sm">Main dishes</span>
        <span className="bg-white p-1 rounded-sm">
          {/* will be a Link to a route */}
          <a href="#">Shop More</a>
        </span>
      </div>
    </section>
  );
}

export default MainDishes;
