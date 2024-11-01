import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import useCrud from "../hooks/useCrud";

const Home = () => {

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
      <div className="h1 text-dark text-center montserrat-400">Survey Page</div>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Row>
          <Col xs="0" md="3" lg="4"></Col>
          <Col xs="12" md="6" lg="4">
            <Form className="p-5">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col xs="0" md="3" lg="4"></Col>
        </Row>
      </Formik>
      <div className="text-center">{message}</div>
    </div>
  );
};
export default Home;
