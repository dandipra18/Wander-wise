import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { DOMAIN } from "../../config";
import "./toursDetail.css";

function ToursDetail() {
  const { id } = useParams();
  const { tours_list, addToTicket, ticketItems } = useContext(StoreContext);
  const [toursItem, setToursItem] = useState(null);

  useEffect(() => {
    const item = tours_list.find((tours) => tours._id === id);
    setToursItem(item);
  }, [id, tours_list]);

  if (!toursItem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tours-detail">
      <img src={`${DOMAIN}/images/${toursItem.image}`} alt={toursItem.name} />
      <h2>{toursItem.name}</h2>
      <p>{toursItem.description}</p>
      <p>Price: Rp.{toursItem.price}</p>
      <button onClick={() => addToTicket(toursItem._id)}>
        Add to Ticket{" "}
        {ticketItems[toursItem._id] ? `(${ticketItems[toursItem._id]})` : ""}
      </button>
    </div>
  );
}

export default ToursDetail;
