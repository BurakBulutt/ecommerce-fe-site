import { createContext, useEffect, useState } from "react";
import { BasketService } from "../services/basketservice/BasketService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { NotificationManager } from "../services/websocketservice/NotificationManager";
import { WebSocketService } from "../services/websocketservice/WebSocketService";

export const ApplicationContext = createContext();

export const ApplicationContextProvider = ({ children }) => {
  const [basket, setBasket] = useState(getBasketStorage() || []);
  const [token, setToken] = useState(Cookies.get("token"));
  const service = new BasketService();
  const socketService = new WebSocketService();

  useEffect(() => {
    socketService.connect();
    
    socketService.handleMessage = (message) => {
      const notification = JSON.parse(message.body);
      if(notification) {
        NotificationManager.handleNotification(notification);
      }
    };

    return () => {
      socketService.disconnect();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    if (token !== undefined) {
      getBasket();
    }
  }, [token]);

  function getBasketStorage() {
    try {
      return JSON.parse(localStorage.getItem("basket"));
    } catch (error) {
      return null;
    }
  }

  const getBasket = () => {
    service
      .getBasket()
      .then((response) => {
        if (response.statusCode !== 200) {
          toast.error(response.description, {
            position: "top-left",
            autoClose: 3000,
          });
        } else {
          setBasket(response.data);
        }
      })
      .catch((error) => {
        toast.error("Sunucu Hatası", {
          position: "top-left",
          autoClose: 3000,
        });
        Cookies.remove("token");
        setToken(undefined);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  return (
    <ApplicationContext.Provider value={{ basket, setBasket, token, setToken }}>
      {children}
    </ApplicationContext.Provider>
  );
};
