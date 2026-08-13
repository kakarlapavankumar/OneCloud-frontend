export type AttendanceStatus = "Present" | "Absent" | "Half Day" | "WFH";

export interface AttendanceRecord {
  employeeId: string;
  date: string;
  status: AttendanceStatus;
}

export interface AttendanceFilter {
  search: string;
  department: string;
  status: string;
  date: string;
}
