import { createContext, useEffect, useState } from "react";
import { DOMAIN } from "../config";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [ticketItems, setTicketItems] = useState({});
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [tours_list, settours_list] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchToursList = async () => {
    setLoading(true);
    const response = await axios.get(`${DOMAIN}/api/tours/list`);
    if (response.data.success) {
      settours_list(response.data.data);
    }
    setLoading(false);
  };

  const loadTicketData = async (token) => {
    const response = await axios.post(
      `${DOMAIN}/api/ticket/get`,
      {},
      {
        headers: { token },
      }
    );
    setTicketItems(response.data.ticketData);
  };

  const addToTicket = async (itemId) => {
    if (!ticketItems[itemId]) {
      setTicketItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setTicketItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      const response = await axios.post(
        `${DOMAIN}/api/ticket/add`,
        { itemId },
        {
          headers: {
            token,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message, {
          autoClose: 1000,
        });
      }
    }
  };

  const removeFromTicket = async (itemId) => {
    setTicketItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      const response = await axios.post(
        `${DOMAIN}/api/ticket/remove`,
        { itemId },
        {
          headers: {
            token,
          },
        }
      );
      if (response.data.success) {
        toast.warn(response.data.message, {
          autoClose: 1000,
        });
      }
    }
  };

  const getTotalTicketAmount = () => {
    let totalAmount = 0;
    for (const item in ticketItems) {
      if (ticketItems[item] > 0) {
        let itemInfo = tours_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * ticketItems[item];
        }
      }
    }
    return totalAmount;
  };

  const clearTicket = () => {
    setTicketItems({});
  };

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setToken(localStorage.getItem("Token"));
      loadTicketData(localStorage.getItem("Token"));
    }
    fetchToursList();
  }, []);

  const contextValue = {
    tours_list,
    ticketItems,
    setTicketItems,
    addToTicket,
    removeFromTicket,
    getTotalTicketAmount,
    clearTicket,
    token,
    setToken,
    email,
    setEmail,
    loading,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
