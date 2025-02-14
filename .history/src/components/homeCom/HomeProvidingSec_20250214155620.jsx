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
    <>
      <div className="flex flex-col relative w-6/12  font-sans items-center justify-center text-center transition-opacity duration-500 -z-10">
        {data.map((item, index) => (
          <div
            key={index}
            className={`bg-darkBiege absolute w-10/12 px-16 py-10 transition-opacity duration-500 rounded-3xl  ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}>
            <h2 className="text-3xl font-bold text-gray-800">{item.title}</h2>
            <p className="mt-2 text-2xl text-gray-600">{item.body}</p>
          </div>
        ))}

        <WestIcon
          onClick={prevSlide}
          className="absolute left-0 cursor-pointer"
        />

        <EastIcon
          onClick={nextSlide}
          className="absolute right-0 cursor-pointer"
        />
      </div>
    </>
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
    <section>
      <div className="bg-darkGreen w-80  rounded-tr-full rounded-br-full relative z-20"></div>
      <div className="flex w-12/12 justify-center">
        <Section
          currentIndex={currentIndex}
          data={data}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
        />
        <div className="">
          <img src="homeMedia/person1.png" alt="" className="" />
        </div>
      </div>
    </section>
  );
}

export default HomeProvidingSec;
