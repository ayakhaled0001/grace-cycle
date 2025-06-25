import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import { Link } from "react-router-dom";

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
        We will deliver <br />{" "}
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
    <section className="relative flex flex-col items-center w-[95%] md:w-[90%] mx-auto">
      {/* slides*/}
      <div
        className={`flex w-full h-48 sm:h-64 md:h-80 lg:h-96 items-center rounded-2xl md:rounded-3xl px-4 sm:px-6 md:px-10 py-20 sm:py-32 md:py-40 lg:py-56 relative bg-slate-50 text-center ${
          currentIndex === 1 ? "justify-center" : "justify-start"
        }`}
        style={{
          backgroundImage: `url(${slides[currentIndex].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full sm:w-4/5 md:w-3/5 lg:w-5/12">
          <h2
            className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-nunitoBold text-gray-800"
            style={{ lineHeight: "1.5" }}
          >
            {slides[currentIndex].title}
          </h2>
          <button
            onClick={() => {
              const section = document.getElementById("bags-section");
              if (section) {
                const offset = 120;
                const sectionPosition =
                  section.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                  top: sectionPosition - offset,
                  behavior: "smooth",
                });
              }
            }}
            className="mt-3 sm:mt-4 md:mt-6 bg-btnsGreen text-white font-nunitoBold px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl hover:bg-green-950 transition"
          >
            Order Bags Now
          </button>
        </div>
      </div>

      {/* dots */}
      <div className="flex items-center gap-x-3 sm:gap-x-4 md:gap-x-6 mt-3 sm:mt-4 md:mt-5">
        {/* Left arrow*/}
        <WestIcon
          onClick={prevSlide}
          fontSize="large"
          className="cursor-pointer text-gray-700 hover:text-darkGreen transition-colors duration-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        />

        {/* Dots */}
        <div className="flex gap-x-2 sm:gap-x-3">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                index === currentIndex ? "bg-darkGreen" : "bg-paleWhite"
              } transition-all duration-300`}
            ></div>
          ))}
        </div>

        {/* right arrow*/}
        <EastIcon
          onClick={nextSlide}
          fontSize="large"
          className="cursor-pointer text-gray-700 hover:text-darkGreen transition-colors duration-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        />
      </div>
    </section>
  );
}

export default HomeProvidingSlider;
