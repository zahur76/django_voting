import Button from "react-bootstrap/Button";
import { Formik, Field, Form } from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import useCrud from "../hooks/useCrud";
import axios from "axios";
import { BASE_API } from "../config";
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

const Home = () => {
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

  const handleSubmit = (values) => {
    const userData = {
      vote: values.picked,
      code: values.code,
    };

    axios
      .post(`${BASE_API}survey/vote/${survey_id}`, userData)
      .then((response) => {
        if (response.status === 200) {
          navigate("/thanks");
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          setMessage("Code Not Found");
        }
      });
  };

  return (
    <div>
        <Nav.Link href="/surveys" className="p-2 fw-bold">Home</Nav.Link>
        <div className="h1 text-dark text-center montserrat-400">Survey Page</div>
      {dataCRUD &&
        dataCRUD.map((data, index) => (
          <div className="text-center h2 text-primary" key={index}>
            {data.title.toUpperCase()}
            <div className="h5 text-dark mt-3"> {data.description} </div>
          </div>
        ))}
      <Formik
        initialValues={{
          code: "",
          picked: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Row>
            <Col xs="0" md="3" lg="4"></Col>
            <Col xs="12" md="6" lg="4">
              <Form className="p-5 pt-2 radio-button">
                {dataCRUD?.map((data, index) => (
                  <div key={index}>
                    {data.options.map((option, iter) => (
                      <div key={iter}>
                        <label>
                          <Field
                            id={`${option.id}`}
                            type="radio"
                            name="picked"
                            value={`${option.id}`}
                            required
                          />
                          {`${option.option}`}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
                <Field
                  className="mb-2 me-3 ms-0 mt-2 code"
                  name="code"
                  placeholder="Enter Secret Code"
                  required
                />
                <Button
                  className="d-flex justify-content-center w-50"
                  variant="outline-primary"
                  size="sm"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Col>
            <Col xs="0" md="3" lg="4"></Col>
          </Row>
        )}
      </Formik>
      <div className="text-center text-danger">{message}</div>
    </div>
  );
};
export default Home;
