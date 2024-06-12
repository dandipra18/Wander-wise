import React, { useContext, useEffect, useState } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { DOMAIN } from "../../config";
import { toast } from "react-toastify";
import axios from "axios";

function PlaceOrder() {
  const { getTotalTicketAmount, token, tours_list, ticketItems, clearTicket } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    tours_list.forEach((item) => {
      if (ticketItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: ticketItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalTicketAmount(),
    };

    try {
      let response = await axios.post(
        `${DOMAIN}/api/order/placeorder`,
        orderData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        clearTicket();
        navigate("/manual-payment");
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error placing order. Please try again later.");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      toast.warn("Please login to continue.");
      navigate("/ticket");
    }
  }, [token, navigate]);

  return (
    <>
      {getTotalTicketAmount() > 0 ? (
        <>
          <form className="place-order" onSubmit={placeOrder}>
            <div className="place-order-left">
              <p className="title">Informasi Pemesan</p>
              <div className="multi-fields">
                <input
                  required
                  name="firstName"
                  onChange={onChangeHandler}
                  value={data.firstName}
                  type="text"
                  placeholder="First Name"
                />
                <input
                  required
                  name="lastName"
                  onChange={onChangeHandler}
                  value={data.lastName}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <input
                required
                name="email"
                onChange={onChangeHandler}
                value={localStorage.getItem("Email")}
                type="email"
                placeholder="Email Address"
              />
              <input
                required
                name="phone"
                onChange={onChangeHandler}
                value={data.phone}
                type="number"
                placeholder="Phone Number"
              />
            </div>
            <div className="place-order-right">
              <div className="ticket-total">
                <h2>Total</h2>
                <div>
                  <div className="ticket-total-details">
                    <p>Subtotal</p>
                    <p>Rp.{getTotalTicketAmount()}</p>
                  </div>
                  <hr />
                </div>
                <button type="submit">Lanjut Pembayaran</button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="empty-ticket">
            <img src={assets.empty_cart} alt="empty ticket" />
            <h2>Your ticket is Empty.</h2>
            <p>
              Looks like you have not added anything to your ticket. Go ahead
              and explore top categories.
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default PlaceOrder;
