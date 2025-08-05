// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/AnkitaPages/layouts/MainLayout";
import Home from "./pages/AnkitaPages/Home";
import UserLogin from "./pages/AnkitaPages/Login/UserLogin";
import CompanyLogin from "./pages/AnkitaPages/Login/CompanyLogin";
import UserSignup from "./pages/AnkitaPages/Register/UserSignup";
import CompanySignup from "./pages/AnkitaPages/Register/CompanySignup";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/signup" element={<CompanySignup />} />
          <Route path="/admin/login" element={<div>Admin login coming soon...</div>} />
          <Route path="/admin/signup" element={<div>Admin signup coming soon...</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
