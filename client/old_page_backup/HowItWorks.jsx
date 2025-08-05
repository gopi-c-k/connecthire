import { UserPlus, BadgeCheck, Handshake, ArrowRight } from "lucide-react"

const HowItWorks = () => {
  const processSteps = [
    {
      id: "step-signup",
      stepNumber: "01",
      icon: <UserPlus className="w-10 h-10 text-white" />,
      title: "Create Account",
      description:
        "Sign up in minutes and choose your path - whether you're a talented developer or a growing company.",
      details: ["Quick registration process", "Email verification", "Profile setup wizard"],
    },
    {
      id: "step-profile",
      stepNumber: "02",
      icon: <BadgeCheck className="w-10 h-10 text-white" />,
      title: "Build Profile",
      description: "Showcase your expertise, set preferences, and let our AI matching system understand your needs.",
      details: ["Skills assessment", "Portfolio upload", "Preference settings"],
    },
    {
      id: "step-connect",
      stepNumber: "03",
      icon: <Handshake className="w-10 h-10 text-white" />,
      title: "Start Connecting",
      description: "Browse opportunities, connect with matches, and begin building successful partnerships.",
      details: ["Smart matching", "Direct messaging", "Project collaboration"],
    },
  ]

  return (
    <section id="how-it-works-section" className="process-container py-20 bg-white">
      <div className="process-content-wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="process-header text-center mb-16">
          <div className="section-badge inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
            Simple Process
          </div>
          <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
          <p className="section-subtitle text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get started in three simple steps and connect with the right opportunities in no time
          </p>
        </div>

        {/* Process Steps */}
        <div className="process-steps-grid grid md:grid-cols-3 gap-8 lg:gap-12">
          {processSteps.map((step, index) => (
            <div key={step.id} className="process-step-card relative">
              {/* Connection Line (hidden on mobile) */}
              {index < processSteps.length - 1 && (
                <div className="step-connector hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-emerald-300 to-emerald-200 z-0">
                  <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-4 h-4 text-emerald-400" />
                </div>
              )}

              {/* Step Card */}
              <div className="step-card text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-emerald-200 relative z-10">
                {/* Step Number */}
                <div className="step-number absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-emerald-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.stepNumber}
                </div>

                {/* Step Icon */}
                <div className="step-icon-wrapper w-20 h-20 bg-gradient-to-br from-emerald-700 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Step Content */}
                <div className="step-content">
                  <h3 className="step-title text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="step-description text-gray-600 mb-6 leading-relaxed">{step.description}</p>

                  {/* Step Details */}
                  <ul className="step-details-list space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="step-detail flex items-center justify-center text-sm text-emerald-700">
                        <span className="detail-bullet w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="process-cta text-center mt-16 p-8 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200">
          <h3 className="cta-title text-2xl font-bold text-emerald-900 mb-4">Ready to Get Started?</h3>
          <p className="cta-description text-emerald-700 mb-6">
            Join thousands of professionals who have already found success on our platform
          </p>
          <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <button className="cta-primary-btn px-8 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors font-semibold shadow-md hover:shadow-lg">
              Start Your Journey
            </button>
            <button className="cta-secondary-btn px-8 py-3 border-2 border-emerald-700 text-emerald-700 rounded-lg hover:bg-emerald-700 hover:text-white transition-colors font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
