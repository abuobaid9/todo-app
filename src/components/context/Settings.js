import React, { createContext, useContext, useState } from "react";

export const SettingsContext = createContext();

const SettingsContextProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  const [showComplete, setShowComplete] = useState(true);

  const todoContext = {
    currentPage,
    setCurrentPage,
    postsPerPage,
    showComplete,
    setShowComplete,
    setPostsPerPage,
  };
  return (
    <SettingsContext.Provider value={todoContext}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettingsContext = () => useContext(SettingsContext);

export default SettingsContextProvider;