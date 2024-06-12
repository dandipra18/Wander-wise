// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./list.css";
import { DOMAIN } from "../../config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { assets } from "../../assets/assets";

function List() {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${DOMAIN}/api/tours/list`);
    if (response.data.success) {
      setList(response.data.data);
      console.log(response.data);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const formatRupiah = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="list add flex-col">
      <h1 className="header">Daftar Wisata</h1>
      <div className="table-container">
        <table className="list-table">
          <thead>
            <tr className="list-table-format title">
              <th className="image-container">Gambar</th>
              <th className="name-field">Nama</th>
              <th>Lokasi</th>
              <th>Harga</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr className="list-table-format" key={index}>
                <td className="image-container">
                  <img className="tour-image" src={`${DOMAIN}/images/` + item.image} alt={item.name} />
                </td>
                <td className="name-field">{item.name}</td>
                <td>{item.location}</td>
                <td>{formatRupiah(item.price)}</td>
                <td className="action-button">
                  <Link to={`/update/${item._id}`}>
                    <p className="cursor-pointer">
                      <img src={assets.edit_icon} className="edit-icon" alt="edit" />
                    </p>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
