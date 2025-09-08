import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import InputWithIcon from "../../../components/InputWithIcon";
import Button from "../../../components/Button";
import api from "../.././../secureApiForUser";

const UserLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "jobseeker" });
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

    const baseURL = process.env.REACT_APP_BASE;
    if (!baseURL) {
      setError("API base URL is not defined. Check REACT_APP_BASE in your .env.");
      console.error("Missing REACT_APP_BASE in .env");
      setIsLoading(false);
      return;
    }

    try {
      // <-- FIX: include role in payload sent to backend
      const payload = { ...form, role: "jobseeker" };
      const res = await api.post("/user/signin", payload);

      let data = {};
      try {
        data = res.data;
      } catch {}

      if (res.status !== 200) {
        throw new Error(data?.message || "Login failed");
      }

      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      localStorage.setItem("role", "jobseeker");
      if (data.id) localStorage.setItem("userId", data.id);

      navigate("/user/dashboard");
    } catch (err) {

      setError(err?.response?.data?.message || err.message || "Login failed");

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-lightText">User Login</h2>

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
            placeholder="you@example.com"
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
                <EyeOff className="w-5 h-5 text-muted cursor-pointer" onClick={() => setShowPassword(false)} />
              ) : (
                <Eye className="w-5 h-5 text-muted cursor-pointer" onClick={() => setShowPassword(true)} />
              )
            }
          />

          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-sm text-center text-muted">
          Don't have an account{" "}
          <Link to="/user/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
