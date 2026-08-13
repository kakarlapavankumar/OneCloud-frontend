import type { Employee, EmployeeFormData } from "../../types";
import { seedEmployees } from "../../data/employees";
import { getStorage, setStorage } from "../../utils/storageUtils";
import { STORAGE_KEYS } from "../../constants/appConstants";

function getEmployees(): Employee[] {
  return getStorage<Employee[]>(STORAGE_KEYS.employees, seedEmployees);
}

export async function getAllEmployees(): Promise<Employee[]> {
  return getEmployees();
}

export async function getEmployeeById(
  id: string,
): Promise<Employee | undefined> {
  return getEmployees().find((employee) => employee.id === id);
}

export async function createEmployee(
  data: EmployeeFormData,
): Promise<Employee> {
  const employees = getEmployees();

  const employee: Employee = {
    ...data,
  };

  employees.push(employee);

  setStorage(STORAGE_KEYS.employees, employees);

  return employee;
}

export async function updateEmployee(
  id: string,
  data: EmployeeFormData,
): Promise<Employee> {
  const employees = getEmployees();

  const index = employees.findIndex((employee) => employee.id === id);

  if (index === -1) {
    throw new Error("Employee not found.");
  }

  employees[index] = {
    ...data,
    id,
  };

  setStorage(STORAGE_KEYS.employees, employees);

  return employees[index];
}

export async function deleteEmployee(id: string): Promise<void> {
  const employees = getEmployees();

  const updated = employees.filter((employee) => employee.id !== id);

  setStorage(STORAGE_KEYS.employees, updated);
}
