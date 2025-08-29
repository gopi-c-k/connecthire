import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/AnkitaPages/layouts/MainLayout";
import Home from "./pages/AnkitaPages/Home";
import UserLogin from "./pages/AnkitaPages/Login/UserLogin";
import UserSignup from "./pages/AnkitaPages/Register/UserSignup";

import CompanyLogin from "./pages/AnkitaPages/Login/CompanyLogin";
import CompanySignup from "./pages/AnkitaPages/Register/CompanySignup";
import CompanyDashboard from "./pages/AnkitaPages/COMPANY/CompanyDashboard";
import SettingsLayout from "./pages/AnkitaPages/COMPANY/SettingsLayout.jsx";
import ChangePassword from "./pages/AnkitaPages/COMPANY/ChangePassword.jsx";

import BillingSettings from "./pages/AnkitaPages/COMPANY/Settings/BillingSettings.jsx";
import ComplianceSettings from "./pages/AnkitaPages/COMPANY/Settings/ComplianceSettings.jsx";
import NotificationSettings from "./pages/AnkitaPages/COMPANY/Settings/NotificationSettings.jsx";
import SecuritySettings from "./pages/AnkitaPages/COMPANY/Settings/SecuritySettings.jsx";
import SupportSettings from "./pages/AnkitaPages/COMPANY/Settings/SupportSettings.jsx";
import TeamSettings from "./pages/AnkitaPages/COMPANY/Settings/TeamSettings.jsx";

import JobPosting from "./pages/AnkitaPages/COMPANY/JobPosting";
import ManageJobs from "./pages/AnkitaPages/COMPANY/ManageJobs";
import EditJob from "./pages/AnkitaPages/COMPANY/EditJob.jsx";
import JobDetails from "./pages/AnkitaPages/COMPANY/JobDetails";
import ApplicantsHub from "./pages/AnkitaPages/COMPANY/ApplicantsHub.jsx";
import EditCompanyProfile from "./pages/AnkitaPages/COMPANY/EditCompanyProfile.jsx";
import CompanyProfile from "./pages/AnkitaPages/COMPANY/CompanyProfile";

// Jobseeker layout + pages

import Dashboard from "./pages/AnkitaPages/JOBSEEKER/Dashboard";
import JobsList from "./pages/AnkitaPages/JOBSEEKER/Jobs/JobsList";
import JobDetail from "./pages/AnkitaPages/JOBSEEKER/Jobs/JobDetail";
import SavedJobs from "./pages/AnkitaPages/JOBSEEKER/Jobs/SavedJobs";

import Applications from "./pages/AnkitaPages/JOBSEEKER/Applications";
import Messages from "./pages/AnkitaPages/JOBSEEKER/Messages";
import UserProfile from "./pages/AnkitaPages/JOBSEEKER/UserProfile";
import EditUserProfile from "./pages/AnkitaPages/JOBSEEKER/EditUserProfile";



function App() {
  return (
    <Router>
      <Routes>
        {/* Public + Main layout */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Auth */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/company/signup" element={<CompanySignup />} />

        {/* Company */}
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/company/Settings" element={<SettingsLayout />}>
          <Route index element={<CompanyProfile />} />
          <Route path="profile" element={<CompanyProfile />} />
          <Route path="team" element={<TeamSettings />} />
          <Route path="notifications" element={<NotificationSettings />} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="billing" element={<BillingSettings />} />
          <Route path="compliance" element={<ComplianceSettings />} />
          <Route path="support" element={<SupportSettings />} />
        </Route>
        <Route path="/company/Change-Password" element={<ChangePassword />} />
        <Route path="/company/job-post" element={<JobPosting />} />
        <Route path="/company/jobs" element={<ManageJobs />} />
        <Route path="/company/jobs/edit/:jobId" element={<EditJob />} />
        <Route path="/company/profile/edit" element={<EditCompanyProfile />} />
        <Route path="/company/jobs/:id" element={<JobDetails />} />
        <Route path="/company/jobs/:id/applicants" element={<ApplicantsHub />} />
        <Route path="/company/profile" element={<CompanyProfile />} />

       {/* ---------- JOBSEEKER (component-level layout like Company) ---------- */}
         <Route path="/user/dashboard" element={<Dashboard />} />
         <Route path="/user/jobs" element={<JobsList />} />
         <Route path="/user/jobs/:id" element={<JobDetail />} />
         <Route path="/user/saved" element={<SavedJobs />} />

         <Route path="/user/applications" element={<Applications />} />
         <Route path="/user/messages" element={<Messages />} />
         <Route path="/user/messages/:conversationId" element={<Messages />} />
         <Route path="/user/profile" element={<UserProfile />} />
         <Route path="/user/profile/edit" element={<EditUserProfile />} />
         


        {/* Optional: 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
