// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Update from "./pages/Update/Update";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddArticle from "./pages/AddArticle/AddArticle";
import ManageArticles from "./pages/ManageArticles/ManageArticles";
import AdminLayout from "./pages/AdminComments/AdminComments";
import UsersList from "./pages/UsersList/UsersList";
function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <div className="inner-body">
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/articles/add" element={<AddArticle />} />
            <Route path="/articles/list" element={<ManageArticles />} />
            <Route path="/admin/comments" element={<AdminLayout />} />
            <Route path="/admin/users" element={<UsersList />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
