// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { DOMAIN } from "../../config";
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

    const response = await axios.post(`${DOMAIN}/api/articles`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.success) {
      alert("Article added successfully!");
      setArticle({ title: "", content: "", image: null });
    } else {
      alert("Failed to add article");
    }
  };

  return (
    <div className="add-article">
      <h1 className="header">Add Article</h1>
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
