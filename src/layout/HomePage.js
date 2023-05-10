import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
const HomePage = () => {
  return (
    <div>
      <img className="logo" src="./logo.svg" alt="teknolojik yemekler" />
      <p>KOD ACIKTIRIR</p>
      <p>PİZZA DOYURUR</p>
      <Link id="order-pizza" to="/pizza">
        <button>ACIKTIM</button>
      </Link>
    </div>
  );
};
export default HomePage;
