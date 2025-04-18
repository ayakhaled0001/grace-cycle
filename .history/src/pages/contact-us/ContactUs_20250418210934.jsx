import Contact from "../../components/contactCom/Contact";
import HomeNav from "../../components/homeCom/HomeNav";
import HomeFooter from "../../components/homeCom/HomeFooter";

const ContactUs = () => {
  return (
    <div className="relative">
      <HomeNav backgroundColor="bg-offWhite" />
      <Contact />
      <HomeFooter />
    </div>
  );
};

export default ContactUs;
