import React, { createContext, useState, useContext, useEffect } from "react";
import { getCurrentUser } from "../api/UsersApi";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isSignoutOpen, setIsSignoutOpen] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [loading, setLoading] = useState(true);

  const toggleSignout = () => setIsSignoutOpen((prevState) => !prevState);
  const closeSignout = () => setIsSignoutOpen(false);
  const openSignout = () => setIsSignoutOpen(true);

  const signoutAccount = () => {
    setIsSignoutOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("username");
    window.location.replace("/login");
  };

  const setUser = (user) => {
    setUsername(user);
    localStorage.setItem("username", user);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getCurrentUser(token)
        .then((user) => {
          setUser(user.username);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return "Loading...";
  }

  return (
    <UserContext.Provider
      value={{
        isSignoutOpen,
        toggleSignout,
        closeSignout,
        openSignout,
        signoutAccount,
        username,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
