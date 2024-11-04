import { useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuthServiceContext();
  const [errorMessage, setErrorMessage] = useState(null);

  // Check if user is already logged in and redirect to surveys page if true
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/surveys");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (values) => {
    login(values.username, values.password);
    if (isLoggedIn()) {
      navigate("/surveys");
    } else {
      setErrorMessage("Error Try again!");
    }
  };

  // Creating schema
  const schema = Yup.object().shape({
    username: Yup.string().required("Username is a required field"),
    password: Yup.string()
      .required("Password is a required field")
      .min(5, "Password must be at least 8 characters"),
  });

  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <div className="form">
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Login</span>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  placeholder="Enter username"
                  className="form-control inp_text"
                  id="username"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                {/* Click on submit button to submit the form */}
                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
      <div className="h3 text-danger text-center">{errorMessage}</div>
    </>
  );
};
export default Login;
