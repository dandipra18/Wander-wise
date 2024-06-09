// components/Sidebar/Sidebar.jsx
// Updated to include the comments list link
import React from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-options">
          <NavLink to={"/add"} className="sidebar-option">
            <img src={assets.add_icon} alt="add" />
            <p>Tambah Wisata</p>
          </NavLink>
          <NavLink to={"/list"} className="sidebar-option">
            <img src={assets.list_icon} alt="order" />
            <p>Daftar Wisata</p>
          </NavLink>
          <NavLink to={"/orders"} className="sidebar-option">
            <img src={assets.checklist_icon} alt="order" />
            <p>Pesanan</p>
          </NavLink>
          <NavLink to="/articles/add" className="sidebar-option">
            <img src={assets.Article_icon} alt="order" />
            <p>Tambah Artikel</p>
          </NavLink>
          <NavLink to="/articles/list" className="sidebar-option">
            <img src={assets.checklist_icon} alt="order" />
            <p>Edit Artikel</p>
          </NavLink>
          <NavLink to="/admin/comments" className="sidebar-option">
            <img src={assets.comments_icon} alt="comments" />
            <p>List Komentar Artikel</p>
          </NavLink>
          <NavLink to="/admin/users" className="sidebar-option">
            <img src={assets.comments_icon} alt="comments" />
            <p>List Pengguna</p>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
