'use client'
import React, { useState, createContext, useContext } from "react";

const RealContext = createContext();

export const LoggedInContext = ({ children }) => {
  const [loggedIn, isLoggedIn] = useState(false);
  return (
    <RealContext.Provider value={{ loggedIn, isLoggedIn }}>
      {children}
    </RealContext.Provider>
  );
};

export const useContextValue = () => useContext(RealContext);