const BASE = (process.env.REACT_APP_BASE || "").trim();
const API_VER = (process.env.REACT_APP_API_VERSION || "").trim();
const API_PREFIX = API_VER ? `/api/${API_VER}` : "";
const BASE_URL = `${BASE}${API_PREFIX}`;

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: "include", // IMPORTANT: send cookies
    headers: isForm ? headers : { "Content-Type": "application/json", ...headers },
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });

  const raw = await res.text();
  let data = null;
  try { data = raw ? JSON.parse(raw) : null; } catch { data = raw || null; }

  if (!res.ok) {
    const message = typeof data === "string" ? data : data?.message || raw || `HTTP ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

function toQS(obj) {
  const pairs = Object.entries(obj || {}).filter(
    ([, v]) => v !== undefined && v !== null && v !== ""
  );
  if (!pairs.length) return "";
  const q = new URLSearchParams(pairs);
  return `?${q.toString()}`;
}

export const companyService = {
  // ---- Company Profile ----
  getCompanyProfile: () => request(`/company/profile`),
  updateCompanyProfile: (payload) =>
    request(`/company/profile`, { method: "PUT", body: payload }),

  // ---- Jobs ----
  listJobs: (params = {}) => request(`/company/jobs${toQS(params)}`),
  getJob: (id) => request(`/company/jobs/${id}`),
  createJob: (payload) => request(`/company/jobs`, { method: "POST", body: payload }),
  updateJob: (id, payload) => request(`/company/jobs/${id}`, { method: "PUT", body: payload }),
  deleteJob: (id) => request(`/company/jobs/${id}`, { method: "DELETE" }),

  // ---- Applicants ----
  listApplicants: (params = {}) => request(`/company/applicants${toQS(params)}`),
  listApplicantsByJob: (jobId, params = {}) =>
    request(`/company/jobs/${jobId}/applicants${toQS(params)}`),
  updateApplicantStatus: (applicantId, payload) =>
    request(`/company/applicants/${applicantId}/status`, { method: "PUT", body: payload }),

  // ---- Messages ----
  listConversations: () => request(`/company/messages`),
  getConversation: (id) => request(`/company/messages/${id}`),
  sendMessage: (id, payload) =>
    request(`/company/messages/${id}`, { method: "POST", body: payload }),

  // ---- Settings ----
  getSettings: () => request(`/company/settings`),
  updateSettings: (payload) => request(`/company/settings`, { method: "PUT", body: payload }),
};


// 👇 Export as a service object (for cleaner imports)
export const companyService = {
  getCompanyProfile,
  updateCompanyProfile,
};

