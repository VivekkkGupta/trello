import React from "react";
import Loginpage from "./components/Login/Loginpage";
import Userdashboard from "./components/User/Userdashboard";
import { useAuthContext } from "./contexts/AuthContext";

function App() {
  const { currentUser } = useAuthContext();

  return (
    <div className="relative h-screen w-full font-roboto">
      {currentUser["role"] === "admin" ? <Loginpage /> : <Userdashboard />}
    </div>
  );
}

export default App;
