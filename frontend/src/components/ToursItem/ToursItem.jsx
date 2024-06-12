// eslint-disable-next-line no-unused-vars
import React from "react";
import "./toursItem.css";
import { useNavigate } from "react-router-dom";
import { DOMAIN } from "../../config";
import { assets } from "../../assets/assets";

// eslint-disable-next-line react/prop-types
function ToursItem({ id, name, price, description, image }) {
  const navigate = useNavigate();

  const goToDetailPage = () => {
    navigate(`/tours/${id}`);
  };

  const formatRupiah = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <>
      <div className="tours-item" onClick={goToDetailPage}>
        <div className="tours-item-img-container">
          <img
            className="tours-item-image"
            src={`${DOMAIN}/images/${image}`}
            alt={name}
          />
        </div>
        <div className="tours-item-info">
          <div className="tours-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="rating" />
          </div>
          <p className="tours-item-desc">
            {description.length > 50
              ? // eslint-disable-next-line react/prop-types
                description.substring(0, 50) + "..."
              : description}
          </p>
          <p className="tours-item-price">{formatRupiah(price)}</p>
        </div>
      </div>
    </>
  );
}

export default ToursItem;
