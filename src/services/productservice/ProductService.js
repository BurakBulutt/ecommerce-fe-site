import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = "http://localhost:8080/";
const URL = `${API_BASE}products`;

export class ProductService {
  async productFilter(params) {
    try {
      const req = await axios.get(`${URL}/filter`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${Cookies.get("token")}`,
        },
        params: params,
      });
      const response = req.data;

      return response;
    } catch (error) {
      console.error("Error making API request:", error);

      throw error;
    }
  }

  async getAll() {
    try {
      const req = await axios.get(`${URL}`, {
        headers: {
          "Content-Type": "application/json"
        },
      });
      const response = req.data;

      return response;
    } catch (error) {
      console.error("Error making API request:", error);

      throw error;
    }
  }


  async searchFilter(params) {
    try {
      const req = await axios.get(`${URL}/search-filter`, {
        headers: {
          "Content-Type": "application/json"
        },
        params : params
      });
      const response = req.data;

      return response;
    } catch (error) {
      console.error("Error making API request:", error);

      throw error;
    }
  }

  async getBySlug(slug) {
    try {
      const req = await axios.get(`${URL}/slug/${slug}`, {
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
