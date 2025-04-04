import HomeNav from "../../components/homeCom/HomeNav";
import SearchBar from "../../components/charityCom/SearchBar";
import Slider from "../../components/charityCom/Slider";
import MainDishes from "../../components/charityCom/MainDishes";
import BakedGoods from "../../components/charityCom/BakedGoods";
const CharityPage = () => {
  return (
    <>
      <HomeNav backgroundColor="bg-offWhite" />
      <div className="mt-28">
        <SearchBar />
        <Slider />
        <MainDishes />
        <BakedGoods />
      </div>
    </>
  );
};

export default CharityPage;
