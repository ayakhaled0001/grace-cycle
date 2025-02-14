import HomeNav from "../../components/homeCom/HomeNav";
import styles from "./HomePage.module.css";
import HomeMainSec from "../../components/homeCom/HomeMainSec";
import HomeProblemsSec from "../../components/homeCom/HomeProblemsSec";
import HomeProvidingSec from "../../components/homeCom/HomeProvidingSec";
import HomeSteps from "../../components/homeCom/HomeSteps";
function HomePage() {
  return (
    <div className="bg-offwhite">
      <div className={styles.mainSec}>
        <HomeNav styles={styles} />
        <HomeMainSec />
      </div>
      <HomeProblemsSec />
      <HomeProvidingSec />
      <HomeSteps />
    </div>
  );
}

export default HomePage;
