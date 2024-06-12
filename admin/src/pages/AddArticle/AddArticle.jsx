// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { DOMAIN } from "../../config";
import Swal from "sweetalert2";
import "./AddArticle.css";

function AddArticle() {
  const [article, setArticle] = useState({
    title: "",
    content: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleFileChange = (e) => {
    setArticle({ ...article, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("content", article.content);
    formData.append("image", article.image);

    try {
      const response = await axios.post(`${DOMAIN}/api/articles`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Article added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setArticle({ title: "", content: "", image: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add article",
          text: response.data.message || "An error occurred",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to add article",
        text: error.message || "An error occurred",
      });
    }
  };

  return (
    <div className="add-article">
      <h2>Add Article</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={article.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            name="content"
            value={article.content}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <label>
          Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </label>
        <button type="submit">Add Article</button>
      </form>
    </div>
  );
}

export default AddArticle;
