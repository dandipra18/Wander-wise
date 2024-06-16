import React from "react";
import "./manualPayment.css";
import { assets } from "../../assets/assets";
function ManualPayment() {
  return (
    <div className="manual-payment">
      <h2>Informasi Pembayaran</h2>
      <img src={assets.payment} alt="payment" />
      <p>Silakan lakukan pembayaran ke rekening berikut:</p>
      <p>
        Bank: BCA
        <br />
        Nomor Rekening: 1234567890
        <br />
        Atas Nama: Wanderwise
      </p>
      <p>Kirim bukti pembayaran ke nomor WhatsApp berikut:</p>
      <p>WhatsApp: 081234567890</p>
      <hr />
      <button onClick={() => (window.location.href = "/myorders")}>
        Kembali ke Pesanan Saya
      </button>
    </div>
  );
}

export default ManualPayment;
