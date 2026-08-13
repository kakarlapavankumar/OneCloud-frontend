export type UserRole = "Admin" | "HR" | "Employee";

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
}
