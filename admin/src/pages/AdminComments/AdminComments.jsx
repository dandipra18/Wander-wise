import React, { useEffect, useState } from "react";
import axios from "axios";
import { DOMAIN } from "../../config";
import Swal from "sweetalert2";
import "./AdminComments.css";

function AdminComments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/comments`);
        if (response.data.success) {
          setComments(response.data.comments);
        }
      } catch (error) {
        console.error("Gagal mengambil komentar", error);
      }
    };

    fetchComments();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Apakah Kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${DOMAIN}/api/comments/${id}`)
          .then((response) => {
            if (response.data.success) {
              setComments(comments.filter((comment) => comment._id !== id));
              Swal.fire("Deleted!", "The comment has been deleted.", "success");
            } else {
              Swal.fire("Failed!", "Failed to delete comment.", "error");
            }
          })
          .catch((error) => {
            console.error("Failed to delete comment", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the comment.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="admin-comments">
      <h2>Daftar Komentar</h2>
      <table className="comments-table">
        <thead>
          <tr>
            <th>Article</th>
            <th>Name</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment._id}>
              <td>{comment.articleId.title}</td>
              <td>{comment.name}</td>
              <td>{comment.comment}</td>
              <td>
                <button onClick={() => handleDelete(comment._id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminComments;
