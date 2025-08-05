import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import AuthModal from "../../../components/AuthModal"; //  exact case-sensitive path

export default function MainLayout() {
  const [authType, setAuthType] = useState(null);

  const location = useLocation();
    useEffect(() => {
   window.scrollTo(0, 0);
  }, [location]);



  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed w-full z-30 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="text-xl font-bold text-lightText">ConnectHire</div>
          <nav className="flex gap-6 text-sm text-lightText">
            <Link to="/" className="hover:underline">Home</Link>

            <button
              onClick={() => setAuthType("login")}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-accent to-primary text-white text-xs"
            >
              Sign In
            </button>

            <button
              onClick={() => setAuthType("signup")}
              className="text-xs text-primary hover:underline"
            >
              Sign Up
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-20">
        <Outlet /> {/*  Ensures login/signup pages render */}
      </main>

      {authType && (
        <AuthModal type={authType} onClose={() => setAuthType(null)} />
      )}

      <footer className="bg-[#0F1F3A] text-gray-300 py-10 mt-8">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="text-xl font-bold text-white mb-2">ConnectHire</div>
          <p className="text-sm">Platform for companies and freelancers to find each other.</p>
        </div>
        <div className="text-center text-xs mt-8">
          © {new Date().getFullYear()} ConnectHire. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
