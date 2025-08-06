import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import InputWithIcon from "../../../components/InputWithIcon";
import Button from "../../../components/Button";
import { loginCompany } from "../../../services/authService";

const CompanyLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Enter a valid email address");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const data = await loginCompany(form.email, form.password);
      if (data.role !== "company") throw new Error("Not a company account.");
      localStorage.setItem("accessToken", data.accessToken);
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
        {error && <div className="text-errorText bg-errorBg p-2 rounded text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputWithIcon
            icon={Mail}
            name="email"
            type="email"
            placeholder="company@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          <InputWithIcon
            icon={Lock}
            name="password"
            type="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <p className="text-sm text-center text-muted">
          Don’t have an account?{" "}
          <Link to="/company/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CompanyLogin;
