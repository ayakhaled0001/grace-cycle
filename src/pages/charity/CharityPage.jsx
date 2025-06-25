import React, { useEffect, useState } from "react";
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
import VendorResults from "../../components/charityCom/VendorResults";
import { clearFilteredFoods } from "../../redux/FoodFilterSlice";
import { clearFilteredVendors } from "../../redux/VendorFilterSlice";
import { fetchCategories } from "../../redux/CategoriesSlice";
import { fetchVendorCategories } from "../../redux/VendorCategoriesSlice";
import { setBagsPage, fetchAllBags } from "../../redux/BagsSlice";

const CharityPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [currentSearchType, setCurrentSearchType] = useState("All");
  const [bagIsSearchActive, setBagIsSearchActive] = useState(false);

  const { allFoods, isSearchActive } = useSelector((state) => state.foodFilter);
  const { allVendors, isSearchActive: vendorIsSearchActive } = useSelector(
    (state) => state.vendorFilter
  );

  const {
    bags,
    totalCount: bagsTotalCount,
    currentPage: bagsCurrentPage,
    pageSize: bagsPageSize,
    loading: bagsLoading,
    error: bagsError,
  } = useSelector((state) => state.bags);

  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchVendorCategories());
  }, [dispatch]);

  const handleClearSearch = () => {
    if (currentSearchType === "Vendor") {
      dispatch(clearFilteredVendors());
    } else {
      dispatch(clearFilteredFoods());
    }
  };

  const handleSearchTypeChange = (searchType) => {
    setCurrentSearchType(searchType);
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
          <SearchBar
            onSearchTypeChange={handleSearchTypeChange}
            setBagIsSearchActive={setBagIsSearchActive}
          />
          {currentSearchType === "Bag" && bagIsSearchActive ? (
            <>
              <MagicBags bags={bags} loading={bagsLoading} error={bagsError} />
              {bagsTotalCount > bagsPageSize && (
                <div className="flex justify-center items-center mt-6 gap-2">
                  {[...Array(Math.ceil(bagsTotalCount / bagsPageSize))].map(
                    (_, index) => {
                      const page = index + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => {
                            dispatch(setBagsPage(page));
                            dispatch(
                              fetchAllBags({
                                pageIndex: page,
                                pageSize: bagsPageSize,
                              })
                            );
                          }}
                          className={`px-3 py-2 border rounded-md ${
                            bagsCurrentPage === page
                              ? "bg-btnsGreen text-white border-btnsGreen"
                              : "border-lightGrey hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                  )}
                </div>
              )}
            </>
          ) : currentSearchType === "Vendor" && vendorIsSearchActive ? (
            <VendorResults onClear={handleClearSearch} />
          ) : currentSearchType === "Food" && isSearchActive ? (
            <FoodResults onClear={handleClearSearch} />
          ) : (
            <>
              <MainDishes />
              <BakedGoods />
              <Drinks />
              <Dessert />
              <MagicBags />
            </>
          )}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default CharityPage;
