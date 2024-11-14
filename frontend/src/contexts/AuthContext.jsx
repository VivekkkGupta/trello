import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { AdminData, UserData } from "../data/AuthData";
import TaskData from "../data/TaskData";

const BASE_URL = "https://trello-backend-qm01.onrender.com";

export const AuthContext = createContext(null);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  // Local storage handling
  const getLocalAuthData = () => JSON.parse(localStorage.getItem("LocalAuthData")) || null;
  const setLocalAuthData = (data) => localStorage.setItem("LocalAuthData", JSON.stringify(data));

  // Authentication state and functions
  const [currentUser, setCurrentUser] = useState(getLocalAuthData());
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const [loginOrSignUpPage, setLoginOrSignUpPage] = useState(false);
  const [userInputData, setUserInputData] = useState({ username: "", email: "", password: "" });
  const [userInputErrors, setUserInputErrors] = useState({ username: "", email: "", password: "" });

  // Admin dashboard task management state
  const [currentTask, setCurrentTask] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Timestamp formatting
  const formatTimestamp = (timestamp) =>
    new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  // Validation
  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const checkAndSetErrors = (inputData) => {
    const errors = {};
    if (!inputData.email) errors.email = "Email is Required";
    else if (!isValidEmail(inputData.email)) errors.email = "Email is not valid";
    if (!inputData.password) errors.password = "Password is Required";
    return errors;
  };

  // Input handlers
  const handleInputBox = (e) => setUserInputData({ ...userInputData, [e.target.name]: e.target.value });
  const handleLoginOrSignUpPage = () => setLoginOrSignUpPage((prev) => !prev);

  // Authentication actions
  const handleSignUpClick = async () => {
    const errors = checkAndSetErrors(userInputData);
    if (Object.keys(errors).length > 0) return setUserInputErrors(errors);

    try {
      const res = await axios.post(`${BASE_URL}/userapi/createuser`, userInputData);
      if (res.data.error) alert(res.data.error);
      else {
        alert("User Created Successfully");
        setUserInputData({ username: "", email: "", password: "" });
        setUserInputErrors({ username: "", email: "", password: "" });
      }
    } catch (error) {
      alert(
        error.response?.status === 409
          ? "This email ID is already registered. Please use a different email."
          : "An unexpected error occurred. Please try again."
      );
    }
  };

  const handleLoginButton = async () => {
    const errors = checkAndSetErrors(userInputData);
    if (Object.keys(errors).length > 0) return setUserInputErrors(errors);

    try {
      const response = await axios.post(`${BASE_URL}/userapi/login`, userInputData);
      if (response.data.message === "Login successful") {
        setLocalAuthData(response.data.user);
        setCurrentUser(response.data.user);
        setUserInputData({ email: "", password: "" });
      } else {
        setUserInputErrors({ ...userInputErrors, password: response.data.error });
      }
    } catch (error) {
      setUserInputErrors({
        ...userInputErrors,
        password: error.response?.status === 401 ? "Invalid Credentials" : "An error occurred. Please try again.",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("LocalAuthData");
    setCurrentUser(null);
    setShowProfileDropDown(false);
  };

  // Task-related API calls
  const getAllUsersApiCall = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/userapi/getusers`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  const createTaskFromApiCall = async (task) => {
    try {
      const response = await axios.post(`${BASE_URL}/taskapi/createtask`, {
        ...task,
        assignedTo: task.assignedToObj,
      });
      return response.data.TaskDetails;
    } catch (error) {
      console.error("Error creating task:", error);
      return `Error creating task: ${error.response?.data?.message || error.message}`;
    }
  };

  const getAllTasksApiCall = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/taskapi/getalltasks`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return `Task is Empty or ${error.response?.data?.message || error.message}`;
    }
  };

  const editTaskFromApiCall = async (newTaskObj) => {
    try {
      const response = await axios.put(`${BASE_URL}/taskapi/edittask/${newTaskObj._id}`, newTaskObj);
      return response.data.TaskDetails;
    } catch (error) {
      console.error("Error editing task:", error);
      return `Error editing task: ${error.response?.data?.message || error.message}`;
    }
  };

  // Task functions
  const updateTask = (updatedTask) =>
    setAllTasks((prevTasks) => prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));


  const handleCurrentTaskInAdminDashboard = (task) => {
    setCurrentTask(task);
  };

  const handleUserChange = async (e) => {
    const newAssignedUserId = e.target.value;
    const newAssignedUserObj = usersList.find((user) => user._id === newAssignedUserId);
    if (!newAssignedUserObj) return;

    try {
      const resultTask = await editTaskFromApiCall({
        ...currentTask,
        assignedTo: newAssignedUserObj,
        notes: [
          ...currentTask.notes,
          {
            userDetails: currentUser,
            noteId: Date.now(),
            text: `Task reassigned to ${newAssignedUserObj.username} by ${currentUser.username}`,
            timestamp: new Date(),
            isComment: false,
          },
        ],
      });
      setCurrentTask(resultTask);
      updateTask(resultTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleStateChange = async (e) => {
    const newState = e.target.value;
    try {
      const resultTask = await editTaskFromApiCall({
        ...currentTask,
        state: newState,
        notes: [
          ...currentTask.notes,
          {
            userDetails: currentUser,
            noteId: Date.now(),
            text: `Task status changed to ${newState} by ${currentUser.username}`,
            timestamp: new Date(),
            isComment: false,
          },
        ],
      });
      setCurrentTask(resultTask);
      updateTask(resultTask);
    } catch (error) {
      console.error("Error updating task state:", error);
    }
  };

  const addNote = (text, isComment = false) => {
    const updatedTask = {
      ...currentTask,
      notes: [
        ...currentTask.notes,
        {
          userDetails: currentUser,
          noteId: Date.now(), // Unique note ID
          text,
          timestamp: new Date(),
          isComment, // Flag to distinguish between notes and comments
        },
      ],
    };
    return updatedTask;
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const updatedTask = addNote(newComment.trim(), true);
      await editTaskFromApiCall(updatedTask)
      setCurrentTask(updatedTask);
      setNewComment("");
    }
  };

  // Data fetching on mount
  useEffect(() => {
    fetchUsersData();
    fetchTasksData();
  }, []);

  const fetchUsersData = async () => {
    const users = await getAllUsersApiCall();
    setUsersList(users);
  };

  const fetchTasksData = async () => {
    const tasks = await getAllTasksApiCall();
    setAllTasks(tasks);
    setFilteredTasks(tasks);
  };

  const values = {
    AdminData,
    UserData,
    TaskData,
    currentUser,
    showProfileDropDown,
    loginOrSignUpPage,
    userInputData,
    userInputErrors,
    usersList,
    allTasks,
    filteredTasks,
    currentTask,
    newComment,
    setShowProfileDropDown,
    setNewComment,
    setFilteredTasks,
    handleLoginOrSignUpPage,
    handleSignUpClick,
    handleLoginButton,
    handleLogout,
    handleInputBox,
    formatTimestamp,
    fetchUsersData,
    fetchTasksData,
    createTaskFromApiCall,
    editTaskFromApiCall,
    updateTask,
    handleUserChange,
    handleStateChange,
    setCurrentTask,
    handleAddComment,
    addNote,
    getAllUsersApiCall,
    handleCurrentTaskInAdminDashboard
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
