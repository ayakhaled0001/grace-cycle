import { useState } from "react";
import { ChevronDown } from "lucide-react";
function HomeAccordion() {
  const accordionItems = [
    {
      title: "How does this help the environment?",
      content:
        "By reducing food waste, we prevent it from ending up in landfills, which contributes to greenhouse gas emissions. We also promote composting, which enriches the soil.",
    },
    {
      title: "How can I contact you if I have questions?",
      content:
        'You can reach us through the "Contact Us" section on the app or website. We will be happy to assist you.',
    },
    {
      title: "What kind of food is available?",
      content:
        "Charities receive donations of surplus food, which they can then distribute to people facing food insecurity",
    },
    {
      title: "",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className="flex">
      <img src="/public/homeMedia/salad.png" alt="" className="w-5/12" />
      <div className="px-10">
        <h1 className="font-otoma text-6xl">Frequently Asked Questions</h1>
        <div className="">
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
      </div>
    </section>
  );
}

export default HomeAccordion;
