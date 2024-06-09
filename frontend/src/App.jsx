import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Ticket from "./pages/Ticket/Ticket";
import ToursDetail from "./pages/ToursDetail/ToursDetail";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/Myorders/MyOrders";
import ManualPayment from "./pages/ManualPayment/ManualPayment";
import ArticleDetail from "./pages/ArticleDetail/ArticleDetail"; // Import the new component

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/manual-payment" element={<ManualPayment />} />
          <Route path="/tours/:id" element={<ToursDetail />} />
          <Route path="/article/:id" element={<ArticleDetail />} />{" "}
          {/* Add the new route */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
