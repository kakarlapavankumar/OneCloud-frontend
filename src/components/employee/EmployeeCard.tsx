import { Link } from "react-router-dom";

import type { Employee } from "../../types";
import Badge from "../common/Badge";

export default function EmployeeCard({ employee }: { employee: Employee }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
          {employee.name.charAt(0)}
        </div>

        <div>
          <h3 className="font-bold text-slate-900">{employee.name}</h3>

          <p className="text-sm text-slate-500">{employee.designation}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <p>
          <strong>ID:</strong> {employee.id}
        </p>

        <p>
          <strong>Department:</strong> {employee.department}
        </p>

        <p>
          <strong>Email:</strong> {employee.email}
        </p>

        <Badge variant={employee.status === "Active" ? "success" : "danger"}>
          {employee.status}
        </Badge>
      </div>

      <Link
        to={`/employees/${employee.id}`}
        className="mt-5 block rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}
