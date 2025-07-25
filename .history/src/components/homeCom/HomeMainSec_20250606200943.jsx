import { motion } from "framer-motion";
import styles from "../../pages/home/HomePage.module.css";
function HomeMainSec() {
  return (
    <main className="w-10/12 mx-auto mt-16 mb-12 flex justify-between pb-14 pt-12">
      <motion.section
        initial={{ translateX: "-10px" }}
        whileInView={{ translateX: "10px" }}
        viewport={{ margin: "0px 0px -10px 0px" }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        className="w-6/12 py-8">
        <h1 className={`font-otoma text-6xl py-4 my-2 ${styles.line12}`}>
          Stop food waste, Save our planet
        </h1>
        <p className={`font-sans py-4 text-lg my-3`}>
          In GraceCycle we connect restaurants with customers and charities to
          reduce food waste, while excess food is diverted to compost
          facilities.
        </p>
        <button
          className="text-base py-2 px-4 font-nunitoBold border-solid border-btnsGreen border-2 bg-btnsGreen
         w-4/12 text-white rounded-[11px] hover:bg-transparent hover:text-btnsGreen  transition-all ">
          Download Now
        </button>
      </motion.section>
      <aside className="w-5/12 flex justify-end">
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
            src="/public/homeMedia/delivery.png"
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
          className=`${styles.mainSecAnimateBox}``></motion.div>
      </aside>
    </main>
  );
}

export default HomeMainSec;
