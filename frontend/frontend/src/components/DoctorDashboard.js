import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorDashboard.css";

const AppointmentModal = ({ appointment, onClose }) => {
  if (!appointment) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Appointment Details</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-content">
          <div className="appointment-info">
            <div className="info-row">
              <span className="info-label">Patient Name:</span>
              <span className="info-value">{appointment.patientName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{appointment.patientEmail}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Time:</span>
              <span className="info-value">{appointment.appointmentTime}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Reason:</span>
              <span className="info-value">{appointment.reason}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8585/appointments/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCardClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Doctor Dashboard</h1>
        <div className="button-group">
          <button onClick={() => navigate("/")} className="back-button">
            Home
          </button>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading appointments...</div>
      ) : (
        <div className="appointments-grid">
          {appointments.length === 0 ? (
            <div className="no-appointments">No appointments scheduled</div>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="appointment-card"
                onClick={() => handleCardClick(appointment)}
              >
                <div className="appointment-header">
                  <h3 className="patient-name">{appointment.patientName}</h3>
                </div>
                <div className="appointment-details">
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">
                      {appointment.patientEmail}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Time:</span>
                    <span className="detail-value">
                      {appointment.appointmentTime}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;
