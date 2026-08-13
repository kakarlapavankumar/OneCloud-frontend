export type LeaveType =
  | "Casual Leave"
  | "Sick Leave"
  | "Earned Leave"
  | "Maternity Leave";

export type LeaveStatus = "Pending" | "Approved" | "Rejected" | "Cancelled";

export interface LeaveRequest {
  id: string;

  employeeId: string;

  employeeName: string;

  department: string;

  designation?: string;

  leaveType: LeaveType;

  fromDate: string;

  toDate: string;

  totalDays: number;

  reason: string;

  status: LeaveStatus;

  appliedDate: string;
}

export interface LeaveBalance {
  employeeId: string;

  totalEntitlement: number;

  approvedDays: number;

  pendingDays: number;

  remainingDays: number;
}

export interface LeaveFormData {
  employeeId: string;

  employeeName: string;

  department: string;

  leaveType: LeaveType;

  fromDate: string;

  toDate: string;

  reason: string;
}
