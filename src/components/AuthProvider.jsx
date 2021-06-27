import React, { useState } from 'react';
import authContext from '../contexts/authContext.js';
import { AUTH_STORAGE_KEY } from '../constants.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);
  const logIn = (userData) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));

    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  return (
    <authContext.Provider value={{
      logIn, logOut, getAuthHeader, user,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
