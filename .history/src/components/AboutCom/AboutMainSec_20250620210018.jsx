function AboutMainSec() {
  return (
    <main className="mt-20 md:mt-40">
      <h1 className="font-otoma text-center text-4xl md:text-5xl my-8 md:my-12">
        About Us
      </h1>

      <img
        className="mx-auto w-full md:w-auto"
        src="about/aboutmain.png"
        alt=""
      />
      <div className="p-8 md:p-16 font-sans font-medium text-lg md:text-2xl w-11/12 md:w-10/12 bg-darkBiege rounded-2xl relative bottom-12 md:bottom-24 mx-auto ">
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
