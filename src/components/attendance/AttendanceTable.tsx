import type { AttendanceStatus, Employee } from "../../types";

import Badge from "../common/Badge";

interface Row {
  employee: Employee;
  status: AttendanceStatus;
}

interface Props {
  rows: Row[];
  onChange: (employeeId: string, status: AttendanceStatus) => void;
}

export default function AttendanceTable({ rows, onChange }: Props) {
  const getBadgeVariant = (status: AttendanceStatus) => {
    switch (status) {
      case "Present":
        return "success";

      case "Absent":
        return "danger";

      case "Half Day":
        return "warning";

      case "WFH":
        return "info";

      default:
        return "default";
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[850px]">
        {/* TABLE HEADER */}
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Employee ID
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Employee Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Department
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Select Attendance
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Current Status
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-10 text-center text-sm text-slate-500"
              >
                No employees found.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.employee.id}
                className="border-t border-slate-100 transition hover:bg-slate-50"
              >
                {/* EMPLOYEE ID */}
                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                  {row.employee.id}
                </td>

                {/* EMPLOYEE NAME */}
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-slate-800">
                    {row.employee.name}
                  </p>
                </td>

                {/* DEPARTMENT */}
                <td className="px-6 py-4 text-sm text-slate-700">
                  {row.employee.department}
                </td>

                {/* SELECT ATTENDANCE */}
                <td className="px-6 py-4">
                  <select
                    value={row.status}
                    onChange={(e) =>
                      onChange(
                        row.employee.id,
                        e.target.value as AttendanceStatus,
                      )
                    }
                    className="w-40 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Present">Present</option>

                    <option value="Absent">Absent</option>

                    <option value="Half Day">Half Day</option>

                    <option value="WFH">Work From Home</option>
                  </select>
                </td>

                {/* CURRENT STATUS */}
                <td className="px-6 py-4">
                  <Badge variant={getBadgeVariant(row.status)}>
                    {row.status === "WFH" ? "WFH" : row.status}
                  </Badge>
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onChange(row.employee.id, row.status)}
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-200"
                    >
                      Update
                    </button>

                    <button
                      type="button"
                      onClick={() => onChange(row.employee.id, "Present")}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                    >
                      Reset
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
