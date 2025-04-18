import HomeNav from "../../components/homeCom/HomeNav";
import SearchBar from "../../components/charityCom/SearchBar";
import Slider from "../../components/charityCom/Slider";
import MainDishes from "../../components/charityCom/MainDishes";
import BakedGoods from "../../components/charityCom/BakedGoods";
import Dessert from "../../components/charityCom/Dessert";
import Drinks from "../../components/charityCom/Drinks";
import BagsVideo from "../../components/charityCom/BagsVideo";
import MagicBags from "../../components/charityCom/MagicBags";
import Footer from "../../components/homeCom/HomeFooter";
import Categories from "../../components/charityCom/Categories";
const CharityPage = () => {
  return (
    <div>
      <HomeNav backgroundColor="bg-offWhite" />
      <div className="mt-28">
        <SearchBar />
        <Slider />
        <Categories />
        <MainDishes />
        <BakedGoods />
        <Dessert />
        <Drinks />
        <BagsVideo />
        <MagicBags />
        <Footer />
      </div>
    </div>
  );
};

export default CharityPage;
