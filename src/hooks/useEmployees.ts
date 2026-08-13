import { useCallback, useEffect, useState } from "react";

import type { Employee, EmployeeFormData } from "../types";

import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from "../services/api/employeeApi";

export default function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [loading, setLoading] = useState(true);

  const loadEmployees = useCallback(async () => {
    setLoading(true);

    const data = await getAllEmployees();

    setEmployees(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timeoutId = globalThis.setTimeout(() => {
      void loadEmployees();
    }, 0);

    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, [loadEmployees]);

  async function addEmployee(data: EmployeeFormData) {
    await createEmployee(data);
    await loadEmployees();
  }

  async function editEmployee(id: string, data: EmployeeFormData) {
    await updateEmployee(id, data);
    await loadEmployees();
  }

  async function removeEmployee(id: string) {
    await deleteEmployee(id);
    await loadEmployees();
  }

  return {
    employees,
    loading,
    addEmployee,
    editEmployee,
    removeEmployee,
    refresh: loadEmployees,
  };
}
