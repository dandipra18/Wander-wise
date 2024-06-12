import React, { useContext } from "react";
import "./ticket.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { DOMAIN } from "../../config";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // Import ikon silang

function Ticket() {
  const { ticketItems, tours_list, removeFromTicket, getTotalTicketAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const handleRemoveFromTicket = (itemId) => {
    Swal.fire({
      title: "Konfirmasi Penghapusan",
      text: "Apakah Anda yakin ingin menghapus item ini dari tiket?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromTicket(itemId);
        Swal.fire("Dihapus!", "Item telah dihapus dari tiket.", "success");
      }
    });
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
      {getTotalTicketAmount() > 0 ? (
        <>
          <div className="ticket">
            <div className="ticket-items">
              <div className="ticket-items-title">
                <p>Items</p>
                <p>Nama wisata</p>
                <p>Harga</p>
                <p>Jumlah</p>
                <p>Total</p>
                <p>Batal</p>
              </div>
              <br />
              <hr />
              {tours_list.map((item, index) => {
                if (ticketItems[item._id] > 0) {
                  return (
                    <div key={index}>
                      <div className="ticket-items-title ticket-items-item">
                        <img
                          src={`${DOMAIN}/images/${item.image}`}
                          alt="product"
                        />
                        <p>{item.name}</p>
                        <p>{formatRupiah(item.price)}</p>
                        <p>{ticketItems[item._id]}</p>
                        <p>
                          Rp.{formatRupiah(item.price * ticketItems[item._id])}
                        </p>
                        <FontAwesomeIcon
                          icon={faTimes}
                          onClick={() => handleRemoveFromTicket(item._id)}
                          className="cross"
                        />
                      </div>
                      <hr />
                    </div>
                  );
                }
              })}
            </div>
            <div className="ticket-bottom">
              <div className="ticket-total">
                <h2>Total</h2>
                <div>
                  <div className="ticket-total-details">
                    <p>Subtotal</p>
                    <p>Rp.{getTotalTicketAmount()}</p>
                  </div>
                  <hr />
                </div>
                <button onClick={() => navigate("/order")}>Pesan</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="empty-ticket">
            <img src={assets.empty_cart} alt="" />
            <h2>Pesanan Anda kosong.</h2>
            <p>
              Sepertinya Anda belum menambahkan apa pun ke keranjang Anda.
              Silakan dan jelajahi kategori teratas.
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default Ticket;
