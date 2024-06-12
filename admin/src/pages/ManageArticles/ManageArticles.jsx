import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { DOMAIN } from "../../config";
import "./ManageArticles.css";

function ManageArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get(`${DOMAIN}/api/articles`);
      if (response.data.success) {
        setArticles(response.data.articles);
      }
    };
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${DOMAIN}/api/articles/${id}`);
      if (response.data.success) {
        setArticles(articles.filter((article) => article._id !== id));
        const commentResponse = await axios.delete(
          `${DOMAIN}/api/comments/article/${id}`
        );
        if (commentResponse.data.success) {
          setArticles(articles.filter((article) => article._id !== id));
          Swal.fire({
            icon: "success",
            title: "Artikel berhasil dihapus!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire("Error", "Failed to delete comments", "error");
        }
      } else {
        Swal.fire("Error", "Failed to delete article", "error");
      }
    } catch (error) {
      console.error("Error deleting article or comments", error);
      Swal.fire("Error", "Failed to delete article or comments", "error");
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Apakah Anda benar-benar ingin menghapus artikel ini? Tindakan ini tidak bisa dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  return (
    <div className="manage-articles">
      <h2>Manage Articles</h2>
      <table className="articles-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article._id}>
              <td>
                <img
                  src={`${DOMAIN}/uploads/${article.image}`}
                  alt={article.title}
                  className="article-image"
                />
              </td>
              <td>{article.title}</td>
              <td>{article.content}</td>
              <td>
                <button onClick={() => confirmDelete(article._id)}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageArticles;
