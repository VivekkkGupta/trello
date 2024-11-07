import React, { useState, useEffect, createContext, useContext } from "react";
import { AdminData, UserData } from "../data/AuthData";
import TaskData from "../data/TaskData";

export const TrelloContext = createContext(null);

export const useTrelloContext = () => useContext(TrelloContext);

export const TrelloProvider = ({ children }) => {
  // Initialize TaskData state from imported data
  const [TaskData, setTaskData] = useState();

  // Sidebar and color panel state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const toggleRightSidebar = () => {
    setIsRightSidebarOpen((prev) => !prev);
  };

  const [isColorPanelOpen, setIsColorPanelOpen] = useState(false);
  const toggleColorPanel = () => {
    setIsColorPanelOpen(!isColorPanelOpen);
  };

  // Color state with persistence to localStorage
  const initialColor =
    localStorage.getItem("bgcolorofdashboard") ||
    "bg-gradient-to-br from-[#8061C5] to-[#E073BC]";
  const [selectedColor, setSelectedColor] = useState(initialColor);

  useEffect(() => {
    // Save color to localStorage whenever it changes
    localStorage.setItem("bgcolorofdashboard", selectedColor);
  }, [selectedColor]);

  // Admin dashboard task management
  const [currentTask, setCurrentTask] = useState(null);
  const handleCurrentTaskInAdminDashboard = (task) => {
    setCurrentTask(task);
  };

  // Update TaskData by taskId and the updated task object
  const updateTaskData = (taskId, updatedTask) => {
    setTaskData(prevTaskData =>
      prevTaskData.map(task =>
        task.id === taskId ? updatedTask : task
      )
    );
  };

  const values = {
    isSidebarOpen,
    toggleSidebar,
    isColorPanelOpen,
    toggleColorPanel,
    selectedColor,
    setSelectedColor,
    isRightSidebarOpen,
    toggleRightSidebar,
    currentTask,
    setCurrentTask,
    handleCurrentTaskInAdminDashboard,
    updateTaskData,  // Adding the update function to context
    TaskData,  // Exposing the TaskData state to the context consumers
  };

  return (
    <TrelloContext.Provider value={values}>{children}</TrelloContext.Provider>
  );
};
