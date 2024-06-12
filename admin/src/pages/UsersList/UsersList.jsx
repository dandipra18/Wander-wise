import React, { useEffect, useState } from "react";
import axios from "axios";
import { DOMAIN } from "../../config";
import Swal from "sweetalert2";
import "./UsersList.css";

function AdminUsers() {
  const [ users, setUsers ] = useState([]);

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
      <h1 className="header">User List</h1>
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th className="table-mw">Name</th>
              <th className="table-max">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="table-mw">{user.name}</td>
                <td className="table-max"d>{user.email}</td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
