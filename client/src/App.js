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




import JobPosting from"./pages/AnkitaPages/COMPANY/JobPosting";
import ManageJobs from"./pages/AnkitaPages/COMPANY/ManageJobs";
import EditJob from"./pages/AnkitaPages/COMPANY/EditJob.jsx";
import JobDetails from"./pages/AnkitaPages/COMPANY/JobDetails";
import ApplicantsHub from"./pages/AnkitaPages/COMPANY/ApplicantsHub.jsx";
import EditCompanyProfile from "./pages/AnkitaPages/COMPANY/EditCompanyProfile.jsx";
//import FreelancerProfile from"./pages/AnkitaPages/COMPANY/FreelancerProfile";
import CompanyProfile from "./pages/AnkitaPages/COMPANY/CompanyProfile";


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* future pages like /jobs etc go here */}
        </Route>
        
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/company/signup" element={<CompanySignup />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />

        {/* SETTINGS: parent + nested children */}
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
         <Route path="/company/job/edit/:jobId" element={<EditJob />} />
         <Route path="/company/profile/edit" element={<EditCompanyProfile />} />

         <Route path="/company/jobs/:id" element={<JobDetails />} />
         <Route path="/company/jobs/:id/applicants" element={<ApplicantsHub />} />
         
         <Route path="/company/profile" element={<CompanyProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
