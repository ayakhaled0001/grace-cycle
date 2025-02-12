// import { motion } from "motion";
function HomeMainSec() {
  return (
    <main className="container mx-auto">
      <section className="w-5/12">
        <h1 className="font-otoma text-5xl">
          Stop food waste, Save our planet
        </h1>
        <p className="font-sans">
          In GraceCycle we connect restaurants with customers and charities to
          reduce food waste, while excess food is diverted to compost
          facilities.
        </p>
        <button
          className="font-sans border-solid border-btnsGreen border-2 bg-btnsGreen
         w-4/12 text-white rounded-[11px] hover:bg-transparent hover:text-btnsGreen  transition-all">
          Download Now
        </button>
      </section>
      <aside></aside>
    </main>
  );
}

export default HomeMainSec;
