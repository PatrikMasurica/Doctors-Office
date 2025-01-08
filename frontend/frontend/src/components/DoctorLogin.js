import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorLogin.css";
import axios from "axios";

const DoctorLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8585/auth/login",
        credentials
      );
      localStorage.setItem("token", data.token); // Store JWT token
      setError(null);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data?.error || err.message);
      setError(
        err.response?.data?.error || "Login failed. Check your credentials."
      );
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate("/")} className="back-button">
        ← Back
      </button>
      <h1>Doctor Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default DoctorLogin;
