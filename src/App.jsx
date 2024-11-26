import React from "react";
import LoginPageLayout from "./components/Login/LoginPageLayout";
import Userdashboard from "./components/User/Userdashboard";
import { useAuthContext } from "./contexts/AuthContext";
import Admindashboard from "./components/Admin/Admindashboard";

function App() {
  const { currentUser } = useAuthContext();

  return (
    <div className="relative h-screen w-full font-roboto">
      {currentUser ? (
        currentUser["role"] === "admin" ? <Admindashboard /> : <Userdashboard />) : <LoginPageLayout />
      }
    </div>
  );
}

export default App;
