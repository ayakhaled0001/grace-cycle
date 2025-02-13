import HomeNav from "../../components/homeCom/HomeNav";
import styles from "./HomePage.module.css";
import { motion } from "motion";
function HomePage() {
  return (
    <div className={styles.mainSec}>
      <HomeNav styles={styles} />
    </div>
  );
}

export default HomePage;
