import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPageLayout from "./components/Login/LoginPageLayout";
import UserLayout from "./components/User/UserLayout";
import Admindashboard from "./components/Admin/Admindashboard";
import { useAuthContext } from "./contexts/AuthContext";
import HomeLayout from "./components/User/HomeLayout/HomeLayout";
import BoardLayout from "./components/User/BoardLayout/BoardLayout";
import ReportsLayout from "./components/User/ReportsLayout/ReportsLayout";
import SettingsLayout from "./components/User/SettingsLayout/SettingsLayout";

function App() {
  const { currentUser, getLocalAuthData,updateTask } = useAuthContext();

  useEffect(() => {
    getLocalAuthData()
    updateTask()
  }, [currentUser])

  // Protected route component
  const ProtectedRoute = ({ children, role }) => {
    if (!currentUser) {
      return <Navigate to="/" replace />;
    }
    if (role && currentUser.role !== role) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="relative h-screen w-full font-roboto">
        <Routes>
          {/* Public Route */}
          <Route path="/" element={!currentUser ? <LoginPageLayout /> : <Navigate to="/home" replace />} />

          {/* Admin Protected Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Admindashboard />
              </ProtectedRoute>
            }
          />

          {/* User Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <UserLayout>
                  <HomeLayout />
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
