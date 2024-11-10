import axios from "axios";

const BASE_URL = "http://127.0.0.1:5555";

export const createUserApiCall = async (userData) => {
  try {
    const res = await axios.post(`${BASE_URL}/userapi/createuser`, userData);
    return res.data;
  } catch (error) {
    if (error.response.status === 409) {
      // Handle the specific case of email already being used
      return { error: "This email ID is already registered. Please use a different email." };
    } else {
      console.error("Error creating user:", error);
      return { error: "An unexpected error occurred. Please try again." };
    }
  }
};

