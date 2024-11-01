import { useState } from "react";
// import { BASE_URL } from "../config";
import { AuthServiceProps } from "../@types/auth-service";
import { useNavigate } from "react-router-dom";

export function useAuthService(): AuthServiceProps {

  const [isLoggedIn, setLoggedIn] = useState<boolean>(true);
  const navigate = useNavigate();

  const login = () => {
    try {
      return isLoggedIn
    } catch (error: any) {
      return error.response.status;
    }
  };

  const logout = () => {
    try {
      setLoggedIn(false)
      navigate("/login");
    } catch (error: any) {
      return error.response.status;
    }
  };

  return { login, logout };
}
