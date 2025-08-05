"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Menu, X, User, Building2, Zap } from "lucide-react"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-emerald-200"
          : "bg-gradient-to-r from-emerald-50/90 via-violet-50/90 to-blue-50/90 backdrop-blur-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Enhanced Logo Section */}
          <Link to="/" className="brand-logo flex items-center space-x-4 group" id="brand-logo-link">
            <div className="logo-container relative w-14 h-14 bg-gradient-to-br from-emerald-500 via-violet-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-emerald-300 animate-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-violet-400 to-blue-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <Zap className="w-8 h-8 text-white relative z-10 animate-pulse" />
            </div>
            <div className="brand-text">
              <span className="brand-name text-3xl font-black bg-gradient-to-r from-emerald-700 via-violet-700 to-blue-700 bg-clip-text text-transparent">
                Connect Hire
              </span>
              <div className="brand-tagline text-xs text-gray-600 font-medium">Professional Network</div>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="desktop-nav hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className="nav-link-home px-6 py-3 text-gray-700 hover:text-emerald-700 bg-gradient-to-r from-transparent hover:from-emerald-50 hover:to-emerald-100 rounded-xl transition-all duration-300 font-semibold relative group border-2 border-transparent hover:border-emerald-200"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-500 to-violet-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <Link
              to="/jobs/List"
              className="nav-link-jobs px-6 py-3 text-gray-700 hover:text-violet-700 bg-gradient-to-r from-transparent hover:from-violet-50 hover:to-violet-100 rounded-xl transition-all duration-300 font-semibold relative group border-2 border-transparent hover:border-violet-200"
            >
              Browse Jobs
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-violet-500 to-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <Link
              to="/suggested"
              className="nav-link-talent px-6 py-3 text-gray-700 hover:text-blue-700 bg-gradient-to-r from-transparent hover:from-blue-50 hover:to-blue-100 rounded-xl transition-all duration-300 font-semibold relative group border-2 border-transparent hover:border-blue-200"
            >
              Find Talent
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
          </div>

          {/* Enhanced Auth Buttons */}
          <div className="auth-buttons hidden md:flex items-center space-x-4">
            <div className="user-auth-group flex items-center space-x-4">
              <Link
                to="/user/login"
                className="user-login-btn flex items-center space-x-3 px-6 py-3 text-emerald-700 hover:text-emerald-800 bg-gradient-to-r from-emerald-50 via-emerald-100 to-emerald-50 hover:from-emerald-100 hover:via-emerald-200 hover:to-emerald-100 rounded-xl transition-all duration-300 font-bold border-2 border-emerald-300 hover:border-emerald-400 shadow-lg hover:shadow-emerald-200 hover:scale-105"
              >
                <User className="w-5 h-5" />
                <span>Developer</span>
              </Link>
              <Link
                to="/company/login"
                className="company-login-btn flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-violet-600 via-violet-500 to-blue-600 text-white hover:from-violet-700 hover:via-violet-600 hover:to-blue-700 rounded-xl transition-all duration-300 font-bold shadow-xl hover:shadow-violet-300 hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Building2 className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Company</span>
              </Link>
            </div>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="mobile-menu-toggle md:hidden p-3 text-gray-700 hover:text-emerald-700 bg-gradient-to-r from-emerald-50 via-violet-50 to-blue-50 hover:from-emerald-100 hover:via-violet-100 hover:to-blue-100 rounded-xl transition-all duration-300 shadow-lg border-2 border-emerald-200 hover:border-emerald-300"
            id="mobile-menu-button"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="mobile-menu md:hidden bg-gradient-to-br from-white via-emerald-50 to-violet-50 border-t-2 border-emerald-200 shadow-2xl rounded-b-3xl backdrop-blur-xl"
            id="mobile-navigation-menu"
          >
            <div className="mobile-nav-links px-6 py-8 space-y-4">
              <Link
                to="/"
                className="mobile-nav-home block px-6 py-4 text-gray-700 hover:text-emerald-700 bg-gradient-to-r from-transparent hover:from-emerald-100 hover:to-emerald-50 rounded-xl transition-all duration-300 font-bold border-2 border-transparent hover:border-emerald-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/jobs/List"
                className="mobile-nav-jobs block px-6 py-4 text-gray-700 hover:text-violet-700 bg-gradient-to-r from-transparent hover:from-violet-100 hover:to-violet-50 rounded-xl transition-all duration-300 font-bold border-2 border-transparent hover:border-violet-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Jobs
              </Link>
              <Link
                to="/suggested"
                className="mobile-nav-talent block px-6 py-4 text-gray-700 hover:text-blue-700 bg-gradient-to-r from-transparent hover:from-blue-100 hover:to-blue-50 rounded-xl transition-all duration-300 font-bold border-2 border-transparent hover:border-blue-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find Talent
              </Link>
              <div className="mobile-auth-section pt-6 border-t-2 border-gradient-to-r from-emerald-200 via-violet-200 to-blue-200 space-y-4">
                <Link
                  to="/user/login"
                  className="mobile-user-login flex items-center space-x-3 px-6 py-4 text-emerald-700 bg-gradient-to-r from-emerald-100 via-emerald-50 to-emerald-100 hover:from-emerald-200 hover:via-emerald-100 hover:to-emerald-200 rounded-xl transition-all duration-300 font-bold shadow-lg border-2 border-emerald-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Developer Login</span>
                </Link>
                <Link
                  to="/company/login"
                  className="mobile-company-login flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-violet-600 via-violet-500 to-blue-600 text-white rounded-xl transition-all duration-300 font-bold shadow-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Building2 className="w-5 h-5" />
                  <span>Company Login</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
