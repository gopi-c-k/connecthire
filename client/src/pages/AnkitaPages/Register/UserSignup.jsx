// src/pages/AnkitaPages/Register/UserSignup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import InputWithIcon from "../../../components/InputWithIcon";
import Button from "../../../components/Button";

const UserSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Enter a valid email address");
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
      const res = await fetch(`${baseURL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: "jobseeker",
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        throw new Error(`Invalid JSON response: ${text}`);
      }

      if (!res.ok) throw new Error(data.message || "Signup failed");

      // optional, if backend returns token
      if (data.accessToken) localStorage.setItem("accessToken", data.accessToken);

      navigate("/user/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-lightText">User Signup</h2>
        {error && <div className="text-errorText bg-errorBg p-2 rounded text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputWithIcon
            icon={User}
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <InputWithIcon
            icon={Mail}
            name="email"
            type="email"
            placeholder="you@example.com"
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
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
        <p className="text-sm text-center text-muted">
          Already have an account{" "}
          <Link to="/user/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
