import HomeNav from "../../components/homeCom/HomeNav";
import AboutMainSec from "../../components/AboutCom/AboutMainSec";
import AboutWhatWeDo from "../../components/AboutCom/AboutWhatWeDo";
import AboutAmbitions from "../../components/AboutCom/AboutAmbitions";
function AboutUs() {
  return (
    <section className="bg-offWhite">
      <HomeNav />
      <AboutMainSec />
      <AboutWhatWeDo />
      <AboutAmbitions />
    </section>
  );
}

export default AboutUs;
