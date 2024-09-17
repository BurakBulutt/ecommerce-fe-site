import axios from "axios";
import Cookies from "js-cookie";

const URL = "payment";

export class PaymentService {
  async createPayment(request) {
    try {
      const req = await axios.post(`/${URL}/create-payment`, request,{
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
