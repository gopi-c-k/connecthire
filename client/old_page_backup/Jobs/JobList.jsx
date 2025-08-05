"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Filter,
  Briefcase,
  Users,
  Star,
  ChevronDown,
  Building2,
  Zap,
} from "lucide-react"

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [jobTypeFilter, setJobTypeFilter] = useState("")
  const [salaryFilter, setSalaryFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const jobListings = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechFlow Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $180k",
      posted: "2 days ago",
      description:
        "Join our innovative team building next-generation web applications with React, Node.js, and cloud technologies.",
      skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
      rating: 4.8,
      employees: "201-500",
      logo: "/placeholder.svg?height=60&width=60&text=TF",
      featured: true,
    },
    {
      id: 2,
      title: "Frontend React Developer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Contract",
      salary: "$80k - $120k",
      posted: "1 week ago",
      description:
        "Build beautiful, responsive user interfaces for our growing SaaS platform using modern React ecosystem.",
      skills: ["React", "JavaScript", "CSS", "Figma", "Git"],
      rating: 4.6,
      employees: "11-50",
      logo: "/placeholder.svg?height=60&width=60&text=SX",
      featured: false,
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$100k - $150k",
      posted: "3 days ago",
      description:
        "Manage and scale our cloud infrastructure while implementing CI/CD pipelines and monitoring solutions.",
      skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Python"],
      rating: 4.9,
      employees: "51-200",
      logo: "/placeholder.svg?height=60&width=60&text=CT",
      featured: true,
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "DesignStudio Pro",
      location: "New York, NY",
      type: "Part-time",
      salary: "$60k - $90k",
      posted: "5 days ago",
      description:
        "Create stunning user experiences and interfaces for web and mobile applications using design thinking principles.",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
      rating: 4.7,
      employees: "11-50",
      logo: "/placeholder.svg?height=60&width=60&text=DS",
      featured: false,
    },
    {
      id: 5,
      title: "Backend Python Developer",
      company: "DataCorp Analytics",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$110k - $160k",
      posted: "1 day ago",
      description:
        "Develop robust APIs and data processing systems using Python, Django, and modern database technologies.",
      skills: ["Python", "Django", "PostgreSQL", "Redis", "Docker"],
      rating: 4.5,
      employees: "201-500",
      logo: "/placeholder.svg?height=60&width=60&text=DC",
      featured: true,
    },
    {
      id: 6,
      title: "Mobile App Developer",
      company: "MobileFirst Inc.",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$95k - $140k",
      posted: "4 days ago",
      description: "Build cross-platform mobile applications using React Native and native iOS/Android technologies.",
      skills: ["React Native", "Swift", "Kotlin", "Firebase", "Redux"],
      rating: 4.4,
      employees: "51-200",
      logo: "/placeholder.svg?height=60&width=60&text=MF",
      featured: false,
    },
  ]

  const filteredJobs = jobListings.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (locationFilter === "" || job.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
      (jobTypeFilter === "" || job.type === jobTypeFilter)
    )
  })

  return (
    <div
      id="job-list-page"
      className="job-list-container min-h-screen pt-20 relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(59, 130, 246, 0.05) 100%),
          radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          linear-gradient(to bottom, #ffffff, #f0fdf4)
        `,
      }}
    >
      {/* Professional Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-emerald-300/20 via-violet-300/15 to-blue-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-violet-300/15 via-blue-300/20 to-emerald-300/15 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="job-list-content-wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Professional Header */}
        <div className="job-list-header text-center mb-12">
          <div className="header-badge inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-100 via-violet-100 to-blue-100 text-gray-800 rounded-full text-sm font-bold mb-8 border-2 border-emerald-200 shadow-xl">
            <Briefcase className="w-5 h-5 mr-3 text-emerald-600" />
            Find Your Dream Job
            <Star className="w-5 h-5 ml-3 text-violet-600 fill-current" />
          </div>
          <h1 className="page-title text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-emerald-700 via-violet-700 to-blue-700 bg-clip-text text-transparent">
              Browse Jobs
            </span>
          </h1>
          <p className="page-subtitle text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-semibold">
            Discover amazing opportunities from
            <span className="bg-gradient-to-r from-emerald-700 to-violet-700 bg-clip-text text-transparent font-black">
              {" "}
              top companies{" "}
            </span>
            worldwide
          </p>
        </div>

        {/* Enhanced Search and Filter Section */}
        <div className="search-filter-section bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-emerald-200 mb-12">
          <div className="search-bar-container flex flex-col lg:flex-row gap-6 mb-6">
            {/* Search Input */}
            <div className="search-input-wrapper flex-1 relative group">
              <Search className="search-icon absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-emerald-500 group-focus-within:text-emerald-700 transition-colors" />
              <input
                type="text"
                placeholder="Search jobs, skills, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input w-full pl-14 pr-6 py-4 border-2 border-emerald-200 rounded-2xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-300 bg-gradient-to-r from-emerald-50 to-violet-50 focus:from-white focus:to-white text-lg font-medium placeholder-gray-500"
              />
            </div>

            {/* Location Filter */}
            <div className="location-filter-wrapper relative group">
              <MapPin className="location-icon absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-violet-500 group-focus-within:text-violet-700 transition-colors" />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="location-input w-full lg:w-64 pl-14 pr-6 py-4 border-2 border-violet-200 rounded-2xl focus:ring-4 focus:ring-violet-200 focus:border-violet-500 transition-all duration-300 bg-gradient-to-r from-violet-50 to-blue-50 focus:from-white focus:to-white text-lg font-medium placeholder-gray-500"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="filter-toggle-btn px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-600 text-white rounded-2xl hover:from-blue-700 hover:via-blue-600 hover:to-emerald-700 transition-all duration-300 font-bold shadow-xl hover:shadow-blue-300 flex items-center space-x-3 hover:scale-105"
            >
              <Filter className="w-6 h-6" />
              <span>Filters</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="advanced-filters grid md:grid-cols-3 gap-6 pt-6 border-t-2 border-gradient-to-r from-emerald-200 via-violet-200 to-blue-200">
              <div className="job-type-filter">
                <label className="filter-label block text-sm font-bold text-gray-800 mb-2">Job Type</label>
                <select
                  value={jobTypeFilter}
                  onChange={(e) => setJobTypeFilter(e.target.value)}
                  className="filter-select w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gradient-to-r from-emerald-50 to-violet-50 font-medium"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="salary-filter">
                <label className="filter-label block text-sm font-bold text-gray-800 mb-2">Salary Range</label>
                <select
                  value={salaryFilter}
                  onChange={(e) => setSalaryFilter(e.target.value)}
                  className="filter-select w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gradient-to-r from-violet-50 to-blue-50 font-medium"
                >
                  <option value="">All Salaries</option>
                  <option value="50k-80k">$50k - $80k</option>
                  <option value="80k-120k">$80k - $120k</option>
                  <option value="120k+">$120k+</option>
                </select>
              </div>

              <div className="experience-filter">
                <label className="filter-label block text-sm font-bold text-gray-800 mb-2">Experience</label>
                <select className="filter-select w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gradient-to-r from-blue-50 to-emerald-50 font-medium">
                  <option value="">All Levels</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="lead">Lead/Principal</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Job Results Summary */}
        <div className="results-summary mb-8 flex justify-between items-center">
          <div className="results-count">
            <p className="text-lg font-bold text-gray-700">
              Found <span className="text-emerald-600 font-black">{filteredJobs.length}</span> jobs matching your
              criteria
            </p>
          </div>
          <div className="sort-options">
            <select className="sort-select px-4 py-2 border-2 border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-500 bg-gradient-to-r from-violet-50 to-blue-50 font-medium">
              <option>Sort by: Most Recent</option>
              <option>Sort by: Salary (High to Low)</option>
              <option>Sort by: Company Rating</option>
              <option>Sort by: Relevance</option>
            </select>
          </div>
        </div>

        {/* Enhanced Job Listings */}
        <div className="job-listings-grid space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className={`job-card bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 ${
                job.featured
                  ? "border-emerald-300 bg-gradient-to-r from-emerald-50/50 via-violet-50/50 to-blue-50/50"
                  : "border-gray-200 hover:border-violet-300"
              } group relative overflow-hidden`}
            >
              {/* Featured Badge */}
              {job.featured && (
                <div className="featured-badge absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-violet-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ Featured
                </div>
              )}

              <div className="job-card-content flex flex-col lg:flex-row gap-6">
                {/* Company Logo and Info */}
                <div className="company-info flex items-start space-x-4">
                  <div className="company-logo w-16 h-16 bg-gradient-to-br from-emerald-100 to-violet-100 rounded-2xl flex items-center justify-center shadow-lg border-2 border-emerald-200">
                    <Building2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="company-details">
                    <h3 className="job-title text-2xl font-black text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      {job.title}
                    </h3>
                    <div className="company-meta flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="company-name font-bold text-violet-700">{job.company}</span>
                      <div className="company-rating flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{job.rating}</span>
                      </div>
                      <div className="company-size flex items-center space-x-1">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span>{job.employees}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="job-details flex-1">
                  <p className="job-description text-gray-700 mb-4 leading-relaxed font-medium">{job.description}</p>

                  {/* Skills Tags */}
                  <div className="skills-tags flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className={`skill-tag px-3 py-1 rounded-full text-sm font-bold border-2 ${
                          index % 3 === 0
                            ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                            : index % 3 === 1
                              ? "bg-violet-100 text-violet-700 border-violet-300"
                              : "bg-blue-100 text-blue-700 border-blue-300"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Job Meta Information */}
                  <div className="job-meta flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
                    <div className="meta-item flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span className="font-medium">{job.location}</span>
                    </div>
                    <div className="meta-item flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-violet-500" />
                      <span className="font-medium">{job.type}</span>
                    </div>
                    <div className="meta-item flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{job.salary}</span>
                    </div>
                    <div className="meta-item flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{job.posted}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="job-actions flex flex-col space-y-3 lg:w-48">
                  <Link
                    to={`/jobs/apply/${job.id}`}
                    className="apply-btn px-6 py-3 bg-gradient-to-r from-emerald-600 via-violet-600 to-blue-600 text-white rounded-xl hover:from-emerald-700 hover:via-violet-700 hover:to-blue-700 transition-all duration-300 font-bold text-center shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Apply Now</span>
                  </Link>
                  <button className="save-btn px-6 py-3 border-2 border-violet-300 text-violet-700 rounded-xl hover:bg-violet-50 transition-all duration-300 font-bold text-center hover:scale-105">
                    Save Job
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Section */}
        <div className="load-more-section text-center mt-16">
          <button className="load-more-btn px-12 py-4 bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 text-white rounded-2xl hover:from-violet-700 hover:via-blue-700 hover:to-emerald-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105">
            Load More Jobs
          </button>
          <p className="load-more-text text-gray-600 mt-4 font-medium">
            Showing {filteredJobs.length} of 150+ available positions
          </p>
        </div>
      </div>
    </div>
  )
}

export default JobList
