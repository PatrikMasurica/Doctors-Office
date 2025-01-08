import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppointmentForm from "./components/AppointmentForm";
import DoctorLogin from "./components/DoctorLogin";
import DoctorSignup from "./components/DoctorSignup";
import DoctorDashboard from "./components/DoctorDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppointmentForm />} />
        <Route path="/login" element={<DoctorLogin />} />
        <Route path="/signup" element={<DoctorSignup />} />
        <Route path="/dashboard" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
