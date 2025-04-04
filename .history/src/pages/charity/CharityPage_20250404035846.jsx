import HomeNav from "../../components/homeCom/HomeNav";
import SearchBar from "../../components/charityCom/SearchBar";
import Slider from "../../components/charityCom/Slider";
import MainDishes from "../../components/charityCom/MainDishes";
const CharityPage = () => {
  return (
    <>
      <HomeNav backgroundColor="bg-offWhite" />
      <div className="mt-28">
        <SearchBar />
        <Slider />
        <MainDishes />
      </div>
    </>
  );
};

export default CharityPage;
