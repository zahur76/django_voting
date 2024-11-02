import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import useCrud from "../hooks/useCrud";
import { useNavigate } from "react-router-dom";

const SurveyResults = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const queryParameters = new URLSearchParams(window.location.search);

  const survey_id = queryParameters.get("id");

  const { dataCRUD, error, isloading, fetchData } = useCrud(
    [],
    `/survey/list_survey/?id=${survey_id}`
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {dataCRUD.map((data, index) => (
        <div className="text-center h2 text-primary p-3" key={index}>
          {data.title.toUpperCase()} Results
        </div>
      ))}

      <div className="d-flex justify-content-center">
        {dataCRUD.map((data, index) => (
          <div key={index}>
            {data.questions.map((question, iter) => (
              <div key={iter}>
                <div className="d-flex p-2">
                  <div className="ibm-plex-sans-medium h3">
                    {question.question} | Votes {question.votes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="text-center">{message}</div>
      <ul></ul>
    </div>
  );
};
export default SurveyResults;
