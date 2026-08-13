import { Link } from "react-router-dom";

import type { Employee } from "../../types";
import Badge from "../common/Badge";

interface Props {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export default function EmployeeTable({ employees, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-sm font-semibold">Employee</th>
              <th className="px-5 py-4 text-sm font-semibold">Department</th>
              <th className="px-5 py-4 text-sm font-semibold">Designation</th>
              <th className="px-5 py-4 text-sm font-semibold">Email</th>
              <th className="px-5 py-4 text-sm font-semibold">Status</th>
              <th className="px-5 py-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <Link
                    to={`/employees/${employee.id}`}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {employee.name}
                  </Link>

                  <p className="text-xs text-slate-500">{employee.id}</p>
                </td>

                <td className="px-5 py-4">{employee.department}</td>

                <td className="px-5 py-4">{employee.designation}</td>

                <td className="px-5 py-4">{employee.email}</td>

                <td className="px-5 py-4">
                  <Badge
                    variant={
                      employee.status === "Active" ? "success" : "danger"
                    }
                  >
                    {employee.status}
                  </Badge>
                </td>

                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(employee)}
                      className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(employee.id)}
                      className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {employees.length === 0 && (
        <div className="p-10 text-center text-slate-500">
          No employees found.
        </div>
      )}
    </div>
  );
}
