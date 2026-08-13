import type { LoginCredentials, RegisterData, User } from "../../types";
import {
  getStorage,
  removeStorage,
  setStorage,
} from "../../utils/storageUtils";
import { STORAGE_KEYS } from "../../constants/appConstants";

const demoUser: User = {
  id: "USR001",
  username: "admin",
  name: "Administrator",
  email: "admin@onecloud.com",
  role: "Admin",
};

export async function login(credentials: LoginCredentials): Promise<User> {
  if (credentials.username === "admin" && credentials.password === "admin123") {
    setStorage(STORAGE_KEYS.user, demoUser);

    setStorage(STORAGE_KEYS.authenticated, true);

    return demoUser;
  }

  throw new Error("Invalid username or password.");
}

export async function register(data: RegisterData): Promise<User> {
  const user: User = {
    id: `USR${Date.now()}`,
    username: data.username,
    name: data.name,
    email: data.email,
    role: "Employee",
  };

  setStorage(STORAGE_KEYS.user, user);
  setStorage(STORAGE_KEYS.authenticated, true);

  return user;
}

export function logout(): void {
  removeStorage(STORAGE_KEYS.user);
  removeStorage(STORAGE_KEYS.authenticated);
}

export function getCurrentUser(): User | null {
  return getStorage<User | null>(STORAGE_KEYS.user, null);
}

export function isAuthenticated(): boolean {
  return getStorage<boolean>(STORAGE_KEYS.authenticated, false);
}
