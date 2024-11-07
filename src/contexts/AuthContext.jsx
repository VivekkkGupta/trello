// AuthProvider.js
import React, { useState, useEffect, createContext, useContext } from "react";
import { AdminData, UserData } from "../data/AuthData";
import TaskData from "../data/TaskData";

export const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Navbar Page UseStates
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);

  // Login Page UseStates
  const [signupClicked, setSignupClicked] = useState(false);

  const handleSignupButton = () => {
    setSignupClicked(!signupClicked);
  };

  const [userInputData, setUserInputData] = useState({
    email: "",
    password: "",
  });

  const [userInputErrors, setUserInputErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputBox = (e) => {
    setUserInputData({
      ...userInputData,
      [e.target.name]: e.target.value,
    });
  };

  function isValidEmail(email) {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  }

  const handleLoginButton = () => {
    const errors = {};

    if (userInputData.email === "") {
      errors.email = "Email is Required";
    }

    if (userInputData.email !== "" && !isValidEmail(userInputData.email)) {
      errors.email = "Email is not valid";
    }

    if (userInputData.password === "") {
      errors.password = "Password is Required";
    }

    setUserInputErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Login logic here
      const user = UserData.find((user) => user.email === userInputData.email);
      const admin = AdminData.find(
        (user) => user.email === userInputData.email
      );

      if (admin && admin.password === userInputData.password) {
        setLocalAuthData(admin);
        getCurrentUserFromLocalStorageAndSave();
        setUserInputData({ email: "", password: "" });
      } else if (user && user.password === userInputData.password) {
        setLocalAuthData(user);
        getCurrentUserFromLocalStorageAndSave();
        setUserInputData({ email: "", password: "" });
      } else {
        setUserInputErrors({
          ...userInputErrors,
          password: "Invalid credentials",
        });
      }
    }
  };

  const getLocalAuthData = () => {
    return localStorage.getItem("LocalAuthData")
      ? JSON.parse(localStorage.getItem("LocalAuthData"))
      : null;
  };

  // Login Page
  const [currentUser, setCurrentUser] = useState(getLocalAuthData());

  const setLocalAuthData = (data) => {
    localStorage.setItem("LocalAuthData", JSON.stringify(data));
  };

  const getCurrentUserFromLocalStorageAndSave = () => {
    const currentUserData = getLocalAuthData();
    if (currentUserData) {
      setCurrentUser(currentUserData);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("LocalAuthData");
    setCurrentUser(null);
    setShowProfileDropDown(false);
  };

  useEffect(() => {
    getCurrentUserFromLocalStorageAndSave();
  }, []);

  const values = {
    AdminData,
    UserData,
    TaskData,  // Pass TaskData to the context value
    signupClicked,
    setSignupClicked,
    handleSignupButton,
    handleLoginButton,
    userInputData,
    setUserInputData,
    userInputErrors,
    setUserInputErrors,
    handleInputBox,
    currentUser,
    setCurrentUser,
    handleLogout,
    showProfileDropDown,
    setShowProfileDropDown,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
