function AboutMainSec() {
  return (
    <main className="mt-20 md:mt-40">
      <h1 className="font-otoma text-center text-3xl md:text-6xl my-8">
        About Us
      </h1>

      <img
        className="mx-auto w-full md:w-11/12"
        src="about/aboutmain.png"
        alt=""
      />
      <div className="p-6 md:p-16 font-sans font-medium text-lg md:text-3xl w-11/12 md:w-10/12 bg-darkBiege rounded-2xl relative bottom-16 md:bottom-24 mx-auto ">
        <p className="text-center">
          In a rapidly changing world facing urgent environmental challenges, we
          believe innovation is key to positive change. We aim to revolutionize
          surplus food management, creating a community that values every bit
          and sees surplus food as an opportunity for solidarity and sustainable
          development
        </p>
      </div>
    </main>
  );
}

export default AboutMainSec;
