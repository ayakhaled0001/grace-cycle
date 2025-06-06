import styles from "../../pages/home/HomePage.module.css";
import { motion } from "framer-motion";
function HomeProblemsSec() {
  return (
    <section className={`${styles} my-12 bg-offWhite`}>
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
      <article className={`w-11/12 mx-auto flex justify-between `}>
        <motion.div
          initial={{ translateX: "-40px" }}
          whileInView={{ translateX: "-10px" }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          viewport={{ margin: "0px 0px 10px 0px" }}
          className={`${styles.imgsFlow} hidden lgHome:flex w-5/12 my-10  justify-center`}>
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
        <motion.aside
          initial={{
            translateX: "30px",
          }}
          whileInView={{
            translateX: "-10px",
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          viewport={{
            margin: "0px 0px 10px 0px",
          }}
          className={`${styles.asideFlow} lgHome:w-6/12 w-11/12 my-12 `}>
          <div className={`${styles.asideItem} flex relative justify-end my-4`}>
            <img
              src="icons/environment.svg"
              alt=""
              width="92"
              height="92"
              className={`${styles.asideItemImg} px-5 py-5 bg-lightBasicGreen rounded-full absolute left-12 top-0 bottom-0 my-auto`}
            />
            <div
              className={`bg-lightBiege text-center font-sans w-10/12 py-3 px-7 rounded-full`}>
              <h3 className={`font-bold text-lg`}>Environmental impact: </h3>
              <p className={`text-base py-2 px-8`}>
                Food waste contributes to greenhouse gas emissions and
                deforestation
              </p>
            </div>
          </div>
          <div className={`${styles.asideItem} flex relative justify-end my-4`}>
            <img
              src="icons/economic.svg"
              alt=""
              width="92"
              height="92"
              className={`${styles.asideItemImg} px-5 py-5 bg-lightBasicGreen rounded-full absolute left-12 top-0 bottom-0 my-auto`}
            />
            <div
              className={`bg-lightBiege text-center font-sans w-10/12  py-3 px-7  rounded-full`}>
              <h3 className={`font-bold text-lg`}>Economic loss: </h3>
              <p className={`text-base py-2 px-8`}>
                Wasting food means throwing away money spent on ingredients,
                labor, and energy
              </p>
            </div>
          </div>
          <div className={`${styles.asideItem} flex relative justify-end my-4`}>
            <img
              src="icons/socialimpact.svg"
              alt=""
              width="92"
              height="92"
              className={`${styles.asideItemImg} px-5 py-5 bg-lightBasicGreen rounded-full absolute left-12 top-0 bottom-0 my-auto`}
            />
            <div
              className={`bg-lightBiege text-center font-sans w-10/12  py-3 px-7  rounded-full `}>
              <h3 className={`font-bold text-lg`}>Social impact: </h3>
              <p className={`text-base py-2  px-8`}>
                Food waste contributes to global hunger and food insecurity in
                many parts of the world
              </p>
            </div>
          </div>
          <div className={`${styles.asideItem} flex relative justify-end my-4`}>
            <img
              src="icons/shield.svg"
              alt=""
              width="92"
              height="92"
              className={`${styles.asideItemImg} px-5 py-5 bg-lightBasicGreen rounded-full absolute left-12 top-0 bottom-0 my-auto`}
            />
            <div
              className={`bg-lightBiege text-center font-sans w-10/12  py-3 px-7  rounded-full`}>
              <h3 className={`font-bold text-lg`}>Regulatory challenges: </h3>
              <p className={`text-base py-2 px-8`}>
                Food waste can lead to increased regulatory scrutiny and
                potential fines for businesses
              </p>
            </div>
          </div>
        </motion.aside>
      </article>
    </section>
  );
}

export default HomeProblemsSec;
