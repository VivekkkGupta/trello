import React, { useState, useEffect, createContext, useContext } from "react";

export const TrelloContext = createContext(null);

export const useTrelloContext = () => useContext(TrelloContext);

export const TrelloProvider = ({ children }) => {

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
    'Todo': {
      border: 'border-blue-500',
      bg: 'bg-blue-300',
      taskbg: 'bg-blue-500',
    },
    'InProgress': {
      border: 'border-yellow-500',
      bg: 'bg-yellow-300',
      taskbg: 'bg-yellow-500',
    },
    'Completed': {
      border: 'border-green-500',
      bg: 'bg-green-300',
      taskbg: 'bg-green-500',
    },
    'Cancelled': {
      border: 'border-red-500',
      bg: 'bg-red-300',
      taskbg: 'bg-red-500',
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
