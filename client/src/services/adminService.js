// src/services/adminService.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api", // adjust if needed
  withCredentials: true,
});

const adminService = {
  // Lists (support page, limit, search, filters)
  getEmployers: (page = 1, limit = 20, q = "", filters = {}) =>
    API.get("/admin/employers", { params: { page, limit, q, ...filters } }),

  getUsers: (page = 1, limit = 20, q = "", filters = {}) =>
    API.get("/admin/users", { params: { page, limit, q, ...filters } }),

  getJobs: (page = 1, limit = 20, q = "", filters = {}) =>
    API.get("/admin/jobs", { params: { page, limit, q, ...filters } }),

  getJob: (jobId) => API.get(`/admin/jobs/${jobId}`),

  // Reports / moderation queue
  getReports: (page = 1, limit = 20, q = "", filters = {}) =>
    API.get("/admin/reports", { params: { page, limit, q, ...filters } }),

  // Single actions: type could be 'suspend', 'restore', 'delete', 'flag', etc.
  takeAction: ({ type, targetType, targetId, reason = "" }) =>
    API.post("/admin/action", { type, targetType, targetId, reason }),

  // Bulk or export
  exportReports: (filters = {}) =>
    API.get("/admin/reports/export", { params: { ...filters }, responseType: "blob" }),

  // Dashboard summary
  getDashboardSummary: () => API.get("/admin/dashboard/summary"),
};

export default adminService;
