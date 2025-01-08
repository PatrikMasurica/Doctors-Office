import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AppointmentForm.css";

const AppointmentForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: null,
    patientName: "",
    patientEmail: "",
    appointmentTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:8585/doctors");
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError("Failed to load doctors.");
      }
    };

    fetchDoctors();
  }, []);

  const handleDoctorChange = (e) => {
    const selectedDoctorId = parseInt(e.target.value, 10);
    setFormData({ ...formData, doctorId: selectedDoctorId });

    const selectedDoctor = doctors.find(
      (doctor) => doctor.id === selectedDoctorId
    );
    if (selectedDoctor) {
      setAvailableSlots(
        Array.isArray(selectedDoctor.availableSlots)
          ? selectedDoctor.availableSlots
          : JSON.parse(selectedDoctor.availableSlots)
      );
    } else {
      setAvailableSlots([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const appointmentData = {
        doctorId: parseInt(formData.doctorId),
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        appointmentTime: formData.appointmentTime,
      };

      const response = await fetch("http://localhost:8585/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to book appointment");
      }

      setSuccess("Appointment booked successfully!");
      setFormData({
        doctorId: null,
        patientName: "",
        patientEmail: "",
        appointmentTime: "",
      });
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="clinic-name">
        <h1>HealthBridge Medical Center</h1>
        <p>Your Bridge to Better Health</p>
      </div>
      <div className="auth-buttons">
        <button onClick={() => navigate("/login")} className="auth-button">
          Doctor Login
        </button>
        <button onClick={() => navigate("/signup")} className="auth-button">
          Doctor Signup
        </button>
      </div>

      <h1>Book an Appointment</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Doctor:</label>
          <select
            value={formData.doctorId || ""}
            onChange={handleDoctorChange}
            required
          >
            <option value="">Select a Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Your Name:</label>
          <input
            type="text"
            value={formData.patientName}
            onChange={(e) =>
              setFormData({ ...formData, patientName: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Your Email:</label>
          <input
            type="email"
            value={formData.patientEmail}
            onChange={(e) =>
              setFormData({ ...formData, patientEmail: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Appointment Time:</label>
          <select
            value={formData.appointmentTime}
            onChange={(e) =>
              setFormData({ ...formData, appointmentTime: e.target.value })
            }
            required
          >
            <option value="">Select Time</option>
            {availableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot} {/* Displays both day and time (e.g., "Monday 09:00") */}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
