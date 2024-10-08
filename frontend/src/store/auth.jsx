import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;

  const API = import.meta.env.VITE_APP_URI_API;

  const storeTokenInLocalStorage = (token) => {
    setToken(token);
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
      setIsLoading(true);
      const response = await fetch(`${API}/api/v1/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsLoading(false);
      } else {
        console.log("error in fetching user");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error in auth context", error);
    }
  };

  // get services
  const getServices = async () => {
    try {
      const response = await fetch(`${API}/api/v1/data/services`);
      if (response.ok) {
        const data = await response.json();
        setServices(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userAuthentication();
    getServices();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        storeTokenInLocalStorage,
        logoutUser,
        isLoggedIn,
        user,
        services,
        authorizationToken,
        isLoading,
        API
      }}
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
