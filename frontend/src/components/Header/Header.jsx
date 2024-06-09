// eslint-disable-next-line no-unused-vars
import React from "react";
import "./header.css";
import video from "./pantai.mp4";
function Header() {
  return (
    <>
      <div className="header">
        <video autoPlay muted loop className="background-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="header-content">
          <h1>Temukan dan nikmati destinasi favorit Anda bersama kami.</h1>
          <p>
            Temukan pengalaman luar biasa yang telah kami siapkan untuk Anda.
            Dari keindahan yang memukau hingga layanan tanpa cela, kami
            berkomitmen untuk memberikan yang terbaik. Bergabunglah dengan kami
            dalam petualangan yang tak terlupakan dan biarkan kami memanjakan
            Anda dengan kemewahan dan kenyamanan.
          </p>
          <a href="#explore-tour">
            <button>Lihat Wisata &nbsp; &rarr;</button>
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;
