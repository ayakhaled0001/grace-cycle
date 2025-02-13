import React, { useState } from "react";
import cloud from "../../assets/icons/cloud.svg";
import heart from "../../assets/icons/heart.svg";
import mobile1 from "../../assets/icons/mobile1.svg";
import mobile2 from "../../assets/icons/mobile2.svg";
import burger from "../../assets/icons/burger.svg";

const steps = [
  { txt: { title: "Download App", discreption: "You can download our app from our website and start your journey with GraceCycle" }, icon:   <img src={cloud} alt="cloud icon" /> },
  { txt: { title: "Identify your health problems", discreption: "Telling us about your health problems helps us recommend the right food for you" }, icon: <img src={heart} alt="heart icon"/> },
  { txt: { title: "Choose your dish", discreption: "We have many different dishes to suit all tastes" }, icon: <img src={mobile1} alt="mobile icon"/> },
  { txt: { title: "Select the method of receipt", discreption: "You can go to the organization to get your order or have it delivered to your home" }, icon: <img src={mobile2} alt="mobile icon"/> },
  { txt: { title: "Enjoy your dish", discreption: "You are now able to enjoy your dish and try more diverse dishes" }, icon: <img src={burger} alt="burger icon"/> },
];

function HomeSteps() {
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleHover = (index) => {
    if (!completedSteps.includes(index)) {
      setCompletedSteps([...completedSteps, index]);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center py-24 mx-auto mt-10 w-[100%] bg-offWhite">
      <h2 className="text-3xl font-bold text-center font-otoma mb-14">
        How our App works
      </h2>
      {steps.map((step, index) => (
        <div
          key={index}
          onMouseEnter={() => handleHover(index) }
          className={`flex justify-center items-center h-auto w-[80%] ${completedSteps.includes(index)? "opacity-100" : "opacity-50"}`}
        >
          <div className="flex flex-col justify-center items-center ml-4 text-lg font-semibold w-[30%]">
            {index % 2 === 0 ? <div>{step.icon}</div>: <div className="flex flex-col justify-center items-center font-nunito"> <h3 className="font-nunitoBold">{step.txt.title}</h3> <p className="text-center font-nunitoBold text-darkgray">{step.txt.discreption}</p></div>}
          </div>

              {/* // steps line */}
            <div className="flex flex-col items-center w-[15%] h-[100%]">
                <div
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-500 font-otoma text-xl ${
                    completedSteps.includes(index)
                    ? "bg-darkGreen text-white"
                    : "bg-darkBiege text-black"
                }`}
                >
                {index + 1}
                </div>
                {index !== steps.length - 1 && (
                <div
                    className={`w-1 h-36 transition-colors duration-700 ${
                    completedSteps.includes(index)
                        ? "bg-darkGreen"
                        : "bg-darkBiege"
                    }`}
                ></div>
                )}
                 {index === steps.length - 1 && (
                <div
                    className={`w-1 h-36 transition-colors duration-700 ${
                    completedSteps.includes(index)
                        ? "bg-offwhite"
                        : "bg-offwhite"
                    }`}
                ></div>
                )}
            </div>
          <div className="flex flex-col justify-center items-center ml-4 text-lg font-semibold w-[30%] ">
            {index % 2 === 0 ? <div className="flex flex-col justify-center items-center font-nunito"> <h3 className="font-nunitoBold">{step.txt.title}</h3> <p className="text-center font-nunitoBold text-darkgray">{step.txt.discreption}</p></div> : <div>{step.icon}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
export default HomeSteps;
