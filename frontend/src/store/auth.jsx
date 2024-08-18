import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const storeTokenInLocalStorage = (token) => {
    return localStorage.setItem("token", token);
  };
  const logoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };
  let isLoggedIn = !!token;

  // jwt authetication for get user data
  const userAuthentication = async () => {
    try {
      const response =await fetch("http://localhost:8080/api/v1/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.log("error in auth context", error);
    }
  };
  useEffect(() => {
    userAuthentication();
  }, []);
  return (
    <AuthContext.Provider
      value={{ storeTokenInLocalStorage, logoutUser, isLoggedIn, user }}
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
