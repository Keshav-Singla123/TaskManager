import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as authApi from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getMe = async () => {
    try {
      setIsLoading(true);
      const res = await authApi.getMe();
      if (res.success) setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    if (res.success) {
      setUser(res.data);
      if (res.data?.token)
        localStorage.setItem("taskflow_token", res.data.token);
    }
    return res;
  };

  const register = async (payload) => {
    const res = await authApi.register(payload);
    if (res.success) {
      setUser(res.data);
      if (res.data?.token)
        localStorage.setItem("taskflow_token", res.data.token);
    }
    return res;
  };

  const logout = async () => {
    await authApi.logout();
    localStorage.removeItem("taskflow_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        getMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = { children: PropTypes.node };
