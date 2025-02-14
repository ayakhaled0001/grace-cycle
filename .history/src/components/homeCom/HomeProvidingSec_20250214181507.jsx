import { useState, useRef, useEffect } from "react";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

const data = [
  {
    title: "For Vendors",
    body: "Our platform provides a solution for vendors to mitigate food waste and maximize revenue",
  },
  {
    title: "For Charities",
    body: "Charities can obtain food at discounted prices on our platform, helping them to support more people in need",
  },
  {
    title: "For Factories",
    body: "Our platform promotes sustainability by diverting restaurant waste to organic fertilizer plants",
  },
  {
    title: "For Users",
    body: "Our app connects users with local restaurants offering surplus food at discounted prices",
  },
];

function Section({ currentIndex, data, prevSlide, nextSlide }) {
  return (
    <div className="flex flex-col relative w-6/12 font-sans items-center justify-center text-center transition-opacity duration-500">
      {data.map((item, index) => (
        <div
          key={index}
          className={`bg-darkBiege absolute w-9/12 h-96 px-24 py-24 transition-opacity duration-500 rounded-3xl ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}>
          <h2 className="text-3xl font-bold text-gray-800">{item.title}</h2>
          <p className="mt-2 text-2xl text-gray-600">{item.body}</p>
        </div>
      ))}

      <img
        src="icons/rectGroup.svg"
        alt=""
        className="w-32 absolute bottom-32 right-0"
      />

      <div className="text-5xl flex align-middle justify-between w-5/12 absolute bottom-10 stransform -translate-y-1/2">
        <WestIcon
          onClick={prevSlide}
          fontSize="inherit"
          className="cursor-pointer text-paleWhite hover:text-darkGreen transition-colors duration-500"
        />
        <div className="flex gap-x-3 ">
          {data.map((item, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${
                index === currentIndex ? "bg-darkGreen" : "bg-paleWhite"
              } `}></div>
          ))}
        </div>

        <EastIcon
          onClick={nextSlide}
          fontSize="inherit"
          className="cursor-pointer text-paleWhite  hover:text-darkGreen transition-colors duration-500"
        />
      </div>
    </div>
  );
}

function HomeProvidingSec() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 4000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="relative">
      <div className="bg-darkGreen w-64 h-36 rounded-tr-3xl rounded-br-3xl z-20 absolute top-10"></div>
      <div className="flex w-12/12 justify-center relative">
        <Section
          currentIndex={currentIndex}
          data={data}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
        />
        <div className="w-4/12 flex relative z-30">
          <img src="homeMedia/person1.png" alt="" className="" />
        </div>
      </div>
      <div className="absolute w-3/12 bg-darkGreen bottom-0 right-0 top-48 "></div>
    </section>
  );
}

export default HomeProvidingSec;
