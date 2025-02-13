import styles from "../../pages/home/HomePage.module.css";
import { motion } from "framer-motion";
function HomeProblemsSec() {
  return (
    <section className={`${styles} m-12`}>
      <motion.h1
        initial={{ opacity: 0, translateY: "-10px" }}
        whileInView={{ opacity: 1, translateY: "0px" }}
        viewport={{ margin: "0px 0px -20px 0px" }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className={`font-otoma text-3xl `}>
        Problems caused by food waste
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, translateY: "-10px" }}
        whileInView={{ opacity: 1, translateY: "0px" }}
        viewport={{ margin: "0px 0px -20px 0px" }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className={`font-otoma text-3xl `}>
        food waste
      </motion.h1>
      <article className={`w-11/12 mx-auto`}>
        <motion.div
          initial={{ translateX: "-30px" }}
          whileInView={{ translateX: "0px" }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          viewport={{ margin: "0px 0px 25% 0px" }}
          className={`${styles.imgsFlow} w-5/12 my-10 flex justify-center`}>
          <img
            src="../../../public/homeMedia/probImg1.png"
            alt="wasted food"
            className={`${styles.imgsFlow1}`}
          />
          <img
            src="../../../public/homeMedia/probImg2.png"
            alt="wasted food"
            className={`${styles.imgsFlow2}`}
          />
          <img
            src="../../../public/homeMedia/probImg3.png"
            alt="wasted food"
            className={`${styles.imgsFlow3}`}
          />
        </motion.div>
        <aside className={`asideImgsFlow`}></aside>
      </article>
    </section>
  );
}

export default HomeProblemsSec;
