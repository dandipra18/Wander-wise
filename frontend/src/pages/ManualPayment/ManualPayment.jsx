// eslint-disable-next-line no-unused-vars
import React from "react";
import "./manualPayment.css";

function ManualPayment() {
  return (
    <div className="manual-payment">
      <h2>Informasi Pembayaran Manual</h2>
      <p>Silakan lakukan pembayaran ke rekening berikut:</p>
      <p>
        Bank: ABC Bank
        <br />
        Nomor Rekening: 1234567890
        <br />
        Atas Nama: John Doe
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
