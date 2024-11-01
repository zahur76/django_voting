import { useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthServiceContext();

  const [isLoggedIn] = useState(login());

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/survey");
    }
  }, []);

  return (
    <div sx={{ display: "flex" }}>
      <div className="h1 text-dark text-center montserrat-400">Login Page</div>
    </div>
  );
};
export default Login;
