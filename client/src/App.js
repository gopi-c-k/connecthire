import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/AnkitaPages/layouts/MainLayout";
import Home from "./pages/AnkitaPages/Home";
import UserLogin from "./pages/AnkitaPages/Login/UserLogin";
import UserSignup from "./pages/AnkitaPages/Register/UserSignup";

import CompanyLogin from "./pages/AnkitaPages/Login/CompanyLogin";
import CompanySignup from "./pages/AnkitaPages/Register/CompanySignup";
import CompanyDashboard from "./pages/AnkitaPages/COMPANY/CompanyDashboard";
import JobseekerProfile from "./pages/AnkitaPages/COMPANY/JobseekerProfile";
import JobseekersList from "./pages/AnkitaPages/COMPANY/JobseekersList";

import SettingsLayout from "./pages/AnkitaPages/COMPANY/Settings/SettingsLayout.jsx";
import AccountSettings from "./pages/AnkitaPages/COMPANY/Settings/AccountSettings";

import DangerSettings from "./pages/AnkitaPages/COMPANY/Settings/DangerSettings";
import ReportSettings from "./pages/AnkitaPages/COMPANY/Settings/ReportSettings";


import SecuritySettings from "./pages/AnkitaPages/COMPANY/Settings/SecuritySettings.jsx";


import JobPosting from "./pages/AnkitaPages/COMPANY/JobPosting";
import ManageJobs from "./pages/AnkitaPages/COMPANY/ManageJobs";
import EditJob from "./pages/AnkitaPages/COMPANY/EditJob.jsx";
import JobDetails from "./pages/AnkitaPages/COMPANY/JobDetails";
import ApplicantsHub from "./pages/AnkitaPages/COMPANY/ApplicantsHub.jsx";
import EditCompanyProfile from "./pages/AnkitaPages/COMPANY/EditCompanyProfile.jsx";
import CompanyProfile from "./pages/AnkitaPages/COMPANY/CompanyProfile";
import CompanyMessages from "./pages/AnkitaPages/COMPANY/Messages";
import CompanyNotificationsPage from "./pages/AnkitaPages/COMPANY/Notifications";
// Jobseeker layout + pages

import Dashboard from "./pages/AnkitaPages/JOBSEEKER/Dashboard";
import JobsList from "./pages/AnkitaPages/JOBSEEKER/Jobs/JobsList";
import JobDetail from "./pages/AnkitaPages/JOBSEEKER/Jobs/JobDetail";
import SavedJobs from "./pages/AnkitaPages/JOBSEEKER/Jobs/SavedJobs";

import Applications from "./pages/AnkitaPages/JOBSEEKER/Applications";
import UserNotificationsPage from "./pages/AnkitaPages/JOBSEEKER/UserNotifications";
import UserMessages from "./pages/AnkitaPages/JOBSEEKER/UserMessages";

import UserProfile from "./pages/AnkitaPages/JOBSEEKER/UserProfile";
import CompanyProfileForJobSeeker from "./pages/AnkitaPages/JOBSEEKER/CompanyProfileForJobSeeker.jsx";

// User Settings Layout + Pages
import UserSettingsLayout from "./pages/AnkitaPages/JOBSEEKER/UserSettings/UserSettingsLayout";
import UserAccountSettings from "./pages/AnkitaPages/JOBSEEKER/UserSettings/UserAccountSettings";
import UserProfileSettings from "./pages/AnkitaPages/JOBSEEKER/UserSettings/UserProfileSettings";
import UserPrivacySettings from "./pages/AnkitaPages/JOBSEEKER/UserSettings/UserPrivacySettings";

import UserReportSettings from "./pages/AnkitaPages/JOBSEEKER/UserSettings/UserReportSettings";

import UserDangerSettings from "./pages/AnkitaPages/JOBSEEKER/UserSettings/UserDangerSettings";


