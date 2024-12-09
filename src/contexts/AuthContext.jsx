import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const BASE_URL = "https://trello-backend-qm01.onrender.com";

export const AuthContext = createContext(null);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  // Local storage handling
  const getLocalAuthData = () => JSON.parse(localStorage.getItem("LocalAuthData")) || null;
  const setLocalAuthData = (data) => localStorage.setItem("LocalAuthData", JSON.stringify(data));

  // Authentication state and functions
  const [currentUser, setCurrentUser] = useState(getLocalAuthData());
  const [currentUserTasks, setCurrentUserTasks] = useState([]);
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);


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


  // State of Login
  const [isSignInPage, setIsSignInPage] = useState(true)
  const [userInputData, setUserInputData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [userInputErrors, setUserInputErrors] = useState({ username: "", email: "", password: "", confirmPassword: "" });

  // Validation Helper Function
  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const checkAndSetErrors = (inputData) => {
    const errors = {};
    if (!inputData.email) errors.email = "Email is Required";
    else if (!isValidEmail(inputData.email)) errors.email = "Email is not valid";
    if (!inputData.password) errors.password = "Password is Required";
    if (!isSignInPage) {
      if (!inputData.confirmPassword) errors.confirmPassword = "Confirm Password is Required";
      if (inputData.password !== inputData.confirmPassword) errors.confirmPassword = "Passwords do not match";
      if (!inputData.username) errors.username = "Username is Required"
    }
    return errors;
  };

  // Input handlers
  const handleInputBox = (e) => setUserInputData({ ...userInputData, [e.target.name]: e.target.value });
  const handleSignInAndSignUpButton = () => setIsSignInPage((prev) => !prev);

  // Main Logic Behind LoginButton 
  const handleLoginButton = async () => {
    // Check for errors and save in errors variable
    const errors = checkAndSetErrors(userInputData);

    // if it has errors then setUserInputErrors and close the function
    if (Object.keys(errors).length > 0) return setUserInputErrors(errors);

    if (isSignInPage) {
      await handleLogin()
    }
    else {
      await handleSignUp()
    };
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/userapi/login`, userInputData);
      if (response.data.message === "Login successful") {

        // set Local Storage data for current user
        // response has data key which has an object of user
        setLocalAuthData(response.data.user);
        setCurrentUser(response.data.user);

        // flush the input fields
        setUserInputData({ email: "", password: "", confirmPassword: "" });

        // Fetch fresh data for the logged-in user
        await fetchUsersData();
        await fetchTasksData();

      } else {
        setUserInputErrors({ ...userInputErrors, password: response.data.error });
      }
    } catch (error) {
      setUserInputErrors({
        ...userInputErrors,
        password: error.response?.status === 401 ? "Invalid Credentials" : "An error occurred. Please try again.",
      });
    }
  }

  const handleSignUp = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/userapi/createuser`, userInputData);
      if (res.data.error) {
        setUserInputErrors({ ...userInputErrors, email: res.data.error });
      }
      else {
        alert("User Created Successfully");
        setUserInputData({ email: "", password: "", confirmPassword: "" });
        setUserInputErrors({ email: "", password: "", confirmPassword: "" });
        setIsSignInPage(true)
      }
    } catch (error) {
      alert(
        error.response?.status === 409
          ? "This email ID is already registered. Please use a different email."
          : "An unexpected error occurred. Please try again."
      );
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("LocalAuthData");
    setCurrentUser(null);
    setShowProfileDropDown(false);

    // Clear state
    setAllTasks([]);
    setFilteredTasks([]);
    setCurrentUserTasks([])
    setCurrentTask("");
    setNewComment("");
    setUserInputErrors({})
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

  const fetchUsersData = async () => {
    const users = await getAllUsersApiCall();
    setUsersList(users);
  };

  const fetchTasksData = async () => {
    const tasks = await getAllTasksApiCall();
    setAllTasks(tasks);
    // setFilteredTasks(tasks);

    setCurrentUserTasks(
      tasks
        .filter((task) => task.assignedTo && task.assignedTo._id === currentUser._id)
        .map((task) => ({
          ...task,
          notes: task.notes || [], // Ensure notes is always an array
        }))
    );
  };

  // const getCurrentUserTasks = async () => {
  //   if (Array.isArray(allTasks) && currentUser?._id) {
  //     setCurrentUserTasks(
  //       allTasks
  //         .filter((task) => task.assignedTo && task.assignedTo._id === currentUser._id)
  //         .map((task) => ({
  //           ...task,
  //           notes: task.notes || [], // Ensure notes is always an array
  //         }))
  //     );
  //   }
  // }

  async function fetchInitialData() {
    if (getLocalAuthData()) {
      if (usersList || allTasks) {
        // console.log("Fetching data");
        await fetchUsersData(); // Sets currentUser
        await fetchTasksData(); // Sets allTasks and filteredTasks
      }
    } else {
      // console.log("No auth data, flushing variables");
      setUsersList([]);
      setCurrentUserTasks([])
      setAllTasks([]);
      setFilteredTasks([]);
    }
  }

  // useEffect(() => {
  //   console.log(currentUserTasks)
  // }, [currentUserTasks])

  useEffect(() => {
    fetchInitialData();
  }, [])

  const values = {
    currentUser,
    showProfileDropDown,
    isSignInPage,
    userInputData,
    userInputErrors,
    usersList,
    allTasks,
    filteredTasks,
    currentTask,
    newComment,
    currentUserTasks,
    setCurrentUserTasks,
    fetchInitialData,
    getLocalAuthData,
    setShowProfileDropDown,
    setNewComment,
    setFilteredTasks,
    handleSignInAndSignUpButton,
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
