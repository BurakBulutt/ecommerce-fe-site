import axios from "axios";
import Cookies from "js-cookie";

const URL = "categories";

export class CategoryService {
  async getCategoryTree() {
    try {
      const req = await axios.get(`${URL}/tree`, {
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
