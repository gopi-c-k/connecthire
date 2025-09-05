import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/AnkitaPages/layouts/MainLayout";
import Home from "./pages/AnkitaPages/Home";
import UserLogin from "./pages/AnkitaPages/Login/UserLogin";
import UserSignup from "./pages/AnkitaPages/Register/UserSignup";

import CompanyLogin from "./pages/AnkitaPages/Login/CompanyLogin";
import CompanySignup from "./pages/AnkitaPages/Register/CompanySignup";
import CompanyDashboard from "./pages/AnkitaPages/COMPANY/CompanyDashboard";


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

// Jobseeker layout + pages

import Dashboard from "./pages/AnkitaPages/JOBSEEKER/Dashboard";
import JobsList from "./pages/AnkitaPages/JOBSEEKER/Jobs/JobsList";
import JobDetail from "./pages/AnkitaPages/JOBSEEKER/Jobs/JobDetail";
import SavedJobs from "./pages/AnkitaPages/JOBSEEKER/Jobs/SavedJobs";

import Applications from "./pages/AnkitaPages/JOBSEEKER/Applications";
import Messages from "./pages/AnkitaPages/JOBSEEKER/Messages";
import NotificationsPage from "./pages/AnkitaPages/JOBSEEKER/Notifications";
import UserProfile from "./pages/AnkitaPages/JOBSEEKER/UserProfile";
import EditUserProfile from "./pages/AnkitaPages/JOBSEEKER/EditUserProfile";

// User Settings Layout + Pages
import UserSettingsLayout from "./pages/AnkitaPages/JOBSEEKER/UserSettings/UserSettingsLayout";
import UserAccountSettings from "./pages/AnkitaPages/JOBSEEKER/UserSettings/UserAccountSettings";
import UserProfileSettings from "./pages/AnkitaPages/JOBSEEKER/UserSettings/UserProfileSettings";
import UserPrivacySettings from "./pages/AnkitaPages/JOBSEEKER/UserSettings/UserPrivacySettings";

import UserReportSettings from "./pages/AnkitaPages/JOBSEEKER/UserSettings/UserReportSettings";

import UserDangerSettings from "./pages/AnkitaPages/JOBSEEKER/UserSettings/UserDangerSettings";



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
          
          <Route path="danger" element={<DangerSettings />} />
          <Route path="reports" element={<ReportSettings/>} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="account" element={<AccountSettings />} />

        </Route>

        <Route path="/company/job-post" element={<JobPosting />} />
        <Route path="/company/jobs" element={<ManageJobs />} />
        <Route path="/user/notifications" element={<NotificationsPage />} />
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
        <Route path="/user/messages" element={<Messages />} />
        <Route path="/user/messages/:conversationId" element={<Messages />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/profile/edit" element={<EditUserProfile />} />
        <Route path="/user/settings" element={<UserSettingsLayout />}>
          <Route index element={<UserAccountSettings />} />
          <Route path="account" element={<UserAccountSettings />} />
          <Route path="profile" element={<UserProfileSettings />} />
          <Route path="privacy" element={<UserPrivacySettings />} />

          <Route path="danger" element={<UserDangerSettings />} />
        </Route>


         <Route path="/user/applications" element={<Applications />} />
         <Route path="/user/messages" element={<Messages />} />
         <Route path="/user/messages/:conversationId" element={<Messages />} />
         <Route path="/user/profile" element={<UserProfile />} />
         <Route path="/user/profile/edit" element={<EditUserProfile />} />
         <Route path="/user/settings" element={<UserSettingsLayout />}>
         <Route index element={<UserAccountSettings />} />
         <Route path="account" element={<UserAccountSettings />} />
         <Route path="profile" element={<UserProfileSettings />} />
         <Route path="privacy" element={<UserPrivacySettings />} />
         <Route path="notifications" element={<UserNotificationSettings />} />
         <Route path="report" element={<UserReportSettings />} />
         <Route path="danger" element={<UserDangerSettings />} />
</Route>






        {/* Optional: 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
