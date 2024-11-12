import React, { useState, useEffect, createContext, useContext } from "react";
import { AdminData, UserData } from "../data/AuthData";
import TaskData from "../data/TaskData";

export const TrelloContext = createContext(null);

export const useTrelloContext = () => useContext(TrelloContext);

export const TrelloProvider = ({ children }) => {
  // Initialize TaskData state from imported data
  const [TaskDataState, setTaskDataState] = useState(TaskData);

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


  // Define colors for different statuses
  const statusColors = {
    'Completed': {
      border: 'border-green-500',
      bg: 'bg-green-300',
    },
    'InProgress': {
      border: 'border-yellow-500',
      bg: 'bg-yellow-300',
    },
    'Todos': {
      border: 'border-blue-500',
      bg: 'bg-blue-300',
    },
    'Failed': {
      border: 'border-red-500',
      bg: 'bg-red-300',
    },
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
    statusColors
  };

  return (
    <TrelloContext.Provider value={values}>{children}</TrelloContext.Provider>
  );
};
