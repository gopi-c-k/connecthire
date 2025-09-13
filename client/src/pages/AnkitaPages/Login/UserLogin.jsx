// src/pages/AnkitaPages/Login/UserLogin.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import InputWithIcon from "../../../components/InputWithIcon";
import Button from "../../../components/Button";
import api from "../../../secureApiForUser";
import ForgotPasswordModal from "../../../components/ForgotPasswordModal";
import { auth, googleProvider } from "../../../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 533.5 544.3"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      fill="#4285F4"
      d="M533.5 278.4c0-18.7-1.6-37.3-4.8-55.1H272v104.3h146.9c-6.3 33.7-25.3 62.2-54 81.3v67.5h87.1c51-46.9 80.5-116.1 80.5-198z"
    />
    <path
      fill="#34A853"
      d="M272 544.3c73.7 0 135.6-24.3 180.8-66.1l-87.1-67.5c-24.2 16.2-55 25.8-93.7 25.8-71.9 0-132.9-48.6-154.7-114.1H28.8v71.7C74.5 488.4 167.6 544.3 272 544.3z"
    />
    <path
      fill="#FBBC05"
      d="M117.3 325.3c-11.9-35.5-11.9-73.8 0-109.3V144.2H28.8c-39.3 76.8-39.3 168.9 0 245.7l88.5-64.6z"
    />
    <path
      fill="#EA4335"
      d="M272 108.7c39.9 0 75.8 13.7 104.1 40.6l78-78C403 24.1 338.3 0 272 0 167.6 0 74.5 55.9 28.8 144.2l88.5 71.7C139.1 157.3 200.1 108.7 272 108.7z"
    />
  </svg>
);

const UserLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  // handle email/password login
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
    try {
      // Firebase sign-in
      const userCred = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const idToken = await userCred.user.getIdToken();

      // Send ID token to your backend
      const res = await api.post("/user/auth/firebase", { idToken, role: "jobseeker" });
      const data = res.data;

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

  // handle Google login
  const handleGoogleButtonClick = async () => {
    setError("");
    setIsLoading(true);
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      const idToken = await userCred.user.getIdToken();

      const res = await api.post("/user/auth/firebase", { idToken, role: "jobseeker" });
      const data = res.data;

      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      localStorage.setItem("role", "jobseeker");
      if (data.id) localStorage.setItem("userId", data.id);

      navigate("/user/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Google sign-in failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-lightText">
          User Login
        </h2>

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

        {/* Google button */}
        <div className="mt-2">
          <button
            onClick={handleGoogleButtonClick}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:shadow-sm transition text-sm font-medium"
            aria-label="Sign in with Google"
            type="button"
          >
            <span className="inline-flex items-center">
              <GoogleIcon />
            </span>
            <span>Sign in with Google</span>
          </button>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-muted">
            Don't have an account{" "}
            <Link to="/user/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
          <button
            onClick={() => setShowForgot(true)}
            className="text-sm text-muted hover:underline"
          >
            Forgot password?
          </button>
        </div>
      </div>

      {showForgot && (
        <ForgotPasswordModal
          onClose={() => setShowForgot(false)}
        />
      )}
    </div>
  );
};

export default UserLogin;
