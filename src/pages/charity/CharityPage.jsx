import React from 'react';
import HomeNav from '../../components/homeCom/HomeNav';
import SearchBar from '../../components/charityCom/SearchBar';
import Slider from "../../components/charityCom/Slider";


const CharityPage = () => {
    return (
        <>
        <HomeNav backgroundColor="bg-offWhite"/>
        <div className='mt-28'>

        <SearchBar/>
        <Slider/>
        </div>
        </>
    );
};

export default CharityPage;