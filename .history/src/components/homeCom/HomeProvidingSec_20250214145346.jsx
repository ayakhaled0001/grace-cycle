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

function Section({ currentIndex, data }) {
  return (
    <div className="flex flex-col font-sans items-center justify-center text-center transition-opacity duration-500 relative -z-10">
      {data.map((item, index) => (
        <div
          key={index}
          className={`bg-darkBiege absolute w-5/12 h-96 px-16 py-16 transition-opacity duration-500 rounded-3xl ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}>
          <h2 className="text-3xl font-bold text-gray-800">{item.title}</h2>
          <p className="mt-2 text-2xl text-gray-600">{item.body}</p>
        </div>
      ))}
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
    <section className="h-96">
      <div className="bg-darkGreen w-80 h-44 rounded-tr-full rounded-br-full"></div>
      <div className="flex flex-col">
        <Section currentIndex={currentIndex} data={data} />
        <div>
          <WestIcon onClick={prevSlide} className="" />
          <EastIcon onClick={nextSlide} />
        </div>
      </div>
    </section>
  );
}

export default HomeProvidingSec;
