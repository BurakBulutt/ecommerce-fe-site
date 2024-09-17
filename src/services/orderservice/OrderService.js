import axios from "axios";
import Cookies from "js-cookie";

const URL = "orders";

export class OrderService {
  async getUserOrders(params) {
    try {
      const req = await axios.get(`/${URL}/my-orders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${Cookies.get("token")}`
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

  async getByCode(code) {
    try {
      const req = await axios.get(`/${URL}/${code}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${Cookies.get("token")}`
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
