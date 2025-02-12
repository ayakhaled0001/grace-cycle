// import { motion } from "motion";
function HomeMainSec() {
  return (
    <main className="w-10/12 mx-auto my-10 flex ">
      <section className="w-4/12">
        <h1 className="font-otoma text-5xl py-4">
          Stop food waste, Save our planet
        </h1>
        <p className="font-sans py-4">
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
      <aside>
        <div className="w-7/12">
          <img src="/public/homeMedia/delivery.png" alt="" />
        </div>
      </aside>
    </main>
  );
}

export default HomeMainSec;
