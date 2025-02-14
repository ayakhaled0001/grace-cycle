import { useState } from "react";
function HomeAccordion() {
  const accordionItems = [
    { title: "Section 1", content: "This is the content of section 1." },
    { title: "Section 2", content: "This is the content of section 2." },
    { title: "Section 3", content: "This is the content of section 3." },
  ];

  const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  };
  return <div></div>;
}

export default HomeAccordion;
