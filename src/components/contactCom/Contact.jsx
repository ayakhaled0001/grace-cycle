import React from "react";
import contact from "../../assets/images/contact.png";

const Contact = () => {
  return (
    <div className="w-screen min-h-screen bg-offWhite">
      <section className="p-4 md:px-10 pt-32">
        <h1 className="font-otoma text-2xl md:text-3xl lg:text-4xl">Contact Us</h1>
        <p className="font-nunitoBold text-sm md:text-base">
          We’d love to hear from you! Fill out this form and we’ll be in touch.
        </p>
      </section>
      <section className="flex flex-col md:flex-row px-10 md:px-10 pb-10">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 flex flex-col justify-center rounded-2xl lg:pl-10">
          <div className="lg:h-[80%] h-[90%] bg-darkBiege flex justify-center items-center w-[100%] rounded-2xl p-8"> 
            <form>
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-2">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className="w-full p-2 md:p-3 rounded-2xl border-2 border-[#BCBDB7] placeholder-black font-nunitoBold bg-transparent"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 md:p-3 rounded-2xl border-2 border-[#BCBDB7] placeholder-black font-nunitoBold bg-transparent"
                  />
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  className="w-full p-2 md:p-3 rounded-2xl border-2 border-[#BCBDB7] placeholder-black font-nunitoBold bg-transparent"
                />
              </div>
              <div className="mt-4">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  className="w-full p-2 md:p-3 rounded-2xl border-2 border-[#BCBDB7] placeholder-black font-nunitoBold bg-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-4 w-[100%] text-white font-nunitoBold bg-[#225A4B] py-2 px-4 rounded text-sm md:text-base"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0 flex justify-center items-center rounded">
          <img src={contact} alt="Contact Us" className="h-[80%] rounded" />
        </div>
      </section>
    </div>
  );
};

export default Contact;
