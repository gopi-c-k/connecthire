// src/pages/AnkitaPages/Login/AdminLogin.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import InputWithIcon from "../../../components/InputWithIcon";
import Button from "../../../components/Button";
import api from "../.././../secureApiForUser";

const AdminLogin = () => {
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

    // basic validation
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      //  always include role in payload
      const payload = { ...form, role: "admin" };
      const res = await api.post("/user/signin", payload);

      const data = res?.data ?? {};

      if (res.status !== 200) {
        throw new Error(data?.message || "Login failed");
      }

      //  Make sure role really is admin
      if (data.role && data.role !== "admin") {
        setError("You are not authorized as admin.");
        return;
      }

      //  Save token + role in localStorage
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      localStorage.setItem("role", "admin");
      if (data.id) {
        localStorage.setItem("adminId", data.id);
      }

      //  Redirect to admin dashboard
      navigate("/admin");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-lightText">Admin Login</h2>

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
            placeholder="admin@connecthire.com"
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
                  className="w-5 h-5 text-muted cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="w-5 h-5 text-muted cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )
            }
          />

          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-sm text-center text-muted">
          Return to{" "}
          <Link to="/" className="text-primary hover:underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
