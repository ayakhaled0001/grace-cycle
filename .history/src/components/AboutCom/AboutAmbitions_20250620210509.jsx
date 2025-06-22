function AboutAmbitions() {
  return (
    <section className="p-4 md:p-10 mb-10 md:mb-20">
      <h3 className="font-otoma text-2xl md:text-5xl my-8 md:my-16 text-center">
        Our ambitions are embodied in
      </h3>
      <article className="flex flex-col md:flex-row justify-evenly my-8 md:my-12 items-center">
        <img
          src="about/aboutlist1.png"
          alt="Reducing Food Waste"
          className="w-full md:w-1/4 rounded-lg"
        />
        <div className="my-auto w-full md:w-2/6 mt-6 md:mt-0">
          <h5 className="text-xl md:text-3xl font-semibold my-3 md:my-5">
            1. Reducing Food Waste:
          </h5>
          <ul className="list-disc text-base md:text-xl pl-5">
            <li>
              By transforming surplus food into a valuable resource, we
              contribute to minimizing the amount of food that is wasted daily.
            </li>
            <li>
              We strive to raise community awareness about the importance of
              consumption rationalization and waste reduction.
            </li>
          </ul>
        </div>
      </article>
      <article className="flex flex-col-reverse md:flex-row justify-evenly my-8 md:my-12 items-center">
        <div className="my-auto w-full md:w-2/6 mt-6 md:mt-0">
          <h5 className="text-xl md:text-3xl font-semibold my-3 md:my-5">
            2. Enhancing Economic Efficiency:
          </h5>
          <ul className="list-disc text-base md:text-xl pl-5">
            <li>
              We provide a platform for restaurants and stores to sell surplus
              food at discounted prices, turning potential losses into profits.
            </li>
            <li>
              For consumers, we offer an opportunity to get high-quality meals
              at lower prices, contributing to better financial management.
            </li>
          </ul>
        </div>
        <img
          src="about/aboutlist2.png"
          alt="Enhancing Economic Efficiency"
          className="w-full md:w-1/4 rounded-lg"
        />
      </article>
      <article className="flex flex-col md:flex-row justify-evenly my-8 md:my-12 items-center">
        <img
          src="about/aboutlist3.png"
          alt="Promoting Social Solidarity"
          className="w-full md:w-1/4 rounded-lg"
        />
        <div className="my-auto w-full md:w-2/6 mt-6 md:mt-0">
          <h5 className="text-xl md:text-3xl font-semibold my-3 md:my-5">
            3. Promoting Social Solidarity:
          </h5>
          <ul className="list-disc text-base md:text-xl pl-5">
            <li>
              A portion of our profits goes towards supporting local charities
              and providing meals to those in need.
            </li>
            <li>
              We believe in the power of community and strive to build a network
              of partners who share our vision for a sustainable future.
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
}

export default AboutAmbitions;
