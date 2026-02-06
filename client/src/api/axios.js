import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ✅ IMPORTANT: logout ONLY on 401
API.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;

    // Only token-invalid cases should force logout
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // if you store it
      window.location.href = "/login";
    }

    // ❌ Do NOT logout on 403/404/500
    return Promise.reject(error);
  }
);

export default API;
