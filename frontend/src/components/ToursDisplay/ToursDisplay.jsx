import React, { useContext, useState } from "react";
import "./toursDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import ToursItem from "../ToursItem/ToursItem";

function ToursDisplay({ location }) {
  const { tours_list, loading } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredToursList = tours_list.filter((item) => {
    const matchesLocation = location === "All" || location === item.location;
    const matchesSearchTerm =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLocation && matchesSearchTerm;
  });

  return (
    <>
      <h2 className="center-text">
        Menjelajahi Keunikan Wisata Kota Besar Indonesia
      </h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Cari Berdasarkan nama atau deskripsi wisata..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {loading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="tours-display" id="tours-display">
          <div className="tours-display-list">
            {filteredToursList.map((item, index) => (
              <ToursItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ToursDisplay;
