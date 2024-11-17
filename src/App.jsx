import React from "react";
import Loginpage from "./components/Login/Loginpage";
import Userdashboard from "./components/User/Userdashboard";
import { useAuthContext } from "./contexts/AuthContext";
import Admindashboard from "./components/Admin/Admindashboard";

function App() {
  const { currentUser } = useAuthContext();

  return (
    <div className="relative h-screen w-full font-roboto">
      {currentUser ? (
        currentUser["role"] === "admin" ? <Admindashboard /> : <Userdashboard />) : <Loginpage />
      }
    </div>
  );
}

export default App;
