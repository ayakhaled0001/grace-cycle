import { useState, useRef, useEffect } from "react";
const data = [{}];

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
