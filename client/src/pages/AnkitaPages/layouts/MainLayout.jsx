// src/layouts/MainLayout.jsx
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import AuthModal from "../../../components/AuthModal"; // keep your exact path

export default function MainLayout() {
  const [authType, setAuthType] = useState(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  // function children can call to open modal
  const openAuth = (type = "signup") => setAuthType(type);
  const closeAuth = () => setAuthType(null);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-lightText">
      <header className="fixed w-full z-40 backdrop-blur-md bg-white/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold text-lightText">ConnectHire</Link>

          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-lightText hover:underline">Home</Link>
           

            <button
              onClick={() => openAuth("login")}
              className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-accent to-primary text-white text-xs shadow-glowAccent"
              aria-label="Sign in"
              type="button"
            >
              Sign In
            </button>

            <button
              onClick={() => openAuth("signup")}
              className="ml-4 px-3 py-2 rounded-full bg-gradient-to-r from-accent to-primary text-white text-xs shadow-glowAccent"
              aria-label="Sign up"
              type="button"
            >
              Sign Up
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* provide openAuth to all child routes via Outlet context */}
        <Outlet context={{ openAuth }} />
      </main>

      {authType && (
        <AuthModal type={authType} onClose={closeAuth} />
      )}

      <footer className="bg-surface text-gray-300 py-10 mt-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-xl font-bold text-lightText mb-2">ConnectHire</div>
            <p className="text-sm text-muted">Platform for companies and freelancers to find each other.</p>
          </div>

          <div>
            <h4 className="font-semibold text-lightText mb-2">Company</h4>
            <ul className="text-sm text-muted space-y-1">
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/careers" className="hover:underline">Careers</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lightText mb-2">Legal</h4>
            <ul className="text-sm text-muted space-y-1">
              <li><Link to="/terms" className="hover:underline">Terms</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs mt-8 text-muted">
          © {new Date().getFullYear()} ConnectHire. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
