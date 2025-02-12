import { useState, useRef, useEffect } from "react";
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

function Section({ currentIndex }) {
  return (
    <div className="relative flex flex-col font-sans bg-lightBrownYellow items-center justify-center text-center transition-opacity duration-500">
      {data.map((item, index) => (
        <div
          key={index}
          className={`absolute w-full transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}>
          <h2 className="text-2xl font-bold text-gray-800">{item.title}</h2>
          <p className="mt-2 text-gray-600">{item.body}</p>
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
    <section>
      <div className={`relative`}>
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-gray-800 text-black rounded-full shadow-md hover:bg-gray-700 transition">
          prev
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2  p-3 bg-gray-800 text-black rounded-full shadow-md hover:bg-gray-700 transition">
          next
        </button>
      </div>
      <Section currentIndex={currentIndex} />
    </section>
  );
}

export default HomeProvidingSec;
