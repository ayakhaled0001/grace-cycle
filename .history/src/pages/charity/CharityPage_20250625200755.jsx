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
      {location.pathname.startsWith("/CharityPage/cart") ? (
        <Outlet />
      ) : (
        <div className="mt-16 mob470:mt-20 mob560:mt-24 md:mt-28 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8">
          <div className="space-y-4 mob470:space-y-6 mob560:space-y-8 md:space-y-10 lg:space-y-12">
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
      )}
    </div>
  );
};

export default CharityPage;
