import HomeNav from "../../components/homeCom/HomeNav";
import styles from "./HomePage.module.css";
import HomeMainSec from "../../components/homeCom/HomeMainSec";
import { motion } from "motion";
function HomePage() {
  return (
    <div className={styles.mainSec}>
      <HomeNav styles={styles} />
      <HomeMainSec />
    </div>
  );
}

export default HomePage;
