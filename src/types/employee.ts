export type EmployeeStatus = "Active" | "Inactive";

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  phone: string;
  joiningDate: string;
  status: EmployeeStatus;
  photo?: string;
}

export interface EmployeeFormData {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  phone: string;
  joiningDate: string;
  status: EmployeeStatus;
}
