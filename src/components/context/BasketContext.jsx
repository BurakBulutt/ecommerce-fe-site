import { createContext, useEffect, useState } from "react";
import { BasketService } from "../../services/basketservice/BasketService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState(getBasketStorage() || []);
  const [token,setToken] = useState(Cookies.get("token"));
  const service = new BasketService();

  useEffect(()=>{
    localStorage.setItem("basket",JSON.stringify(basket));
  },[basket])

  useEffect(()=> {
    if(token !== undefined){
      getBasket();
    }
  },[token]);

  function getBasketStorage () {
    try {
      return JSON.parse(localStorage.getItem("basket"));
    }catch(error){
      return null;
    }
  }

  const getBasket  = () => {
    service.getBasket().then((response)=> {
      if(response.statusCode !== 200){
        toast.error(response.description,{
          position: "top-left",
          autoClose: 3000, 
        });
      }else{
        setBasket(response.data);
      }
    }).catch((error) => {
      toast.error("Sunucu Hatası",{
        position : 'top-left',
        autoClose : 3000
      })
      Cookies.remove("token");
      setToken(undefined);
      console.log(error);
    })
  }

  return (
    <BasketContext.Provider value={{ basket, setBasket, token, setToken }}>
      {children}
    </BasketContext.Provider>
  );
};
