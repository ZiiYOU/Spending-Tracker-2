import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

const token = localStorage.getItem("accessToken");

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  return (
    <>
      <AuthContext.Provider
        value={{ userInfo, setUserInfo, isAuthenticated, setIsAuthenticated }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
