// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./update.css";
import axios from "axios";
import { DOMAIN } from "../../config";
import { toast } from "react-toastify";
import CurrencyInput from "react-currency-input-field";
import Swal from "sweetalert2";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [isAvailable, setIsAvailable] = useState(true);
  const [data, setData] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
    location: "",
  });

  const fetchToursData = async () => {
    const response = await axios.get(`${DOMAIN}/api/tours/getTourById/${id}`);
    if (response.data.success) {
      setData({
        image: response.data.data.image,
        name: response.data.data.name,
        description: response.data.data.description,
        price: response.data.data.price,
        location: response.data.data.location,
      });
    } else {
      console.log("data:-" + response.data.message);
    }
  };

  useEffect(() => {
    fetchToursData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-unused-vars
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onPriceChange = (value) => {
    setData((prevData) => ({ ...prevData, price: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Konfirmasi Pembaruan",
      text: "Apakah Anda yakin ingin memperbarui data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, perbarui!",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.patch(
          `${DOMAIN}/api/tours/update/available/${id}`,
          {
            price: data.price.replace(/,/g, ""),
            available: data.available,
          }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/list");
        } else {
          toast.error(response.data.message);
        }
      }
    });
  };

  const removeHandler = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Konfirmasi Penghapusan",
      text: "Apakah Anda yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.post(`${DOMAIN}/api/tours/remove`, {
          id: id,
        });
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/list");
        } else {
          toast.error(response.data.message);
        }
      }
    });
  };

  return (
    <>
      <div className="add">
        <form className="flex-col" onSubmit={onSubmitHandler}>
          <div className="add-image-upload flex-col">
            <img src={`${DOMAIN}/images/${data.image}`} alt="upload image" />
          </div>
          <div className="add-touris-name flex-col">
            <p>Nama Wisata *</p>
            <input type="text" value={data.name} readOnly disabled />
          </div>
          <div className="add-touris-desc flex-col">
            <p>Deskripsi wisata *</p>
            <textarea
              readOnly
              disabled
              value={data.description}
              rows="6"
              placeholder="Write content here..."
            />
          </div>
          <div className="add-location-price">
            <div className="add-location flex-col">
              <p>Lokasi wisata *</p>
              <select value={data.location} readOnly disabled>
                <option value="">- Select a category -</option>
                <option value="Bali">Bali</option>
                <option value="Medan">Medan</option>
                <option value="Aceh">Aceh</option>
                <option value="Padang">Padang</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Harga Tiket *</p>
              <CurrencyInput
                id="price-input"
                name="price"
                placeholder="Rp.25.000"
                defaultValue={data.price}
                decimalsLimit={2}
                prefix="Rp "
                onValueChange={(value) => onPriceChange(value)}
                className="price-input"
              />
            </div>
          </div>

          <div className="update-remove">
            <button type="submit" className="add-btn">
              Update
            </button>
            <button onClick={removeHandler} className="add-btn">
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Update;
