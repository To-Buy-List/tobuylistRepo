import React, { createContext, useState, useEffect } from "react";
import AuthService from "../Services/AuthService";
import "../style.css";

export const AuthContext = createContext();

//by children we mean the components we are going to wrap
export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);
  return (
    <div>
      {!isLoaded ? (
        <div className="loader"></div>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
