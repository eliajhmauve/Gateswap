import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "./queryClient";

interface TaskProgressContextType {
  isVerified: boolean;
  taskCompleted: boolean;
  setVerified: (status: boolean) => void;
  setTaskCompleted: (status: boolean) => void;
  fetchTaskStatus: () => Promise<void>;
}

interface TaskStatus {
  verified: boolean;
  taskCompleted: boolean;
}

const TaskProgressContext = createContext<TaskProgressContextType | undefined>(undefined);

export function TaskProgressProvider({ children }: { children: ReactNode }) {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);
  const [, navigate] = useLocation();

  // Check localStorage on initial load
  useEffect(() => {
    const storedVerification = localStorage.getItem("isVerified");
    const storedTaskCompletion = localStorage.getItem("taskCompleted");
    
    if (storedVerification === "true") {
      setIsVerified(true);
    }
    
    if (storedTaskCompletion === "true") {
      setTaskCompleted(true);
    }
    
    // Also fetch from API
    fetchTaskStatus();
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("isVerified", isVerified ? "true" : "false");
  }, [isVerified]);

  useEffect(() => {
    localStorage.setItem("taskCompleted", taskCompleted ? "true" : "false");
    
    // When task is completed, redirect to success page
    if (taskCompleted) {
      navigate("/success");
    }
  }, [taskCompleted, navigate]);

  // Fetch task status from API
  const fetchTaskStatus = async () => {
    try {
      const taskStatus = await apiRequest<TaskStatus>("/api/task-status");
      
      if (taskStatus) {
        setIsVerified(taskStatus.verified);
        setTaskCompleted(taskStatus.taskCompleted);
      }
    } catch (error) {
      console.error("Failed to fetch task status:", error);
    }
  };

  // Controlled setters that update localStorage
  const updateVerified = (status: boolean) => {
    setIsVerified(status);
    localStorage.setItem("isVerified", status ? "true" : "false");
  };

  const updateTaskCompleted = (status: boolean) => {
    setTaskCompleted(status);
    localStorage.setItem("taskCompleted", status ? "true" : "false");
    
    if (status) {
      navigate("/success");
    }
  };

  return (
    <TaskProgressContext.Provider value={{ 
      isVerified, 
      taskCompleted,
      setVerified: updateVerified,
      setTaskCompleted: updateTaskCompleted,
      fetchTaskStatus
    }}>
      {children}
    </TaskProgressContext.Provider>
  );
}

export function useTaskProgress() {
  const context = useContext(TaskProgressContext);
  if (context === undefined) {
    throw new Error("useTaskProgress must be used within a TaskProgressProvider");
  }
  return context;
}