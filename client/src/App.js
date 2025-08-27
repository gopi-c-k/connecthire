import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/AnkitaPages/layouts/MainLayout";
import Home from "./pages/AnkitaPages/Home";
import UserLogin from "./pages/AnkitaPages/Login/UserLogin";
import UserSignup from "./pages/AnkitaPages/Register/UserSignup";
import CompanyLogin from "./pages/AnkitaPages/Login/CompanyLogin";
import CompanySignup from "./pages/AnkitaPages/Register/CompanySignup";
import CompanyDashboard from "./pages/AnkitaPages/COMPANY/CompanyDashboard";
import Logout from "./pages/AnkitaPages/Logout";
import JobPosting from"./pages/AnkitaPages/COMPANY/JobPosting";
import ManageJobs from"./pages/AnkitaPages/COMPANY/ManageJobs";
import EditJob from"./pages/AnkitaPages/COMPANY/EditJob.jsx";
import JobDetails from"./pages/AnkitaPages/COMPANY/JobDetails";
import ViewApplicants from"./pages/AnkitaPages/COMPANY/ViewApplicants";
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
        <Route path="/logout" element={<Logout />} />
        <Route path="/company/job-post" element={<JobPosting />} />

         <Route path="/company/jobs" element={<ManageJobs />} />
         <Route path="/company/job/edit/:jobId" element={<EditJob />} />
         <Route path="/company/profile/edit" element={<EditCompanyProfile />} />

         <Route path="/company/jobs/:id" element={<JobDetails />} />
         <Route path="/company/jobs/:id/applicants" element={<ViewApplicants />} />
         
         <Route path="/company/profile" element={<CompanyProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
