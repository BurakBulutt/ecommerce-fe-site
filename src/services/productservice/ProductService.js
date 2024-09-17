import axios from "axios";
import Cookies from "js-cookie";

const URL = "products";

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
      const req = await axios.get(`/${URL}`, {
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

  async getBySlug(slug) {
    try {
      const req = await axios.get(`slug/${slug}`, {
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
