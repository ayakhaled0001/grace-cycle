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
      title: "How does it benefit charities?",
      content:
        "Charities receive donations of surplus food, which they can then distribute to people facing food insecurity",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className="flex">
      <img src="/public/homeMedia/salad.png" alt="" className="w-3/6" />
      <div className="px-10">
        <h1 className="font-otoma text-6xl">Frequently Asked Questions</h1>
        <div className="my-8">
          {accordionItems.map((item, index) => (
            <div key={index} className=" rounded-lg overflow-hidden py-4">
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full  py-2 text-left bg-gray-100 hover:bg-gray-200">
                <span className="font-bold text-2xl lg">{item.title}</span>
                {/* <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                /> */}
                {openIndex === index ? (
                  <img src="/public/icons/close.svg" alt="" className="w-7" />
                ) : (
                  <img src="/public/icons/open.svg" alt="" className="w-7" />
                )}
              </button>
              {openIndex === index && (
                <div className="py-5 border-b">{item.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeAccordion;
