import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorDashboard.css";

const AppointmentModal = ({ appointment, onClose, onDelete }) => {
  if (!appointment) return null;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      await onDelete(appointment.id);
      onClose();
    }
  };

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
          <button onClick={handleDelete} className="delete-button">
            Delete Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const navigate = useNavigate();

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const filteredAppointments = selectedDay
    ? appointments.filter((app) => app.appointmentTime.startsWith(selectedDay))
    : appointments;

  useEffect(() => {
    fetchDoctorInfo();
    fetchAppointments();
  }, []);

  const fetchDoctorInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8585/doctors/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch doctor info");
      const data = await response.json();
      setDoctorInfo(data);
    } catch (err) {
      console.error("Error fetching doctor info:", err);
    }
  };

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

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8585/appointments/${appointmentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }

      setAppointments(appointments.filter((app) => app.id !== appointmentId));
      setSuccess("Appointment deleted successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="sidebar">
          <div className="sidebar-header">
            <h3>Filter by Day</h3>
          </div>
          <div className="day-filters">
            <button
              className={`day-filter ${!selectedDay ? "active" : ""}`}
              onClick={() => setSelectedDay(null)}
            >
              All Days
            </button>
            {days.map((day) => (
              <button
                key={day}
                className={`day-filter ${selectedDay === day ? "active" : ""}`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="main-content">
          <div className="dashboard-header">
            <div className="doctor-info">
              <h1>Doctor Dashboard</h1>
              {doctorInfo && (
                <h2 className="doctor-details">
                  Dr. {doctorInfo.name} - {doctorInfo.specialization}
                </h2>
              )}
            </div>
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
          {success && <div className="success-message">{success}</div>}

          {loading ? (
            <div className="loading">Loading appointments...</div>
          ) : (
            <div className="appointments-grid">
              {filteredAppointments.length === 0 ? (
                <div className="no-appointments">
                  {selectedDay
                    ? `No appointments scheduled for ${selectedDay}`
                    : "No appointments scheduled"}
                </div>
              ) : (
                filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="appointment-card"
                    onClick={() => handleCardClick(appointment)}
                  >
                    <div className="appointment-header">
                      <h3 className="patient-name">
                        {appointment.patientName}
                      </h3>
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
        </div>
      </div>

      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onDelete={handleDeleteAppointment}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;
