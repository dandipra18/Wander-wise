// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import "./myOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { DOMAIN } from "../../config";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

function MyOrders() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("Token");

  useEffect(() => {
    const socket = io(DOMAIN);

    socket.on("orderStatusUpdate", ({ orderId, status }) => {
      setData((prevData) =>
        prevData.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchData = async () => {
    const response = await axios.post(
      `${DOMAIN}/api/order/userorder`,
      {},
      { headers: { token } }
    );

    setData(response.data.data);
    if (!response.data.success) {
      toast.error(response.data.message);
    }
  };

  const handleCancelOrder = async (orderId) => {
    Swal.fire({
      title: "Konfirmasi Pembatalan",
      text: "Apakah Anda yakin ingin membatalkan pesanan ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, batalkan!",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.post(
          `${DOMAIN}/api/order/cancel`,
          { orderId },
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success(response.data.message);
          fetchData();
        } else {
          toast.error(response.data.message);
        }
      }
    });
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);
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
      {token ? (
        <>
          {data.length === 0 ? (
            <div className="my-order-signout">
              <img src={assets.my_order} alt="Empty Order History" />
              <p>Your Order history is empty.</p>
            </div>
          ) : (
            <div className="my-orders">
              <h2>Tiket saya</h2>
              <div className="container">
                {data.map((order, index) => (
                  <div key={index} className="my-orders-order">
                    <img src={assets.ticket_icon} alt="parcel" />
                    <p>
                      {order.items.map((item, idx) => (
                        <span key={idx}>
                          {item.name} x{item.quantity}
                          {idx < order.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                    <p>{formatRupiah(order.amount)}</p>
                    <p>Jumlah Tiket: {order.items.length}</p>
                    <p>
                      <span>&#x25cf;</span>
                      <b>{order.status}</b>
                    </p>
                    <div className="action-buttons">
                      {order.status === "Sudah Bayar" ? (
                        <img
                          src={assets.check_icon}
                          alt="Paid"
                          className="action-icon no-hover"
                          style={{ cursor: "default" }}
                        />
                      ) : (
                        <img
                          src={assets.delete_icon}
                          alt="Cancel"
                          className="action-icon cancel-icon"
                          onClick={() => handleCancelOrder(order._id)}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="my-order-signout">
          <img src={assets.my_order} alt="Please Sign In" />
          <p>Please Sign in to access your order history.</p>
        </div>
      )}
    </>
  );
}

export default MyOrders;
