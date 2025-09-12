// src/pages/AnkitaPages/Login/CompanyLogin.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import InputWithIcon from "../../../components/InputWithIcon";
import Button from "../../../components/Button";
import api from "../../../secureApi";
import { loginWithGoogle } from "../../../services/authService";
import ForgotPasswordModal from "../../../components/ForgotPasswordModal";

/* Google SVG icon (unchanged) */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path fill="#4285F4" d="M533.5 278.4c0-18.7-1.6-37.3-4.8-55.1H272v104.3h146.9c-6.3 33.7-25.3 62.2-54 81.3v67.5h87.1c51-46.9 80.5-116.1 80.5-198z"/>
    <path fill="#34A853" d="M272 544.3c73.7 0 135.6-24.3 180.8-66.1l-87.1-67.5c-24.2 16.2-55 25.8-93.7 25.8-71.9 0-132.9-48.6-154.7-114.1H28.8v71.7C74.5 488.4 167.6 544.3 272 544.3z"/>
    <path fill="#FBBC05" d="M117.3 325.3c-11.9-35.5-11.9-73.8 0-109.3V144.2H28.8c-39.3 76.8-39.3 168.9 0 245.7l88.5-64.6z"/>
    <path fill="#EA4335" d="M272 108.7c39.9 0 75.8 13.7 104.1 40.6l78-78C403 24.1 338.3 0 272 0 167.6 0 74.5 55.9 28.8 144.2l88.5 71.7C139.1 157.3 200.1 108.7 272 108.7z"/>
  </svg>
);

const CompanyLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "company" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  // track GIS ready/initialized
  const [googleReady, setGoogleReady] = useState(false);
  const googleInitializedRef = useRef(false);

  // keep a ref to the callback so init can access it safely
  const handleGoogleResponseRef = useRef(null);

  // --- Google response handler (assigned to ref) ---
  useEffect(() => {
    handleGoogleResponseRef.current = async (response) => {
      if (!response || !response?.credential) {
        console.log("Google sign-in cancelled or no credential returned.", response);
        setError("Sign in failed — please try again later");
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const data = await loginWithGoogle(response.credential);
        if (data?.accessToken) localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("role", "company");
        if (data?.id) localStorage.setItem("companyId", data.id);
        navigate("/company-dashboard");
      } catch (err) {
        console.error("Google login error:", err);
        setError(err?.message || err?.response?.data?.message || "Google sign-in failed");
      } finally {
        setIsLoading(false);
      }
    };
  }, [navigate]);

  // --- Load & initialize Google Identity Services (GSI) ---
  useEffect(() => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.warn("Missing REACT_APP_GOOGLE_CLIENT_ID in .env");
      return;
    }

    const initGoogle = () => {
      if (!window.google) return false;
      try {
        if (!googleInitializedRef.current) {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (resp) =>
              handleGoogleResponseRef.current &&
              handleGoogleResponseRef.current(resp),
            ux_mode: "popup",
          });
          googleInitializedRef.current = true;
          setGoogleReady(true);
          return true;
        }
      } catch (err) {
        console.warn("Google init error:", err);
        setGoogleReady(false);
      }
      return false;
    };

    if (window.google && initGoogle()) return;

    const scriptId = "google-identity-services";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = scriptId;
      script.onload = () => {
        initGoogle();
      };
      script.onerror = () => {
        console.warn("Failed to load Google Identity Services script.");
        setGoogleReady(false);
      };
      document.head.appendChild(script);
    } else {
      const t = setTimeout(() => initGoogle(), 500);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Trigger Google account chooser / prompt ---
  const handleGoogleButtonClick = () => {
    setError("");
    if (!googleInitializedRef.current) {
      setError("Google Sign-In is loading. Please wait a moment and try again.");
      return;
    }

    try {
      // disable auto-select to always show account chooser
      try {
        window.google.accounts.id.disableAutoSelect();
      } catch (e) {}

      // Open the Google account chooser
      window.google.accounts.id.prompt((notification) => {
        // ✅ Sirf jab user popup cross kare, tabhi error show karo
        if (notification && notification.isDismissedMoment && notification.isDismissedMoment()) {
          setError("Sign in failed — please try again later");
        }
        // Success case handleGoogleResponseRef me already hai
      });
    } catch (err) {
      console.warn("Prompt error:", err);
      setError("Google Sign-In is not available right now. Try again.");
    }
  };

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

    try {
      const payload = { ...form, role: "company" };
      const res = await api.post("/user/signin", payload, { withCredentials: true });

      const data = res.data || {};
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(data?.message || "Login failed");
      }

      if (data.accessToken) localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("role", "company");
      if (data.id) localStorage.setItem("companyId", data.id);

      navigate("/company-dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Login failed");
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
              )
            }
          />
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Single Google button (primary CTA) */}
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
            <Link to="/company/signup" className="text-primary hover:underline">
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

      {showForgot && <ForgotPasswordModal role="company" onClose={() => setShowForgot(false)} />}
    </div>
  );
};

export default CompanyLogin;
