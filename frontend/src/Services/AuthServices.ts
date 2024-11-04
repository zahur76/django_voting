import axios from "axios";
// import { BASE_URL } from "../config";
import { AuthServiceProps } from "../@types/auth-service";
import { useNavigate } from "react-router-dom";

export function useAuthService(): AuthServiceProps {
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/create_token/",
        {
          username,
          password,
        },
        // when using cookies
        { withCredentials: true }
      );

      localStorage.setItem("token", response.data["token"]);
    } catch (err: any) {
      return err.response.status;
    }
  };

  const logout = () => {
    try {
      navigate("/login");
      localStorage.removeItem("token");
    } catch (error: any) {
      return error.response.status;
    }
  };

  const isLoggedIn = () => {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  };

  return { login, logout, isLoggedIn };
}
