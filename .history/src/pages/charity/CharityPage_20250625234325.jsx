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
import { Outlet, useLocation } from "react-router-dom";

const CharityPage = () => {
  const location = useLocation();
  return (
    <div className="relative">
      <HomeNav backgroundColor="bg-[#EEEADF]" />
      {location.pathname.startsWith("/CharityPage/cart") ||
      location.pathname.startsWith("/CharityPage/magicbags") ||
      location.pathname.startsWith("/CharityPage/vendor") ? (
        <Outlet />
      ) : (
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
      )}
    </div>
  );
};

export default CharityPage;
