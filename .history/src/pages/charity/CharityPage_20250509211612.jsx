import HomeNav from "../../components/homeCom/HomeNav";
import SearchBar from "../../components/charityCom/SearchBar";
import Slider from "../../components/charityCom/Slider";
import MainDishes from "../../components/charityCom/MainDishes";
// import BakedGoods from "../../components/charityCom/BakedGoods";
// import Dessert from "../../components/charityCom/Dessert";
// import Drinks from "../../components/charityCom/Drinks";
// import BagsVideo from "../../components/charityCom/BagsVideo";
// import MagicBags from "../../components/charityCom/MagicBags";
import Footer from "../../components/homeCom/HomeFooter";
import Categories from "../../components/charityCom/Categories";
import { Provider } from "react-redux";
import { store } from "../../redux/Store";
const CharityPage = () => {
  return (
    <Provider store={store}>
      <div className="relative">
        <HomeNav backgroundColor="bg-offWhite" />
        <div className="mt-28">
          <SearchBar />
          <Slider />
          <Categories />
          <MainDishes />
          {/* <BakedGoods />
          <Dessert />
          <Drinks />
          <BagsVideo />
          <MagicBags /> */}
          <Footer />
        </div>
      </div>
    </Provider>
  );
};

export default CharityPage;
