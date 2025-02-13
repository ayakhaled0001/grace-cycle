import { useState, useRef, useEffect } from "react";

function HomeProvidingSec() {
  const sections = ["Section 1", "Section 2", "Section 3", "Section 4"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + sections.length) % sections.length
    );
  };

  return <section></section>;
}

export default HomeProvidingSec;
