import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = "http://localhost:8080/";
const URL = `${API_BASE}favorite-products`;

export class FavoriteProductService {
    async checkFavorite(id) {
        try {
          const req = await axios.get(`${URL}/check-favorite/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${Cookies.get("token")}`,
            },
          });
          const response = req.data;
    
          return response;
        } catch (error) {
          console.error("Error making API request:", error);
    
          throw error;
        }
      }

      async deleteFavorite(id) {
        try {
          const req = await axios.delete(`${URL}/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${Cookies.get("token")}`,
            },
          });
          const response = req.data;
    
          return response;
        } catch (error) {
          console.error("Error making API request:", error);
    
          throw error;
        }
      }

      async save(request) {
        try {
          const req = await axios.post(`${URL}`, request,{
            headers: {
              "Content-Type": "application/json",
              Authorization: `${Cookies.get("token")}`,
            }
          });
          const response = req.data;
    
          return response;
        } catch (error) {
          console.error("Error making API request:", error);
    
          throw error;
        }
      }
}