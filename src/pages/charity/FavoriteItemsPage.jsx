import React from "react";
import HomeNav from "../../components/homeCom/HomeNav";
import SearchBar from "../../components/charityCom/SearchBar";
import FavoriteItems from "../../components/charityCom/FavoriteItems";
import Footer from "../../components/homeCom/HomeFooter";

function FavoriteItemsPage() {
  return (
    <div className="relative bg-offWhite">
      <HomeNav backgroundColor="bg-[#EEEADF]" />
      <div className="mt-6">
        {/* <SearchBar /> */}
        <div className="w-full px-2 md:px-4 py-4 md:py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-8 font-nunitoBold">
            My Favorite Foods
          </h1>
          <FavoriteItems />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default FavoriteItemsPage;
