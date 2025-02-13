import HomeNav from "../../components/homeCom/HomeNav";
import styles from "./HomePage.module.css";
import HomeMainSec from "../../components/homeCom/HomeMainSec";
import HomeProblemsSec from "../../components/homeCom/HomeProblemsSec";
function HomePage() {
  return (
    <div className={styles.mainSec}>
      <HomeNav styles={styles} />
      <HomeMainSec />
      <HomeProblemsSec />
    </div>
  );
}

export default HomePage;
