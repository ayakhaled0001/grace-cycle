import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Link to="/signup">
        <span className="text-[#D57B21] underline cursor-pointer font-nunito">
          Signup
        </span>
      </Link>
    </>
  );
};

export default Home;
