import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorSignup.css";

const DoctorSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8585/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to sign up");
      }
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message || "Failed to sign up");
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate("/")} className="back-button">
        ← Back
      </button>
      <h1>Doctor Signup</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        <label>Specialization:</label>
        <input
          type="text"
          value={formData.specialization}
          onChange={(e) =>
            setFormData({ ...formData, specialization: e.target.value })
          }
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default DoctorSignup;
