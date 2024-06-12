// eslint-disable-next-line no-unused-vars
import React from "react";
import "./exploreTour.css";
import { tour_list } from "../../assets/assets";
// eslint-disable-next-line react/prop-types
function ExploreTour({ location, setLocation }) {
  return (
    <>
      <div className="explore-tour" id="explore-tour">
        <h1>Jelajahi berbagai destinasi wisata</h1>
        <p className="explore-tour-text">
          Telah kami pilih khusus untuk Anda. Dari pantai yang memukau hingga
          pegunungan yang menakjubkan, setiap lokasi menawarkan pengalaman unik
          yang tak terlupakan. Mulailah petualangan Anda bersama kami dan
          temukan keindahan dunia yang sesungguhnya.
        </p>
        <div className="explore-tour-list">
          {tour_list.map((item, index) => (
            <div
              onClick={() =>
                setLocation((prev) =>
                  prev === item.tour_name ? "All" : item.tour_name
                )
              }
              key={index}
              className="explore-tour-list-item"
            >
              <img
                className={location === item.tour_name ? "active" : ""}
                src={item.tour_image}
                alt="tour_image"
              />
              <p>{item.tour_name}</p>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </>
  );
}

export default ExploreTour;
