import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { seedLeaves } from "../data/leaves";
import type { LeaveBalance, LeaveRequest, LeaveStatus } from "../types/leave";

const STORAGE_KEY = "onecloud_leave_requests";

interface LeaveContextType {
  leaveRequests: LeaveRequest[];

  addLeaveRequest: (
    request: Omit<LeaveRequest, "id" | "status" | "appliedDate">,
  ) => void;

  updateLeaveStatus: (id: string, status: LeaveStatus) => void;

  getEmployeeLeaves: (employeeId: string) => LeaveRequest[];

  getEmployeeBalance: (employeeId: string) => LeaveBalance;
}

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

interface LeaveProviderProps {
  children: ReactNode;
}

export function LeaveProvider({ children }: LeaveProviderProps) {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return seedLeaves;
    }

    try {
      return JSON.parse(saved) as LeaveRequest[];
    } catch {
      return seedLeaves;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  const addLeaveRequest = (
    request: Omit<LeaveRequest, "id" | "status" | "appliedDate">,
  ) => {
    const newRequest: LeaveRequest = {
      ...request,
      id: `LV${Date.now()}`,
      status: "Pending",
      appliedDate: new Date().toISOString().split("T")[0],
    };

    setLeaveRequests((previous) => [newRequest, ...previous]);
  };

  const updateLeaveStatus = (id: string, status: LeaveStatus) => {
    setLeaveRequests((previous) =>
      previous.map((leave) =>
        leave.id === id
          ? {
              ...leave,
              status,
            }
          : leave,
      ),
    );
  };

  const getEmployeeLeaves = (employeeId: string) => {
    return leaveRequests.filter((leave) => leave.employeeId === employeeId);
  };

  const getEmployeeBalance = (employeeId: string): LeaveBalance => {
    const employeeLeaves = getEmployeeLeaves(employeeId);

    const totalEntitlement = 20;

    const approvedDays = employeeLeaves
      .filter((leave) => leave.status === "Approved")
      .reduce((total, leave) => total + leave.totalDays, 0);

    const pendingDays = employeeLeaves
      .filter((leave) => leave.status === "Pending")
      .reduce((total, leave) => total + leave.totalDays, 0);

    return {
      employeeId,
      totalEntitlement,
      approvedDays,
      pendingDays,
      remainingDays: totalEntitlement - approvedDays,
    };
  };

  return (
    <LeaveContext.Provider
      value={{
        leaveRequests,
        addLeaveRequest,
        updateLeaveStatus,
        getEmployeeLeaves,
        getEmployeeBalance,
      }}
    >
      {children}
    </LeaveContext.Provider>
  );
}

export function useLeaveContext() {
  const context = useContext(LeaveContext);

  if (!context) {
    throw new Error("useLeaveContext must be used inside LeaveProvider");
  }

  return context;
}
