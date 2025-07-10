import React from "react";

const MyListings = () => {
  return (
    <div>
      <header>
        <h1>Your Listings</h1>
        <div>
          <button>Products</button>
          <button>Bags</button>
        </div>
      </header>
      <div>
        <span>Product</span>
        <span>name</span>
        <span> Quantity</span>
        <span>Price before</span>
        <span>Price After</span>
      </div>
    </div>
  );
};

export default MyListings;
