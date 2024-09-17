import axios from "axios";

const URL = "auth";

export class AuthService {
  async login(data) {
    try {
      const request = await axios.post(`${URL}/login-user`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = request.data;

      return response;
    } catch (error) {
      console.error("Error making API request:", error);

      throw error;
    }
  }

  async register(data) {
    try {
      const request = await axios.post(`${URL}/register`, data,{
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = request.data;

      return response;
    } catch (error) {
      console.error("Error making API request:", error);

      throw error;
    }
  }
}
