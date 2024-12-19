import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPageLayout from "./components/Login/LoginPageLayout";
import UserLayout from "./components/User/UserLayout";
import { useAuthContext } from "./contexts/AuthContext";
import HomeLayout from "./components/User/HomeLayout/HomeLayout";
import BoardLayout from "./components/User/BoardLayout/BoardLayout";
import ReportsLayout from "./components/User/ReportsLayout/ReportsLayout";
import SettingsLayout from "./components/User/SettingsLayout/SettingsLayout";
import AdminPanelLayout from "./components/Admin/AdminPanelLayout";

function App() {
  const { currentUser, fetchInitialData } = useAuthContext();

  useEffect(() => {
    if (currentUser) {
      fetchInitialData();
    }
  }, [currentUser]); // Added isDataFetched to avoid infinite re-renders

  // Protected route component
  const ProtectedRoute = ({ children, role }) => {
    if (!currentUser) {
      return <Navigate to="/" replace />;
    }
    if (role && currentUser.role !== role) {
      return <Navigate to="/home" replace />;
    }
    return children;
  };

  return (
    <Router future={{ v7_startTransition: true }}>
      <div className="relative h-screen w-full font-roboto">
        <Routes>
          {/* Public Route */}
          <Route path="/" element={!currentUser ? <LoginPageLayout /> : <Navigate to="/home" replace />} />

          {/* User Protected Routes */}
          <Route
            path="/home"
            element={
              <UserLayout>
                {!currentUser ? <Navigate to="/" replace /> : currentUser.role === "admin" ? <HomeLayout /> : <HomeLayout />}
              </UserLayout>
            }
          />

          <Route
            path="/adminpanel"
            element={
              <ProtectedRoute>
                <UserLayout>
                  <AdminPanelLayout />
                </UserLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/board"
            element={
              <ProtectedRoute>
                <UserLayout>
                  <BoardLayout />
                </UserLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <UserLayout>
                  <ReportsLayout />
                </UserLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <UserLayout>
                  <SettingsLayout />
                </UserLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
