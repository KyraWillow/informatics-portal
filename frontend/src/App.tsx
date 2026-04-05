import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";

// Pages
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Attendance from "@/pages/Attendance";
import Dashboard from "@/pages/Dashboard";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              {/* Member & Admin Routes */}
              <Route
                element={<ProtectedRoute allowedRoles={["MEMBER", "ADMIN"]} />}
              >
                <Route path="/attendance" element={<Attendance />} />
              </Route>

              {/* Admin Only Routes */}
              <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
