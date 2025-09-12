// src/services/authService.js
const BASE = process.env.REACT_APP_BASE || "https://connecthire.onrender.com";

function getHeaders(withAuth = false) {
  const headers = { "Content-Type": "application/json" };
  if (withAuth) {
    const token = localStorage.getItem("accessToken");
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

/* -------------------------
   Email / Password logins
   ------------------------- */
export async function loginAdmin(email, password) {
  const res = await fetch(`${BASE}/user/signin`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE}/user/signin`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}

export async function loginCompany(email, password) {
  const res = await fetch(`${BASE}/user/signin`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}

/* -------------------------
   Google OAuth
   ------------------------- */
export async function loginWithGoogle(id_token) {
  if (!id_token) throw new Error("Missing Google id_token");
  const res = await fetch(`${BASE}/user/google`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ id_token }),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Google login failed");
  return data;
}

/* -------------------------
   Forgot password (public endpoint, fetch only)
   - now accepts role and safely parses non-JSON responses
   ------------------------- */
export async function requestPasswordReset(email, role = "jobseeker") {
  if (!/\S+@\S+\.\S+/.test(email)) throw new Error("Invalid email");

  const res = await fetch(`${BASE}/user/forgot-password`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, role }),
  });

  // Read as text first to avoid JSON parse crash if backend returns HTML (404/fallback)
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (e) {
    // backend returned non-JSON (e.g., HTML) — surface message safely
    data = { message: text || `Request failed (${res.status})` };
  }

  if (!res.ok) throw new Error(data?.message || `Request failed (${res.status})`);
  return data;
}

/* -------------------------
   Signup
   ------------------------- */
export async function signupUser(payload) {
  const res = await fetch(`${BASE}/user/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Signup failed");
  return data;
}

export async function signupCompany(payload) {
  const res = await fetch(`${BASE}/user/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Signup failed");
  return data;
}

/* -------------------------
   Jobs
   ------------------------- */
export async function postJob(jobData) {
  const res = await fetch(`${BASE}/jobs`, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(jobData),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Job posting failed");
  return data;
}

/* -------------------------
   Logout
   ------------------------- */
export function logout() {
  localStorage.removeItem("accessToken");
  sessionStorage.clear();
}
