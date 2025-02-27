function AboutAmbitions() {
  return (
    <section className="p-10 m-3">
      <h3 className="font-otoma text-3xl my-5">
        Our ambitions are embodied in
      </h3>
      <article className="flex justify-evenly my-10">
        <img src="about/aboutlist1.png" alt="" className="w-2/5" />
        <div className="my-auto w-3/6">
          <h5 className="text-2xl font-semibold">1.Reducing Food Waste:</h5>
          <ul className="list-disc text-lg">
            <li>
              By transforming surplus food into a valuable resource, we
              contribute to minimizing the amount of food that is wasted daily.
            </li>
            <li>
              We strive to raise community awareness about the importance of
              consumption rationalization and waste reduction, providing them
              with the necessary tools to achieve this
            </li>
          </ul>
        </div>
      </article>
      <article></article>
      <article></article>
    </section>
  );
}

export default AboutAmbitions;
