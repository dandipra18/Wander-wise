import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import "./add.css";
import { assets } from "../../assets/assets";
import { DOMAIN } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";

function Add() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    location: "", // Ensure location is part of the state
  });

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

    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price.replace(/,/g, "")));
    formData.append("location", data.location); // Add location to the form data
    formData.append("image", image);
    const response = await axios.post(`${DOMAIN}/api/tours/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        location: "", // Reset location field
      });
      setImage(null);

      setLoading(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="form-left">
          <div className="add-tour-name flex-col">
            <p>Nama Wisata *</p>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              required
              name="name"
              placeholder="Type here"
            />
          </div>
          <div className="add-tour-desc flex-col">
            <p>Deskripsi Wisata *</p>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              required
              name="description"
              rows="6"
              placeholder="Write content here..."
            />
          </div>
          <div className="add-tour-price">
            <div className="add-location flex-col">
              <p>Lokasi Wisata *</p>
              <select
                name="location"
                onChange={onChangeHandler}
                value={data.location}
              >
                <option value="">- Pilih Lokasi Wisata -</option>
                <option value="Aceh">Aceh</option>
                <option value="Sumatera Utara">Sumatera Utara</option>
                <option value="Sumatera Selatan">Sumatera Selatan</option>
                <option value="Bali">Bali</option>
                <option value="Sumatera Barat">Sumatera Barat</option>
                <option value="Bengkulu">Bengkulu</option>
                <option value="Riau">Riau</option>
                <option value="Kepulauan Riau">Kepulauan Riau</option>
                <option value="Jambi">Jambi</option>
                <option value="Lampung">Lampung</option>
                <option value="Bangka Belitung">Bangka Belitung</option>
                <option value="Kalimantan Barat">Kalimantan Barat</option>
                <option value="Kalimantan Timur">Kalimantan Timur</option>
                <option value="Kalimantan Selatan">Kalimantan Selatan</option>
                <option value="Kalimantan Utara">Kalimantan Utara</option>
                <option value="Banten ">Banten</option>
                <option value="DKI Jakarta ">DKI Jakarta </option>
                <option value="Jawa Barat">Jawa Barat</option>
                <option value="Jawa Tengah">Jawa Tengah</option>
                <option value="Daerah Istimewa Yogyakarta">
                  Daerah Istimewa Yogyakarta
                </option>
                <option value="Jawa Timur">Jawa Timur</option>
                <option value="Nusa Tenggara Timur">Nusa Tenggara Timur</option>
                <option value="Nusa Tenggara Barat">Nusa Tenggara Barat</option>
                <option value="Gorontalo">Gorontalo </option>
                <option value="Sulawesi Barat">Sulawesi Barat</option>
                <option value="Sulawesi Tengah">Sulawesi Tengah</option>
                <option value="Sulawesi Utara">Sulawesi Utara</option>
                <option value="Sulawesi Tenggara">Sulawesi Tenggara</option>
                <option value="Sulawesi Selatan">Sulawesi Selatan</option>
                <option value="Maluku Utara">Maluku Utara</option>
                <option value="Maluku">Maluku</option>
                <option value="Papua Barat">Papua Barat </option>
                <option value="Papua">Papua</option>
                <option value="Papua Tengah">Papua Tengah</option>
                <option value="Papua Pegunungan">Papua Pegunungan </option>
                <option value="Papua Selatan">Papua Selatan </option>
                <option value="Papua Barat Daya">Papua Barat Daya</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-right">
          <div className="add-image-upload flex-col">
            <p>Upload Gambar *</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="upload image"
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              required
              hidden
            />
          </div>
          <div className="add-price flex-col">
            <p>Harga Tiket *</p>
            <CurrencyInput
              id="price-input"
              name="price"
              placeholder="Rp.25.000"
              defaultValue={0}
              decimalsLimit={2}
              prefix="Rp "
              onValueChange={(value) => onPriceChange(value)}
              className="price-input"
            />
          </div>
        </div>
        <div className="form-top">
          <button type="submit" className="add-btn">
            {loading ? "Tambahkan wisata..." : "Tambahkan"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
