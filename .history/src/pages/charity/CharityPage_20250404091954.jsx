import HomeNav from "../../components/homeCom/HomeNav";
import SearchBar from "../../components/charityCom/SearchBar";
import Slider from "../../components/charityCom/Slider";
import MainDishes from "../../components/charityCom/MainDishes";
import BakedGoods from "../../components/charityCom/BakedGoods";
import Dessert from "../../components/charityCom/Dessert";
import Drinks from "../../components/charityCom/Drinks";
const CharityPage = () => {
  return (
    <>
      <HomeNav backgroundColor="bg-offWhite" />
      <div className="mt-28">
        <SearchBar />
        <Slider />
        <MainDishes />
        <BakedGoods />
        <Dessert />
        <Drinks />
      </div>
    </>
  );
};

export default CharityPage;
