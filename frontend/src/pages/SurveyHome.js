import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCrud from "../hooks/useCrud";
import { Button } from "react-bootstrap";
import { BASE_URL } from "../config";
import { useAuthServiceContext } from "../context/AuthContext";

const Survey = () => {
  const { isLoggedIn, logout } = useAuthServiceContext();
  const navigate = useNavigate();

  const { dataCRUD, fetchData } = useCrud([], `/survey/list_survey/`);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
    } else {
      fetchData();
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div className="h1 text-dark text-center montserrat-400">
        Available Survey's
      </div>
      <ul>
        {dataCRUD.map((data) => {
          return (
            <li key={data.id}>
              <Button
                variant="link"
                href={BASE_URL + "survey/?id=" + data.id}
                rel="noopener noreferrer"
              >
                {data.title}
              </Button>
            </li>
          );
        })}
      </ul>
      <div className="h1 text-dark text-center montserrat-400">
        Survey Results
      </div>
      <ul>
        {dataCRUD.map((data) => {
          return (
            <li key={data.id}>
              <Button
                variant="link"
                href={BASE_URL + "survey/results/?id=" + data.id}
                rel="noopener noreferrer"
              >
                {data.title}
              </Button>
            </li>
          );
        })}
      </ul>
      <div className="d-flex justify-content-center">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};
export default Survey;