// ---------- ADMIN ----------
import AdminLogin from "./pages/AnkitaPages/Login/AdminLogin";
import AdminLayout from "./pages/AnkitaPages/layouts/AdminLayout";
import AdminDashboard from "./pages/AnkitaPages/admin/Dashboard";
import AdminEmployersList from "./pages/AnkitaPages/admin/EmployersList";
import AdminJobseekersList from "./pages/AnkitaPages/admin/JobseekersList";
import AdminJobsList from "./pages/AnkitaPages/admin/JobsList";
import AdminJobDetail from "./pages/AnkitaPages/admin/JobDetail";
import AdminReports from "./pages/AnkitaPages/admin/Reports";
import AdminJobSeeker from "./pages/AnkitaPages/admin/JobSeeker";
import AdminCompany from "./pages/AnkitaPages/admin/Company";

//-----Mainlayout Footer------
import About from "./pages/AnkitaPages/About";
import Careers from "./pages/AnkitaPages/Careers";
import Contact from "./pages/AnkitaPages/Contact";
import Terms from "./pages/AnkitaPages/Terms";
import Privacy from "./pages/AnkitaPages/Privacy";





function App() {
  return (
    <Router>
      <Routes>
        {/* Public + Main layout */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>

        {/* Auth */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/company/signup" element={<CompanySignup />} />

        {/* Company */}
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/company/messages" element={<CompanyMessages />} />
        <Route path="/company/notifications" element={<CompanyNotificationsPage />} />
        
        <Route path="/company/jobseekers" element={<JobseekersList />} />
        <Route path="/company/jobseeker/:jobSeekerId" element={<JobseekerProfile />} />

        <Route path="/company/Settings" element={<SettingsLayout />}>
        <Route index element={<CompanyProfile />} />
        <Route path="profile" element={<CompanyProfile />} />

          <Route path="danger" element={<DangerSettings />} />
          <Route path="reports" element={<ReportSettings />} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="account" element={<AccountSettings />} />

        </Route>

        <Route path="/company/job-post" element={<JobPosting />} />
        <Route path="/company/jobs" element={<ManageJobs />} />

        <Route path="/company/job/edit/:jobId" element={<EditJob />} />
        <Route path="/company/profile/edit" element={<EditCompanyProfile />} />
        <Route path="/company/job/:id" element={<JobDetails />} />
        <Route path="/company/job/:id/applicants" element={<ApplicantsHub />} />
        <Route path="/company/jobs/applicants" element={<ApplicantsHub />} />
        <Route path="/company/profile" element={<CompanyProfile />} />

        {/* ---------- JOBSEEKER (component-level layout like Company) ---------- */}
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/jobs" element={<JobsList />} />
        <Route path="/user/job/:id" element={<JobDetail />} />
        <Route path="/user/saved" element={<SavedJobs />} />


        <Route path="/user/applications" element={<Applications />} />
        <Route path="/user/messages" element={<UserMessages />} />
        <Route path="/user/messages/:conversationId" element={<UserMessages />} />
        <Route path="/user/notifications" element={<UserNotificationsPage />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/company-profile/:companyId" element={<CompanyProfileForJobSeeker />} />
        <Route path="/user/settings" element={<UserSettingsLayout />}>
          <Route index element={<UserProfileSettings />} />
          <Route path="account" element={<UserAccountSettings />} />
          <Route path="profile" element={<UserProfileSettings />} />
          <Route path="privacy" element={<UserPrivacySettings />} />
          <Route path="report" element={<UserReportSettings />} />
          <Route path="danger" element={<UserDangerSettings />} />
        </Route>




        {/* ---------- ADMIN ---------- */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="company" element={<AdminEmployersList />} />
          <Route path="jobseeker" element={<AdminJobseekersList />} />
          <Route path="jobs" element={<AdminJobsList />} />
          <Route path="jobs/:id" element={<AdminJobDetail />} />
          <Route path="jobseeker/:id" element={<AdminJobSeeker />} />
          <Route path="company/:id" element={<AdminCompany />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
