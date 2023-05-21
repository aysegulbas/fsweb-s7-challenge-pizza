import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
const HomePage = () => {
  return (
    <div className="home-container">
      <img className="logo" src="./logo.svg" alt="teknolojik yemekler" />
      <p>KOD ACIKTIRIR</p>
      <p>PİZZA DOYURUR</p>

      <Link id="order-pizza" to="/pizza">
        <button className="order-btn">ACIKTIM</button>
      </Link>
      <img src="./mvp-banner.png" alt="pizza" />
    </div>
  );
};
export default HomePage;
