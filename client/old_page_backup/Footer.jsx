"use client"
import { Link } from "react-router-dom"
import { Twitter, Linkedin, Github, Facebook, Mail, Phone, MapPin, ArrowUp } from "lucide-react"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerSections = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Careers", href: "/careers" },
      { name: "Press Kit", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
    platform: [
      { name: "How It Works", href: "/how-it-works" },
      { name: "For Developers", href: "/developers" },
      { name: "For Companies", href: "/companies" },
      { name: "Success Stories", href: "/success-stories" },
      { name: "Pricing", href: "/pricing" },
    ],
    resources: [
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
      { name: "Developer Tools", href: "/tools" },
      { name: "API Documentation", href: "/api-docs" },
      { name: "Status Page", href: "/status" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR Compliance", href: "/gdpr" },
      { name: "Contact Us", href: "/contact" },
    ],
  }

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/connecthire", color: "hover:bg-blue-500" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/connecthire", color: "hover:bg-blue-600" },
    { name: "GitHub", icon: Github, href: "https://github.com/connecthire", color: "hover:bg-gray-700" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/connecthire", color: "hover:bg-blue-700" },
  ]

  return (
    <footer id="main-footer" className="footer-container bg-gray-900 text-white relative">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="back-to-top-btn absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-emerald-600 hover:bg-emerald-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 group"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
      </button>

      <div className="footer-content-wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="footer-main-content grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="footer-brand-section lg:col-span-2">
            <div className="brand-info mb-6">
              <div className="footer-logo flex items-center space-x-3 mb-4">
                <div className="logo-container w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CH</span>
                </div>
                <h3 className="brand-name text-2xl font-bold text-emerald-400">Connect Hire</h3>
              </div>
              <p className="brand-description text-gray-400 mb-6 leading-relaxed max-w-md">
                Connecting world-class talent with innovative companies. Building the future of work, one meaningful
                connection at a time.
              </p>
            </div>

            {/* Contact Information */}
            <div className="contact-info space-y-3 mb-6">
              <div className="contact-item flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="contact-text">hello@connecthire.com</span>
              </div>
              <div className="contact-item flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="contact-text">+1 (555) 123-4567</span>
              </div>
              <div className="contact-item flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="contact-text">San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-links-section">
              <h4 className="social-title text-lg font-semibold mb-4">Follow Us</h4>
              <div className="social-links-grid flex space-x-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-link w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center ${social.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Footer Links Sections */}
          <div className="footer-links-section">
            <h4 className="links-section-title text-lg font-semibold mb-6 text-emerald-400">Company</h4>
            <ul className="links-list space-y-3">
              {footerSections.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="footer-link text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links-section">
            <h4 className="links-section-title text-lg font-semibold mb-6 text-emerald-400">Platform</h4>
            <ul className="links-list space-y-3">
              {footerSections.platform.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="footer-link text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links-section">
            <h4 className="links-section-title text-lg font-semibold mb-6 text-emerald-400">Resources</h4>
            <ul className="links-list space-y-3">
              {footerSections.resources.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="footer-link text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="newsletter-section bg-gray-800 rounded-2xl p-8 mb-12 border border-gray-700">
          <div className="newsletter-content text-center max-w-2xl mx-auto">
            <h4 className="newsletter-title text-2xl font-bold text-white mb-4">Stay Updated</h4>
            <p className="newsletter-description text-gray-400 mb-6">
              Get the latest updates on new features, success stories, and industry insights.
            </p>
            <form className="newsletter-form flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-email-input flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
              <button
                type="submit"
                className="newsletter-submit-btn px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom border-t border-gray-800 pt-8">
          <div className="footer-bottom-content flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="copyright-section">
              <p className="copyright-text text-gray-400 text-sm">© 2024 Connect Hire. All rights reserved.</p>
            </div>

            <div className="legal-links-section">
              <ul className="legal-links-list flex flex-wrap justify-center md:justify-end space-x-6">
                {footerSections.legal.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="legal-link text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
