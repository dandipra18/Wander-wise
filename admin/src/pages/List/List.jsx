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

  return (
    <>
      <div className="list add flex-col">
        <p>Daftar Wisata</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Gambar</b>
            <b>Nama</b>
            <b>Lokasi</b>
            <b>Harga</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => {
            return (
              <div className="list-table-format" key={index}>
                <img
                  className="tour-image"
                  src={`${DOMAIN}/images/` + item.image}
                  alt={item.name}
                />
                <p>{item.name}</p>
                <p>{item.location}</p>
                <p>Rp.{item.price}</p>
                <Link to={`/update/${item._id}`}>
                  <p className="cursor-pointer">
                    <img src={assets.edit_icon} className="edit-icon" />
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default List;
