import axios from "axios";
// import { BASE_URL } from "../config";
import { AuthServiceProps } from "../@types/auth-service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function useAuthService(): AuthServiceProps {
  const navigate = useNavigate();

  const [error, setError] = useState<string>(" ");

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
      navigate("/surveys");
    } catch (err: any) {
      setError("Invalid Credentials");
      return err.response.status;
    }
  };

  const logout = () => {
    try {
      navigate("/");
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

  return { login, logout, isLoggedIn, error };
}
