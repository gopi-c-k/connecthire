import { Star, Quote } from "lucide-react"

const testimonialData = [
  {
    id: "testimonial-sarah",
    quote:
      "Connect Hire transformed my career completely. Within two weeks, I landed a remote position with an amazing company that values my skills. The platform's quality of opportunities is unmatched, and the entire process was seamless.",
    name: "Sarah Chen",
    title: "Senior Full-Stack Developer",
    company: "TechFlow Inc.",
    image: "/assets/user1.jpg",
    rating: 5,
    location: "San Francisco, CA",
  },
  {
    id: "testimonial-michael",
    quote:
      "As a startup founder, finding the right developers was our biggest challenge. Connect Hire provided us with pre-vetted talent that perfectly matched our culture and technical needs. We built our entire development team through this platform!",
    name: "Michael Rodriguez",
    title: "CEO & Founder",
    company: "TechStart Inc.",
    image: "/assets/user1.jpg",
    rating: 5,
    location: "Austin, TX",
  },
  {
    id: "testimonial-priya",
    quote:
      "The level of professionalism and support on Connect Hire is exceptional. I've worked with multiple clients through the platform, and each experience has been outstanding. It's truly a game-changer for freelancers.",
    name: "Priya Sharma",
    title: "UI/UX Designer",
    company: "Freelancer",
    image: "/assets/user1.jpg",
    rating: 5,
    location: "Mumbai, India",
  },
]

const Testimonials = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <section
      id="testimonials-section"
      className="testimonials-container py-20 bg-gradient-to-br from-gray-50 to-emerald-50"
    >
      <div className="testimonials-content-wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="testimonials-header text-center mb-16">
          <div className="section-badge inline-block px-4 py-2 bg-emerald-200 text-emerald-800 rounded-full text-sm font-medium mb-4">
            Success Stories
          </div>
          <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Community Says</h2>
          <p className="section-subtitle text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from developers and companies who have transformed their careers and businesses through our platform
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid lg:grid-cols-3 gap-8">
          {testimonialData.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-white p-8 lg:p-10 rounded-2xl relative shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-emerald-200 group"
            >
              {/* Quote Icon */}
              <div className="quote-icon absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-emerald-600" />
              </div>

              {/* Rating */}
              <div className="testimonial-rating flex items-center mb-4">
                <div className="stars-container flex space-x-1 mr-2">{renderStars(testimonial.rating)}</div>
                <span className="rating-text text-sm text-gray-500 font-medium">{testimonial.rating}.0</span>
              </div>

              {/* Quote */}
              <blockquote className="testimonial-quote text-gray-700 text-lg leading-relaxed mb-8 relative z-10 italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="author-info flex items-center">
                <div className="author-avatar mr-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={`${testimonial.name} testimonial`}
                    className="author-image w-16 h-16 rounded-full object-cover border-2 border-emerald-100 shadow-md"
                  />
                </div>
                <div className="author-details">
                  <h4 className="author-name font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="author-title text-emerald-700 text-sm font-medium">{testimonial.title}</p>
                  <p className="author-company text-gray-500 text-sm">{testimonial.company}</p>
                  <p className="author-location text-gray-400 text-xs mt-1">📍 {testimonial.location}</p>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="card-decoration absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="trust-indicators mt-16 text-center">
          <div className="trust-stats grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="trust-stat">
              <div className="stat-number text-3xl font-bold text-emerald-700">4.9/5</div>
              <div className="stat-label text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="trust-stat">
              <div className="stat-number text-3xl font-bold text-emerald-700">10K+</div>
              <div className="stat-label text-sm text-gray-600">Happy Users</div>
            </div>
            <div className="trust-stat">
              <div className="stat-number text-3xl font-bold text-emerald-700">95%</div>
              <div className="stat-label text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="trust-stat">
              <div className="stat-number text-3xl font-bold text-emerald-700">24/7</div>
              <div className="stat-label text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
