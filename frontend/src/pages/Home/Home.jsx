// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./home.css";
import Header from "../../components/Header/Header";
import ExploreTour from "../../components/ExploreTour/ExploreTour";
import TourDisplay from "../../components/ToursDisplay/ToursDisplay";
import ArticlesDisplay from "../../components/ArticlesDisplay/ArticlesDisplay";

function Home() {
  const [location, setLocation] = useState("All");
  return (
    <>
      <Header />
      <ExploreTour location={location} setLocation={setLocation} />
      <TourDisplay location={location} />
      <ArticlesDisplay />
    </>
  );
}

export default Home;
