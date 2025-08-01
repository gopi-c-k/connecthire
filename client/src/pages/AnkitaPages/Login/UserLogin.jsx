"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, ArrowRight, User, Sparkles, Shield } from "lucide-react"

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log("Login attempt:", formData)
    }, 1500)
  }

  return (
    <div
      id="user-login-page"
      className="login-page-container min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 via-secondary-50 to-accent-100 px-4 py-8 relative overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(217, 70, 239, 0.1) 0%, transparent 50%)
        `,
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary-300 to-primary-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-secondary-300 to-secondary-500 rounded-full opacity-15 animate-bounce-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-accent-300 to-accent-500 rounded-full opacity-10 animate-pulse-slow"></div>
      </div>

      <div className="login-form-wrapper bg-white/95 backdrop-blur-md p-10 lg:p-14 rounded-3xl shadow-2xl w-full max-w-lg border-2 border-primary-200 relative z-10">
        {/* Decorative Header */}
        <div className="login-header text-center mb-10 relative">
          {/* Animated Icon Container */}
          <div className="user-icon-container w-20 h-20 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl relative animate-glow">
            <User className="w-10 h-10 text-white" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent-400 animate-pulse" />
          </div>

          <h1 className="login-title text-4xl lg:text-5xl font-black mb-3">
            <span className="bg-gradient-to-r from-primary-700 via-secondary-700 to-accent-700 bg-clip-text text-transparent">
              Welcome Back!
            </span>
          </h1>
          <p className="login-subtitle text-lg text-gray-600 font-medium">Sign in to your developer account</p>

          {/* Decorative Line */}
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Enhanced Login Form */}
        <form onSubmit={handleSubmit} className="login-form space-y-8" id="user-login-form">
          {/* Email Field */}
          <div className="email-field-group">
            <label htmlFor="user-email" className="field-label block text-sm font-bold text-gray-800 mb-3">
              Email Address
            </label>
            <div className="email-input-wrapper relative group">
              <Mail className="input-icon absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-primary-500 group-focus-within:text-primary-700 transition-colors" />
              <input
                type="email"
                id="user-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="email-input w-full pl-14 pr-6 py-4 border-2 border-primary-200 rounded-2xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300 bg-gradient-to-r from-primary-50 to-secondary-50 focus:from-white focus:to-white text-lg font-medium placeholder-gray-500"
                placeholder="developer@example.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="password-field-group">
            <label htmlFor="user-password" className="field-label block text-sm font-bold text-gray-800 mb-3">
              Password
            </label>
            <div className="password-input-wrapper relative group">
              <Lock className="input-icon absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-secondary-500 group-focus-within:text-secondary-700 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                id="user-password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="password-input w-full pl-14 pr-14 py-4 border-2 border-secondary-200 rounded-2xl focus:ring-4 focus:ring-secondary-200 focus:border-secondary-500 transition-all duration-300 bg-gradient-to-r from-secondary-50 to-accent-50 focus:from-white focus:to-white text-lg font-medium placeholder-gray-500"
                placeholder="••••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-500 hover:text-secondary-700 transition-colors p-1 rounded-lg hover:bg-secondary-100"
              >
                {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Enhanced Options */}
          <div className="form-options flex justify-between items-center text-sm">
            <label className="remember-me-label flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="remember-me-checkbox w-5 h-5 text-primary-600 border-2 border-primary-300 rounded-lg focus:ring-primary-500 focus:ring-2"
              />
              <span className="remember-me-text text-gray-700 font-medium group-hover:text-primary-700 transition-colors">
                Remember me
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="forgot-password-link text-secondary-600 hover:text-secondary-800 font-bold hover:underline transition-all duration-300 px-2 py-1 rounded-lg hover:bg-secondary-50"
            >
              Forgot password?
            </Link>
          </div>

          {/* Enhanced Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="login-submit-btn w-full bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white py-5 rounded-2xl hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-primary-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 group transform hover:scale-105 relative overflow-hidden"
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {isLoading ? (
              <>
                <div className="loading-spinner w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <Shield className="w-6 h-6" />
                <span>Sign In Securely</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Enhanced Divider */}
        <div className="form-divider flex items-center my-10">
          <div className="divider-line flex-1 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
          <span className="divider-text px-6 text-sm text-gray-500 font-medium bg-white">or continue with</span>
          <div className="divider-line flex-1 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
        </div>

        {/* Enhanced Sign Up Link */}
        <div className="signup-prompt text-center p-6 bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 rounded-2xl border border-primary-200">
          <p className="signup-text text-gray-700 font-medium text-lg">
            New to Connect Hire?{" "}
            <Link
              to="/user/signup"
              className="signup-link text-primary-600 font-bold hover:text-primary-800 hover:underline transition-all duration-300 px-2 py-1 rounded-lg hover:bg-primary-100"
            >
              Create your account
            </Link>
          </p>
        </div>

        {/* Enhanced Company Login Link */}
        <div className="company-login-prompt text-center mt-6 pt-6 border-t-2 border-gradient-to-r from-primary-200 via-secondary-200 to-accent-200">
          <p className="company-login-text text-gray-600 font-medium">
            Looking to hire talent?{" "}
            <Link
              to="/company/login"
              className="company-login-link text-secondary-600 font-bold hover:text-secondary-800 hover:underline transition-all duration-300 px-2 py-1 rounded-lg hover:bg-secondary-100"
            >
              Company Login →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
