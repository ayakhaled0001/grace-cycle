import { motion } from "framer-motion";
import styles from "../../pages/home/HomePage.module.css";
function HomeMainSec() {
  return (
    <main className="w-11/12 lg:w-10/12 mx-auto mt-8 sm:mt-12 lg:mt-16 mb-10 lg:mb-12 flex justify-center lgHome:flex lgHome:justify-between pb-10 sm:pb-12 lg:pb-14 pt-8 sm:pt-10 lg:pt-12">
      <motion.section
        initial={{ translateX: "-10px" }}
        whileInView={{ translateX: "10px" }}
        viewport={{ margin: "0px 0px -10px 0px" }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        className="w-full lgHome:w-6/12 py-6 sm:py-8 flex items-center flex-col lgHome:items-start">
        <h1
          className={`font-otoma text-3xl sm:text-4xl uppersm:text-5xl lgHome:text-6xl py-3 sm:py-4 my-2 text-center lgHome:text-left ${styles.line12}`}>
          Stop food waste, Save our planet
        </h1>
        <p
          className={`font-sans py-3 sm:py-4 text-base sm:text-lg my-2 sm:my-3 text-center lgHome:text-left`}>
          In GraceCycle we connect restaurants with customers and charities to
          reduce food waste, while excess food is diverted to compost
          facilities.
        </p>
        <button
          className="text-sm sm:text-base py-2 px-4 font-nunitoBold border-solid border-btnsGreen border-2 bg-btnsGreen w-full max-w-[220px] mob560:max-w-[260px] lg:max-w-[220px] text-white rounded-[11px] hover:bg-transparent hover:text-btnsGreen transition-all">
          Download Now
        </button>
      </motion.section>
      <aside className="w-5/12 lgHome:flex lgHome:justify-end hidden ">
        <motion.div
          initial={{ translateX: "0px" }}
          whileInView={{
            translateX: "-100px",
          }}
          viewport={{ margin: "0px 0px -100px 0px" }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          className={`${styles.mainImgContainer} hidden lgHome:flex  `}>
          <img
            src="/homeMedia/delivery.png"
            alt="delivery"
            className={`${styles.mainImg} `}
          />
        </motion.div>
        <motion.div
          initial={{ translate: "0px" }}
          whileInView={{
            translateX: "100px",
          }}
          viewport={{ margin: "0px 0px -100px 0px" }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          className={`${styles.mainSecAnimateBox} hidden lgHome:flex`}></motion.div>
      </aside>
    </main>
  );
}

export default HomeMainSec;

