import Home from "./pages/Home";
import Login from "./pages/Login";
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthServiceProvider } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <AuthServiceProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </AuthServiceProvider>
    </BrowserRouter>
  );
}

export default App;
