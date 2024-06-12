// components/Sidebar/Sidebar.jsx
import React from "react";
import "./sidebar.css";
import { FiPlus, FiList, FiShoppingCart, FiEdit, FiEdit3, FiMessageSquare, FiUsers } from "react-icons/fi"
import { NavLink } from "react-router-dom";

const links = [
  { to: "/add", icon: FiPlus, alt: "add", text: "Tambah Wisata" },
  { to: "/list", icon: FiList, alt: "order", text: "Daftar Wisata" },
  { to: "/orders", icon: FiShoppingCart, alt: "order", text: "Pesanan" },
  { to: "/articles/add", icon: FiEdit, alt: "order", text: "Tambah Artikel" },
  { to: "/articles/list", icon: FiEdit3, alt: "order", text: "Edit Artikel" },
  { to: "/admin/comments", icon: FiMessageSquare, alt: "comments", text: "List Komentar Artikel" },
  { to: "/admin/users", icon: FiUsers, alt: "comments", text: "List Pengguna" },
];

var colorList = [ "#01a9f2", "#6c514d", "#469de8", "#fe896b", "#937fc1", "#8186c2", "#78c8fa", "#de3067" ]

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        {links.map((link, index) => (
          <NavLink key={index} to={link.to} className="sidebar-option" style={{
            "--color": colorList[ index ]
          }}>
            {
              link.icon ? <link.icon color={colorList[ index ]} width={32} className="sidebar-icon" height={32} /> : null
            }
            <p>{link.text}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;