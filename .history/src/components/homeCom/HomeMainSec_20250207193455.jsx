import { motion } from "framer-motion";
import styles from "../../pages/home/HomePage.module.css";
function HomeMainSec() {
  return (
    <main className="w-10/12 mx-auto mt-10 mb-12 flex justify-between pb-14 pt-14">
      <section className="w-6/12 py-5">
        <h1 className={`font-otoma text-6xl py-4 my-2 ${styles.line12}`}>
          Stop food waste, Save our planet
        </h1>
        <p className={`font-sans py-4 text-lg my-3`}>
          In GraceCycle we connect restaurants with customers and charities to
          reduce food waste, while excess food is diverted to compost
          facilities.
        </p>
        <button
          className="text-base py-1 px-2 font-sans border-solid border-btnsGreen border-2 bg-btnsGreen
         w-4/12 text-white rounded-[11px] hover:bg-transparent hover:text-btnsGreen  transition-all">
          Download Now
        </button>
      </section>
      <aside className="w-5/12 flex justify-end">
        <div className={`${styles.mainImgContainer} `}>
          <img
            src="/public/homeMedia/delivery.png"
            alt=""
            className={styles.mainImg}
          />
        </div>
        <div className={styles.mainSecAnimateBox}></div>
      </aside>
    </main>
  );
}

export default HomeMainSec;
