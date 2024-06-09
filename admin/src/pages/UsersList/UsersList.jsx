import React, { useEffect, useState } from "react";
import axios from "axios";
import { DOMAIN } from "../../config";
import Swal from "sweetalert2";
import "./UsersList.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/users`);
        if (response.data.success) {
          setUsers(response.data.users);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Apakah kamu Yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${DOMAIN}/api/users/${id}`)
          .then((response) => {
            if (response.data.success) {
              setUsers(users.filter((user) => user._id !== id));
              Swal.fire("Deleted!", "The user has been deleted.", "success");
            } else {
              Swal.fire("Failed!", "Failed to delete user.", "error");
            }
          })
          .catch((error) => {
            console.error("Failed to delete user", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the user.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="admin-users">
      <h2>User List</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDelete(user._id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
