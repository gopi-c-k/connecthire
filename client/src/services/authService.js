const BASE = "http://localhost:5000";

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
  const res = await fetch(`${BASE}/company/signin`, {
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
  const res = await fetch(`${BASE}/company/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Signup failed");
  return data;
}
