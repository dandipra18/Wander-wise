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
              <option value="Bali">Bali</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Yogyakarta">Yogyakarta</option>
              <option value="Medan">Medan</option>
              <option value="Padang">Padang</option>
            </select>
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
        <button type="submit" className="add-btn">
          {loading ? "Tambahkan wisata..." : "Tambahkan"}
        </button>
      </form>
    </div>
  );
}

export default Add;
