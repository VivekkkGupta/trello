import React, { useState, useEffect, createContext, useContext } from "react";

export const TrelloContext = createContext(null);

export const useTrelloContext = () => useContext(TrelloContext);

export const TrelloProvider = ({ children }) => {

  //Navbar
  const [logoutDropDown,setLogoutDropDown] = useState(false)

  // Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isColorPanelOpen, setIsColorPanelOpen] = useState(false);
  const toggleColorPanel = () => {
    setIsColorPanelOpen(!isColorPanelOpen);
  };

  // Load initial color from localStorage or use default color
  const initialColor =
    localStorage.getItem("bgcolorofdashboard") ||
    "bg-gradient-to-br from-[#8061C5] to-[#E073BC]";
  const [selectedColor, setSelectedColor] = useState(initialColor);

  useEffect(() => {
    // Save color to localStorage whenever it changes
    localStorage.setItem("bgcolorofdashboard", selectedColor);
  }, [selectedColor]);

  

  const values = {
    isSidebarOpen,
    toggleSidebar,
    isColorPanelOpen,
    toggleColorPanel,
    selectedColor,
    setSelectedColor,
    logoutDropDown,setLogoutDropDown
  };

  return (
    <TrelloContext.Provider value={values}>{children}</TrelloContext.Provider>
  );
};
