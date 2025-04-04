function MainDishes() {
  return (
    <section className="w-10/12 mx-auto bg-semiDarkBeige my-5">
      <div className="relative -top-3 flex content-between w-12/12">
        <span className="inline-block">Main dishes</span>
        <span className="inline-block">
          {/* will be a Link to a route */}
          <a href="#">Shop More</a>
        </span>
      </div>
    </section>
  );
}

export default MainDishes;
