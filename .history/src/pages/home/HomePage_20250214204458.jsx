import HomeNav from "../../components/homeCom/HomeNav";
import styles from "./HomePage.module.css";
import HomeMainSec from "../../components/homeCom/HomeMainSec";
import HomeProblemsSec from "../../components/homeCom/HomeProblemsSec";
import HomeProvidingSec from "../../components/homeCom/HomeProvidingSec";
import HomeSteps from "../../components/homeCom/HomeSteps";
import HomeAccordion from "../../components/homeCom/HomeAccordion";
import HomeReview from "../../components/homeCom/HomeReview";
import HomeFooter from "../../components/homeCom/HomeFooter";
function HomePage() {
  return (
    <div className="bg-offWhite">
      <div className={styles.mainSec}>
        <HomeNav styles={styles} />
        <HomeMainSec />
      </div>
      <HomeProblemsSec />
      <HomeProvidingSec />
      <HomeSteps />
      <HomeReview />
      <HomeAccordion />

      <HomeFooter />
    </div>
  );
}

export default HomePage;
