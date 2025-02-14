import { useState } from "react";
import { ChevronDown } from "lucide-react";
function HomeAccordion() {
  const accordionItems = [
    { title: "Section 1", content: "This is the content of section 1." },
    { title: "Section 2", content: "This is the content of section 2." },
    { title: "Section 3", content: "This is the content of section 3." },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section>
      <h1 className="font-otoma">Frequently Asked Questions</h1>
      <div className="w-full max-w-md mx-auto space-y-2">
        {accordionItems.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion(index)}
              className="flex justify-between items-center w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200">
              <span>{item.title}</span>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white border-t">{item.content}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeAccordion;
