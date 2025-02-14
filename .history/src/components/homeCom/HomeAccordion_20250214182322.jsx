function HomeAccordion() {
  const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
    return <div></div>;
  };
}

export default HomeAccordion;
