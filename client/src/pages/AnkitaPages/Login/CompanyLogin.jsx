import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, } from "lucide-react";
import InputWithIcon from "../../../components/InputWithIcon";
import Button from "../../../components/Button";
import api from "../../../services/secureApi"

const CompanyLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    const baseURL = "http://localhost:5000" || process.env.REACT_APP_BASE;
    if (!baseURL) {
      setError("API base URL is not defined. Check your .env file.");
      console.error("Missing REACT_APP_BASE in .env");
      setIsLoading(false);
      return;
    }

    try {
      console.log(process.env.REACT_APP_BASE);
      const res = await api.post("/user/signin", form);
      // console.log("Login response:", res.data);


      // Try to parse JSON; if the backend sent HTML for errors, handle 
      let data = {};
      try {
        data = res.data;
      } catch {

      }

      if (res.status !== 200) {
        throw new Error(data?.message || "Login failed");
      }
      //  if backend also returns a token in JSON, keep your current localStorage behavior
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      localStorage.setItem("role", "company");
      if (data.id) localStorage.setItem("companyId", data.id);

      // After successful login, the cookie is now stored by the browser.

      navigate("/company-dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-lightText">Company Login</h2>
        {error && (
          <div className="text-errorText bg-errorBg p-2 rounded text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputWithIcon
            icon={Mail}
            name="email"
            type="email"
            placeholder="company@example.com"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="username"
          />
          <InputWithIcon
            icon={Lock}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            rightIcon={
              showPassword ? (
                <EyeOff
                  className="w-5 h-5 text-muted"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="w-5 h-5 text-muted"
                  onClick={() => setShowPassword(true)}
                />
              )}
          />
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <p className="text-sm text-center text-muted">
          Don't have an account{" "}
          <Link to="/company/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CompanyLogin;
