

import secureApi from "./secureApi";

// ---------- Jobs ----------
export const getJobs = async (params = {}) => {
  // params: { q, location, type, page, limit, ... }
  const { data } = await secureApi.get("/jobs", { params });
  return data;
};

export const getJobById = async (jobId) => {
  const { data } = await secureApi.get(`/jobs/${jobId}`);
  return data;
};

export const applyJob = async (jobId, payload = {}) => {
  // payload: { coverLetter, resumeUrl, answers: {...} }
  const { data } = await secureApi.post(`/jobs/${jobId}/apply`, payload);
  return data;
};

export const saveJob = async (jobId) => {
  const { data } = await secureApi.post(`/jobs/${jobId}/save`);
  return data;
};

export const unsaveJob = async (jobId) => {
  const { data } = await secureApi.delete(`/jobs/${jobId}/save`);
  return data;
};

// ---------- Applications ----------
export const getApplications = async (params = {}) => {
  // params: { status, page, limit }
  const { data } = await secureApi.get("/user/applications", { params });
  return data;
};

// ---------- Profile ----------
export const getProfile = async () => {
  const { data } = await secureApi.get("/user/profile");
  return data;
};

export const updateProfile = async (payload) => {
  // payload: { fullName, headline, bio, skills:[], location, email, phone, portfolio, resume, avatar }
  const { data } = await secureApi.put("/user/profile", payload);
  return data;
};

export const updatePassword = async (payload) => {
  // payload: { oldPassword, newPassword }
  const { data } = await secureApi.put("/user/password", payload);
  return data;
};

// ---------- Messages (Direct/Threads) ----------
export const getConversations = async (params = {}) => {
  // params: { page, limit }
  const { data } = await secureApi.get("/user/messages/conversations", { params });
  return data;
};

export const getMessages = async (conversationId, params = {}) => {
  const { data } = await secureApi.get(`/user/messages/${conversationId}`, { params });
  return data;
};

export const sendMessage = async (conversationId, payload) => {
  // payload: { text } or { text, attachments:[...] }
  const { data } = await secureApi.post(`/user/messages/${conversationId}`, payload);
  return data;
};

// ---------- Notifications (optional) ----------
export const getNotifications = async (params = {}) => {
  const { data } = await secureApi.get("/user/notifications", { params });
  return data;
};

export const markNotificationRead = async (notificationId) => {
  const { data } = await secureApi.put(`/user/notifications/${notificationId}/read`);
  return data;
};

// ---------- Helpers (optional patterns) ----------
// Example: centralized try/catch wrapper if you prefer:
/*
const apiCall = async (fn) => {
  try {
    return await fn();
  } catch (err) {
    // log / toast here if needed
    throw err?.response?.data || err;
  }
};
*/
