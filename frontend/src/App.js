import Home from "./pages/SurveyPage";
import Login from "./pages/Login";
import Survey from "./pages/SurveyHome";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthServiceProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <AuthServiceProvider>
        <Routes>
          <Route path="/survey/:id?" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/surveys" element={<Survey />} />
        </Routes>
      </AuthServiceProvider>
    </BrowserRouter>
  );
}

export default App;
