import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isSignoutOpen, setIsSignoutOpen] = useState(false);

  const toggleSignout = () => setIsSignoutOpen((prevState) => !prevState);
  const closeSignout = () => setIsSignoutOpen(false);
  const openSignout = () => setIsSignoutOpen(true);

  const signoutAccount = () => {
    setIsSignoutOpen(false);
    window.location.replace("/login");
  };

  return (
    <UserContext.Provider
      value={{
        isSignoutOpen,
        toggleSignout,
        closeSignout,
        openSignout,
        signoutAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
