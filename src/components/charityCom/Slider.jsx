import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

const slides = [
  {
    image: "homeMedia/slide1.png",
    title: (
      <>
        You can order separate <br />
        <span
          className="text-btnsGreen"
          style={{
            display: "inline-block",
            transform: "rotate(-15deg)",
            fontSize: "1.2em",
            fontWeight: "bold",
          }}
        >
          Meals
        </span>{" "}
        or combined{" "}
        <span
          className="text-btnsGreen"
          style={{
            display: "inline-block",
            transform: "rotate(-15deg)",
            fontSize: "1.2em",
          }}
        >
          Bags
        </span>
      </>
    ),
  },
  {
    image: "homeMedia/slide2.png",
    title: (
      <>
        Enjoy special offers <br /> On{" "}
        <span
          className="text-orange"
          style={{
            display: "inline-block",
            fontSize: "1.2em",
          }}
        >
          all items
        </span>{" "}
        <br />
        At{" "}
        <span
          className="text-orange"
          style={{
            display: "inline-block",
            fontSize: "1.2em",
          }}
        >
          any time
        </span>{" "}
      </>
    ),
  },
  {
    image: "homeMedia/slide3.png",
    title: (
      <>
        We will deliver <br /> {" "}
        <span
          className="text-darkOrange"
          style={{
            display: "inline-block",
            fontSize: "1.2em",
          }}
        >
         Everything you need
        </span>{" "}
        <br />
        from the Best stores
      </>
    ),
  },
];

function HomeProvidingSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="relative flex flex-col items-center w-[90%] mx-auto">
      {/* slides*/}
      <div
        className={`flex w-full h-96 items-center rounded-3xl px-10 py-56 relative bg-slate-50 text-center ${
          currentIndex === 1 ? "justify-center" : "justify-start"
        }`}
        style={{
          backgroundImage: `url(${slides[currentIndex].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-5/12">
          <h2
            className="text-4xl font-nunitoBold text-gray-800"
            style={{ lineHeight: "1.5" }}
          >
            {slides[currentIndex].title}
          </h2>
          <button className="mt-6 bg-btnsGreen text-white font-nunitoBold px-8 py-2 rounded-lg text-xl hover:bg-green-950  transition">
            Order Bags Now
          </button>
        </div>
      </div>

      {/* dots */}
      <div className="flex items-center gap-x-6 mt-5 ">
        {/* السهم اليسار */}
        <WestIcon
          onClick={prevSlide}
          fontSize="large"
          className="cursor-pointer text-gray-700 hover:text-darkGreen transition-colors duration-500 text-5xl"
        />

        {/* الدوتس */}
        <div className="flex gap-x-3">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${
                index === currentIndex ? "bg-darkGreen" : "bg-paleWhite"
              } transition-all duration-300`}
            ></div>
          ))}
        </div>

        {/* السهم اليمين */}
        <EastIcon
          onClick={nextSlide}
          fontSize="large"
          className="cursor-pointer text-gray-700 hover:text-darkGreen transition-colors duration-500 text-5xl"
        />
      </div>
    </section>
  );
}

export default HomeProvidingSlider;
