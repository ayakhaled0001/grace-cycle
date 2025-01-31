import HomeNav from "../../components/homeCom/HomeNav";
import styles from "./HomePage.module.css";
function HomePage() {
  return (
    <div className={styles.mainSec}>
      <HomeNav styles={styles} />
    </div>
  );
}

export default HomePage;
