// src/pages/AnkitaPages/Register/UserSignup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import InputWithIcon from "../../../components/InputWithIcon";
import Button from "../../../components/Button";
import { auth, googleProvider } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import axiosInstance from "../../../secureApiForUser";

const UserSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const storeUserInBackend = async (idToken, username) => {
    try {
      const res = await axiosInstance.post("/user/auth/firebase", {
        idToken,
        username,
        role: "jobseeker",
      });
      if (res.data.accessToken) localStorage.setItem("accessToken", res.data.accessToken);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    const emailPattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*\.\w{2,3}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!emailPattern.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character."
      );
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await sendEmailVerification(userCredential.user);

      const idToken = await userCredential.user.getIdToken();
      await storeUserInBackend(idToken, name);

      navigate("/user/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      await storeUserInBackend(idToken, '');
      navigate("/user/dashboard");
    } catch (err) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-darkBg">
      <div className="w-full max-w-md bg-darkCard rounded-2xl shadow-lg p-8 space-y-6">
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

        <div className="flex items-center justify-center gap-2 text-muted">OR</div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.1l6.7-6.7C34.3 2.6 29.5 0 24 0 14.5 0 6.2 6.2 2.5 14.9l7.9 6.2C12.4 15.1 17.8 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.5 24c0-1.6-.1-2.8-.4-4H24v8.5h12.7c-.5 3-2.1 5.5-4.5 7.2l7 5.5c4.1-3.8 6.3-9.3 6.3-16.2z" />
            <path fill="#FBBC05" d="M10.4 28.9l-7.9-6.2C0.8 27 0 30.3 0 34c0 3.6.8 7 2.5 10.1l7.9-6.2c-1.1-1.7-1.6-3.6-1.6-5.9 0-2.2.5-4.2 1.6-5.9z" />
            <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.8l-7-5.5c-2 1.3-4.5 2-7 2-6.2 0-11.6-5.6-13.1-12.9l-7.9 6.2C6.2 41.8 14.5 48 24 48z" />
          </svg>
          Sign up with Google
        </Button>

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
