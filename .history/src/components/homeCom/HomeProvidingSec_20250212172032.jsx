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
    title: "For Charities",
    body: "Charities can obtain food at discounted prices on our platform, helping them to support more people in need",
  },
  {
    title: "For Users",
    body: "Our app connects users with local restaurants offering surplus food at discounted prices",
  },
];

function HomeProvidingSec() {
  const sections = ["Section 1", "Section 2", "Section 3", "Section 4"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + sections.length) % sections.length
    );
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 3000); // Change section every 3 seconds

    return () => clearInterval(intervalRef.current); // Cleanup interval on unmount
  }, []);

  return <section></section>;
}

export default HomeProvidingSec;
