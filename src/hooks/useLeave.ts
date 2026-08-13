import { useEffect, useState } from "react";

import type { LeaveRequest, LeaveStatus, LeaveBalance } from "../types/leave";

const STORAGE_KEY = "onecloud_leave_requests";

const defaultLeaveRequests: LeaveRequest[] = [
  {
    id: "LV001",
    employeeId: "EMP001",
    employeeName: "Pavan Kumar",
    department: "IT",
    designation: "Java Developer",
    leaveType: "Casual Leave",
    fromDate: "2026-08-12",
    toDate: "2026-08-13",
    totalDays: 2,
    reason: "Personal work",
    status: "Pending",
    appliedDate: "2026-08-10",
  },

  {
    id: "LV002",
    employeeId: "EMP002",
    employeeName: "Rajesh Kumar",
    department: "HR",
    designation: "HR Manager",
    leaveType: "Sick Leave",
    fromDate: "2026-08-05",
    toDate: "2026-08-06",
    totalDays: 2,
    reason: "Health issue",
    status: "Approved",
    appliedDate: "2026-08-04",
  },

  {
    id: "LV003",
    employeeId: "EMP003",
    employeeName: "Anil Sharma",
    department: "Finance",
    designation: "Accountant",
    leaveType: "Earned Leave",
    fromDate: "2026-08-18",
    toDate: "2026-08-20",
    totalDays: 3,
    reason: "Family function",
    status: "Rejected",
    appliedDate: "2026-08-10",
  },

  {
    id: "LV004",
    employeeId: "EMP001",
    employeeName: "Pavan Kumar",
    department: "IT",
    designation: "Java Developer",
    leaveType: "Sick Leave",
    fromDate: "2026-07-20",
    toDate: "2026-07-22",
    totalDays: 3,
    reason: "Fever",
    status: "Approved",
    appliedDate: "2026-07-19",
  },
];

export const useLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultLeaveRequests;
    }

    try {
      return JSON.parse(saved) as LeaveRequest[];
    } catch {
      return defaultLeaveRequests;
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

  return {
    leaveRequests,
    addLeaveRequest,
    updateLeaveStatus,
    getEmployeeLeaves,
    getEmployeeBalance,
  };
};
