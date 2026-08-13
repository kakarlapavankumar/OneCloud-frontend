import type { Employee } from "../../types";
import Badge from "../common/Badge";

export default function EmployeeDetails({ employee }: { employee: Employee }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-700">
          {employee.name.charAt(0)}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">{employee.name}</h1>

          <p className="text-slate-500">{employee.designation}</p>

          <div className="mt-2">
            <Badge
              variant={employee.status === "Active" ? "success" : "danger"}
            >
              {employee.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Detail label="Employee ID" value={employee.id} />

        <Detail label="Full Name" value={employee.name} />

        <Detail label="Department" value={employee.department} />

        <Detail label="Designation" value={employee.designation} />

        <Detail label="Email" value={employee.email} />

        <Detail label="Phone" value={employee.phone} />

        <Detail label="Joining Date" value={employee.joiningDate} />

        <Detail label="Status" value={employee.status} />
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-medium text-slate-900">{value}</p>
    </div>
  );
}
