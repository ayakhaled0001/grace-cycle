import HomeNav from "../../components/homeCom/HomeNav";
import AboutMainSec from "../../components/AboutCom/AboutMainSec";
import AboutWhatWeDo from "../../components/AboutCom/AboutWhatWeDo";
import AboutAmbitions from "../../components/AboutCom/AboutAmbitions";
import HomeFooter from "../../components/homeCom/HomeFooter";
function AboutUs() {
  return (
    <section className="bg-offWhite relative">
      <HomeNav backgroundColor="bg-offWhite" />
      <AboutMainSec />
      <AboutWhatWeDo />
      <AboutAmbitions />
      <HomeFooter />
    </section>
  );
}

export default AboutUs;
