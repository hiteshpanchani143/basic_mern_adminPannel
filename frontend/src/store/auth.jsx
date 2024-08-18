import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log(token);
  const storeTokenInLocalStorage = (token) => {
    return localStorage.setItem("token", token);
  };
  const logoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };
  let isLoggedIn = !!token;
  console.log(isLoggedIn);
  return (
    <AuthContext.Provider
      value={{ storeTokenInLocalStorage, logoutUser, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
