import { createContext, useContext, useState, useEffect } from "react";

const ServicesContext = createContext();
function ServicesProvider({ children }) {
  // main dishes
  const [isFav, setIsFav] = useState(false);
  const [mainDishes, setMainDishes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [bakedGoods, setBakedGoods] = useState([]);
  useEffect(function () {
    async function fetchFoods() {
      try {
        const res = await fetch(
          `https://gracecycleapi.azurewebsites.net/api/web/home/foods`
        );
        const data = await res.json();
        console.log(data["Main Dishes"]);
        setMainDishes(data["Main Dishes"]);
      } catch (error) {
        console.log("Error fetching foods ", error);
      }
    }
    fetchFoods();
    async function fetchDrinks() {
      try {
        const res = await fetch(
          `https://gracecycleapi.azurewebsites.net/api/web/home/foods`
        );
        const data = await res.json();
        console.log(data["Drinks"]);
        setDrinks(data["Drinks"]);
      } catch (error) {
        console.log("Error fetching foods ", error);
      }
    }
    fetchDrinks();
    async function fetchBakedGoods() {
      try {
        const res = await fetch(
          `https://gracecycleapi.azurewebsites.net/api/web/home/foods`
        );
        const data = await res.json();
        console.log(data["Baked goods"]);
        setBakedGoods(data["Baked goods"]);
      } catch (error) {
        console.log("Error fetching foods ", error);
      }
    }
    fetchBakedGoods();
  }, []);

  const [isFav, setIsFav] = useState(false);
  const [dessert, setDessert] = useState([]);
  useEffect(function () {
    async function fetchDesserts() {
      try {
        const res = await fetch(
          `https://gracecycleapi.azurewebsites.net/api/web/home/foods`
        );
        const data = await res.json();
        console.log(data["Dessert"]);
        setDessert(data["Dessert"]);
      } catch (error) {
        console.log("Error fetching foods ", error);
      }
    }
    fetchDesserts();
  }, []);

  return (
    <ServicesContext.Provider
      value={{
        mainDishes,
        isFav,
        setIsFav,
        drinks,
        setDrinks,
        bakedGoods,
      }}>
      {children}
    </ServicesContext.Provider>
  );
}

function useServices() {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be within the ServicesProvider");
  }
  return context;
}
export { ServicesProvider, useServices };
