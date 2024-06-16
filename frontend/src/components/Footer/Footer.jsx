// eslint-disable-next-line no-unused-vars
import React from "react";
import "./footer.css";
import { assets } from "../../assets/assets";
function Footer() {
  return (
    <>
      <div className="footer" id="contact-us">
        <div className="footer-content">
          <div className="footer-content-left">
            <img src={assets.logo} alt="logo" />
            <p>
              WanderWise adalah platform pemesanan tiket online yang menyediakan
              akses mudah untuk merencanakan perjalanan impian Anda. Temukan
              destinasi yang menakjubkan dan pesan tiket dengan mudah, semua
              dalam satu tempat.
            </p>
            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="fb" />
              <img src={assets.linkedin_icon} alt="ln" />
              <img src={assets.twitter_icon} alt="tw" />
            </div>
          </div>
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+62 1234 1234 123</li>
              <li>wanderwise@gmail.com</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">
          Copyright 2024 @ WanderWise.com - All Right Reserved.
        </p>
      </div>
    </>
  );
}

export default Footer;
