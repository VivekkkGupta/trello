import React, { useState, useEffect, createContext, useContext } from "react";
import { AdminData, UserData } from "../data/AuthData";
import TaskData from "../data/TaskData";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:5555"

export const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Navbar Page UseStates
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);

  // Login Page UseStates
  const [loginOrSignUpPage, setLoginOrSignUpPage] = useState(false);

  // Toggle Between Signup and Login Page
  const handleLoginOrSignUpPage = () => {
    setLoginOrSignUpPage(!loginOrSignUpPage);
  };

  // User Input data in an object
  const [userInputData, setUserInputData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // User Input Errors that will be manually set
  const [userInputErrors, setUserInputErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle all the inputboxes of user input
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

  // Function to check and set errors
  function checkAndSetErrors(inputData) {
    const errors = {};

    if (inputData.email === "") {
      errors.email = "Email is Required";
    } else if (!isValidEmail(inputData.email)) {
      errors.email = "Email is not valid";
    }

    if (inputData.password === "") {
      errors.password = "Password is Required";
    }

    return errors;
  }

  // Handle Signup and call create User from backend
  const handleSignUpClick = async () => {
    const errors = checkAndSetErrors(userInputData);

    if (Object.keys(errors).length === 0) {
      try {
        const res = await axios.post(`${BASE_URL}/userapi/createuser`, userInputData);
        // Handle response and error cases
        if (res.data.error) {
          alert(res.data.error); // Display the error message from the response
        } else {
          alert("User Created Successfully");
          setUserInputData({ username: "", email: "", password: "" });
          setUserInputErrors({ username: "", email: "", password: "" });
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          // Handle the specific case of email already being used
          alert("This email ID is already registered. Please use a different email.");
        } else {
          console.error("Error creating user:", error);
          alert("An unexpected error occurred. Please try again.");
        }
      }
    } else {
      setUserInputErrors(errors);
    }
  };

  // Handle Login Click by checking the user in database from backend
  const handleLoginButton = async () => {

    const errors = checkAndSetErrors(userInputData);

    if (Object.keys(errors).length === 0) {
      try {
        // Make an API call to the backend to check the credentials
        const response = await axios.post(`${BASE_URL}/userapi/login`, userInputData);

        if (response.data.message === "Login successful") {
          // Set the user data to local storage
          setLocalAuthData(response.data.user);
          getCurrentUserFromLocalStorageAndSave();
          setUserInputData({ email: "", password: "" });
          setUserInputErrors({ email: "", password: "" });
        } else {
          setUserInputErrors({
            ...userInputErrors,
            password: response.data.error, // Show the error message from the backend
          });
        }
      } catch (error) {
        if (error.response.status === 401) {
          setUserInputErrors({
            ...userInputErrors,
            password: "Invalid Credentials",
          });
        }
        else {
          setUserInputErrors({
            ...userInputErrors,
            password: "An error occurred. Please try again.",
          });
        }
        console.error("Error logging in:", error);
      }
    } else {
      setUserInputErrors(errors);
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

  // Reset user input data and errors after clicking on signup or login page
  useEffect(() => {
    setUserInputData({
      email: "",
      password: "",
    });
    setUserInputErrors({
      email: "",
      password: "",
    });
  }, [loginOrSignUpPage]);


  const getAllUsersApiCall = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/userapi/getusers`);
      return response.data; // Return fetched users directly
    } catch (error) {
      console.error("Error fetching users:", error);
      return []; // Return an empty array if there's an error
    }
  };

  const createTaskFromApiCall = async (task) => {
    try {
      const response = await axios.post(`${BASE_URL}/taskapi/createtask`, {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        state: task.state,
        assignedTo: task.assignedToObj,
        notes: task.notes,
      });
      const resultTaskData = response.data
      const resultTask = resultTaskData.TaskDetails
      return resultTask;
    } catch (error) {
      return `Error creating task: ${error.response?.data?.message || error.message}`;
    }
  };


  const getAllTasksApiCall = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/taskapi/getalltasks`);
      const tasks = response.data;
      return tasks
    } catch (error) {
      return `Error creating task: ${error.response?.data?.message || error.message}`;
    }
  }


  const editTaskFromApiCall = async (newUserObj) => {
    try {
      const response = await axios.put(`${BASE_URL}/taskapi/edittask/${newUserObj._id}`, newUserObj);
      const resultTaskData = response.data
      const resultTask = resultTaskData.TaskDetails
      return resultTask;
    } catch (error) {
      return `Error creating task: ${error.response?.data?.message || error.message}`;
    }
  };


  const [usersList, setUsersList] = useState([]);
  const fetchUsersData = async () => {
    const response = await getAllUsersApiCall();
    setUsersList(response.length > 0 ? response : []);
  };

  // Inside AuthContext.js
  const [allTasks, setAllTasks] = useState([]);

  const updateTask = (updatedTask) => {
    setAllTasks(prevTasks =>
      prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task)
    );
  };



  const values = {
    AdminData,
    UserData,
    TaskData,
    loginOrSignUpPage,
    setLoginOrSignUpPage,
    handleLoginOrSignUpPage,
    handleSignUpClick,
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
    getAllUsersApiCall,
    createTaskFromApiCall,
    getAllTasksApiCall,
    usersList, fetchUsersData,
    editTaskFromApiCall,
    allTasks, setAllTasks, updateTask

  };

  return <AuthContext.Provider value={values} > {children}</AuthContext.Provider >;
};
