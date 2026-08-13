import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import type { Employee } from "../../types";

import { getEmployeeById } from "../../services/api/employeeApi";

import EmployeeDetails from "../../components/employee/EmployeeDetails";

export default function EmployeeDetailsPage() {
  const { id } = useParams();

  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) return;

      const data = await getEmployeeById(id);

      setEmployee(data ?? null);
    }

    load();
  }, [id]);

  if (!employee) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        <h2 className="text-xl font-bold">Employee not found</h2>

        <Link to="/employees" className="mt-4 inline-block text-blue-600">
          Back to Employees
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Link
        to="/employees"
        className="inline-flex text-sm font-medium text-blue-600"
      >
        ← Back to Employees
      </Link>

      <EmployeeDetails employee={employee} />
    </div>
  );
}
