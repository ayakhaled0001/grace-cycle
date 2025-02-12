import styles from "../../pages/home/HomePage.module.css";
import { motion } from "framer-motion";
function HomeProblemsSec() {
  return (
    <section className={`${styles} m-12`}>
      <h1 className={`font-otoma text-3xl`}>Problems caused by </h1>
      <motion.h1
        initial={{ opacity: 0, translateY: "-10px" }}
        whileInView={{ opacity: 1, translateY: "0px" }}
        viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className={`font-otoma text-3xl `}>
        food waste
      </motion.h1>
      <article></article>
    </section>
  );
}

export default HomeProblemsSec;
