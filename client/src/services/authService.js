const BASE = "https://connecthire.onrender.com";


function getHeaders(withAuth = false) {
  const headers = { "Content-Type": "application/json" };
  if (withAuth) {
    const token = localStorage.getItem("accessToken");
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE}/user/signin`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
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
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}

export async function signupUser(payload) {
  const res = await fetch(`${BASE}/user/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
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
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Signup failed");
  return data;
}

export async function postJob(jobData) {
  const res = await fetch(`${BASE}/jobs`, {
    method: "POST",
    headers: getHeaders(true),  // if your backend requires auth for posting jobs
    body: JSON.stringify(jobData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Job posting failed");
  return data;
}