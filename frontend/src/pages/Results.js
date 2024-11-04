import { useState, useEffect } from "react";
import useCrud from "../hooks/useCrud";
import { useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";
import Nav from 'react-bootstrap/Nav';

const SurveyResults = () => {
  const { isLoggedIn } = useAuthServiceContext();
  const navigate = useNavigate();

  const queryParameters = new URLSearchParams(window.location.search);

  const survey_id = queryParameters.get("id");

  const { dataCRUD, fetchData } = useCrud(
    [],
    `/survey/list_survey/?id=${survey_id}`
  );

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
    } else {
      fetchData();
    }
  }, []);

  return (
    <div>
      <Nav.Link href="/surveys" className="p-2 fw-bold">Home</Nav.Link>
      {dataCRUD?.map((data, index) => (
        <div className="text-center h2 text-primary p-3" key={index}>
          {data.title.toUpperCase()} Results
        </div>
      ))}

      <div className="d-flex justify-content-center">
        {dataCRUD?.map((data, index) => (
          <div key={index}>
            {data.options.map((question, iter) => (
              <div key={iter}>
                <div className="d-flex p-2">
                  <div className="ibm-plex-sans-medium h3">
                    {question.option} | Votes {question.votes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default SurveyResults;
