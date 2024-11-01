import { useState } from "react";
// import { BASE_URL } from "../config";
import { AuthServiceProps } from "../@types/auth-service";

export function useAuthService(): AuthServiceProps {

  const [isLoggedIn] = useState<boolean>(true);

  const login = () => {
    try {
      return isLoggedIn
    } catch (error: any) {
      return error.response.status;
    }
  };
  return { login };
}
