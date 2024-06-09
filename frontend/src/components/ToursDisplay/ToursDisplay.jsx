// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import "./toursDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import ToursItem from "../ToursItem/ToursItem";

// eslint-disable-next-line react/prop-types
function ToursDisplay({ location }) {
  const { tours_list, loading } = useContext(StoreContext);
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearchChange = (e) => {
    setSearchLocation(e.target.value);
  };

  const filteredToursList = tours_list.filter((item) => {
    if (location === "All" || location === item.location) {
      if (searchLocation === "") {
        return true;
      } else {
        return item.location
          .toLowerCase()
          .includes(searchLocation.toLowerCase());
      }
    }
    return false;
  });

  return (
    <>
      <h2 className="center-text">
        Menjelajahi Keunikan Wisata Kota Besar Indonesia
      </h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Cari Berdasarkan kota wisata..."
          value={searchLocation}
          onChange={handleSearchChange}
        />
      </div>
      {loading ? (
        <>
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </>
  );
}

export default ToursDisplay;
