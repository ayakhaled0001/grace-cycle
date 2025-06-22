import React, { useEffect } from "react";
import HomeNav from "../../components/homeCom/HomeNav";
import SearchBar from "../../components/charityCom/SearchBar";
import Slider from "../../components/charityCom/Slider";
import MainDishes from "../../components/charityCom/MainDishes";
import BakedGoods from "../../components/charityCom/BakedGoods";
import Drinks from "../../components/charityCom/Drinks";
import Dessert from "../../components/charityCom/Dessert";
import MagicBags from "../../components/charityCom/MagicBags";
import Footer from "../../components/homeCom/HomeFooter";
import Categories from "../../components/charityCom/Categories";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FoodResults from "../../components/charityCom/FoodResults";
import { clearFilteredFoods } from "../../redux/FoodFilterSlice";
import { fetchCategories } from "../../redux/CategoriesSlice";

const CharityPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { allFoods, isSearchActive } = useSelector((state) => state.foodFilter);

  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleClearSearch = () => {
    dispatch(clearFilteredFoods());
  };

  return (
    <div className="relative">
      <HomeNav backgroundColor="bg-[#EEEADF]" />
      {location.pathname.startsWith("/CharityPage/cart") ? (
        <Outlet />
      ) : (
        <div className="mt-6">
          <Slider />
          <Categories />
          <SearchBar />
          {isSearchActive && allFoods.length > 0 ? (
            <FoodResults onClear={handleClearSearch} />
          ) : (
            <>
              <MainDishes />
              <BakedGoods />
              <Drinks />
              <Dessert />
              <MagicBags />
              <Footer />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CharityPage;
