import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // Replace with your backend URL
});

// Add a token to requests for protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// api.js
export const bookAppointment = async (appointmentData) => {
  const response = await fetch("http://localhost:3000/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointmentData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
export const doctorLogin = (credentials) =>
  API.post("/auth/login", credentials);
export const getDoctorAppointments = () => API.get("/appointments/dashboard");

export default API;
