import { useState, useEffect } from "react";
import useCrud from "../hooks/useCrud";
import { Button } from "react-bootstrap";
import { BASE_URL } from "../config";

const Survey = () => {
  const [message, SetMessage] = useState("Feed Back Message");

  const { dataCRUD, error, isloading, fetchData } = useCrud(
    [],
    `/survey/list_survey/`
  );

  useEffect(() => {
    fetchData();
  }, []);

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
    </div>
  );
};
export default Survey;
