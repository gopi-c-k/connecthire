import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./pages/AnkitaPages/Login/UserLogin";
import UserSignup from "./pages/AnkitaPages/Register/UserSignup";
import CompanyLogin from "./pages/AnkitaPages/Login/CompanyLogin";
import CompanySignup from "./pages/AnkitaPages/Register/CompanySignup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/company/signup" element={<CompanySignup />} />
      </Routes>
    </Router>
  );
}

export default App;
