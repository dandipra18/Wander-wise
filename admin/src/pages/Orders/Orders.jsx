import React, { useState, useEffect } from "react";
import "./orders.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { DOMAIN } from "../../config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${DOMAIN}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    const newStatus = e.target.value;
    if (newStatus === "Sudah Bayar") {
      Swal.fire({
        title: "Konfirmasi",
        text: "Apakah Anda yakin bahwa pesanan ini sudah dibayar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, sudah dibayar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.post(`${DOMAIN}/api/order/update`, {
            orderId,
            status: newStatus,
          });
          if (response.data.success) {
            await fetchAllOrders();
            Swal.fire(
              "Terkonfirmasi!",
              "Status pesanan telah diperbarui.",
              "success"
            );
          } else {
            toast.error(response.data.message);
          }
        }
      });
    } else {
      const response = await axios.post(`${DOMAIN}/api/order/update`, {
        orderId,
        status: newStatus,
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Belum Bayar":
        return "belum-bayar";
      case "Sudah Bayar":
        return "sudah-bayar";
      default:
        return "";
    }
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
      <div className="order add">
        <h3>Halaman Pesanan Tiket</h3>
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.ticket_icon} alt="tiket" />
              <div>
                <p className="order-item-tours">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>{formatRupiah(order.amount)}</p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className={`order-item-status ${getStatusClass(order.status)}`}
              >
                <option value="Belum Bayar">Belum Bayar</option>
                <option value="Sudah Bayar">Sudah Bayar</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Orders;
