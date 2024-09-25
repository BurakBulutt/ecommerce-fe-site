import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = "http://localhost:8080/";
const URL = `${API_BASE}baskets`;

export class BasketService {
  async getBasket() {
    try {
      const req = await axios.get(`${URL}`, {
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

  async addProduct(request) {
    try {
      const req = await axios.post(`${URL}/add-product`, request, {
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

  async updateQuantity(request) {
    try {
      const req = await axios.post(`${URL}/update-quantity`, request, {
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

  async deleteBasketProduct(id) {
    try {
      const req = await axios.delete(`${URL}/delete-basketProduct/${id}`, {
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

  async clearBasket() {
    try {
      const req = await axios.delete(`${URL}`, {
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
}
