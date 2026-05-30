import React, { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import * as tasksApi from "../api/tasksApi";
import { AuthContext } from "./AuthContext";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const res = await tasksApi.getAllTasks();
      if (res.success) setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [isAuthenticated]);

  const addTask = async (payload) => {
    const res = await tasksApi.createTask(payload);
    if (res.success) setTasks((prev) => [res.data, ...prev]);
    return res;
  };

  const editTask = async (id, payload) => {
    const res = await tasksApi.updateTask(id, payload);
    if (res.success)
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    return res;
  };

  const removeTask = async (id) => {
    const res = await tasksApi.deleteTask(id);
    if (res.success) setTasks((prev) => prev.filter((t) => t._id !== id));
    return res;
  };

  return (
    <TaskContext.Provider
      value={{ tasks, isLoading, fetchTasks, addTask, editTask, removeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = { children: PropTypes.node };
