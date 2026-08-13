import { useParams } from "react-router-dom";

import { useLeave } from "../../hooks/useLeave";

const EmployeeLeaveProfile = () => {
  const { employeeId } = useParams<{
    employeeId: string;
  }>();

  const { getEmployeeLeaves, getEmployeeBalance } = useLeave();

  const id = employeeId || "EMP001";

  const employeeLeaves = getEmployeeLeaves(id);

  const balance = getEmployeeBalance(id);

  const employee = employeeLeaves[0];

  const totalRequests = employeeLeaves.length;

  const approved = employeeLeaves.filter(
    (leave) => leave.status === "Approved",
  ).length;

  const pending = employeeLeaves.filter(
    (leave) => leave.status === "Pending",
  ).length;

  const rejected = employeeLeaves.filter(
    (leave) => leave.status === "Rejected",
  ).length;

  if (!employee) {
    return (
      <div className="min-h-full bg-slate-50 p-6">
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <h1 className="text-xl font-bold text-slate-900">
            Employee Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            No leave information is available for employee {id}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Employee Leave Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Leave balance, statistics and history.
        </p>
      </div>

      {/* EMPLOYEE */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
            {employee.employeeName.charAt(0)}
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {employee.employeeName}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {employee.employeeId} • {employee.department}
            </p>

            <p className="text-sm text-slate-500">{employee.designation}</p>
          </div>
        </div>
      </div>

      {/* BALANCE */}

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <p className="text-sm text-blue-700">Total Entitlement</p>

          <p className="mt-2 text-3xl font-bold text-blue-900">
            {balance.totalEntitlement}
          </p>

          <p className="mt-1 text-xs text-blue-600">Days</p>
        </div>

        <div className="rounded-xl border border-orange-200 bg-orange-50 p-6">
          <p className="text-sm text-orange-700">Approved Leave</p>

          <p className="mt-2 text-3xl font-bold text-orange-900">
            {balance.approvedDays}
          </p>

          <p className="mt-1 text-xs text-orange-600">Days used</p>
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
          <p className="text-sm text-green-700">Remaining Leave</p>

          <p className="mt-2 text-3xl font-bold text-green-900">
            {balance.remainingDays}
          </p>

          <p className="mt-1 text-xs text-green-600">Days available</p>
        </div>
      </div>

      {/* STATISTICS */}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Leave Statistics
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Total Requests</p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {totalRequests}
            </p>
          </div>

          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-sm text-green-600">Approved</p>

            <p className="mt-2 text-2xl font-bold text-green-800">{approved}</p>
          </div>

          <div className="rounded-lg bg-amber-50 p-4">
            <p className="text-sm text-amber-600">Pending</p>

            <p className="mt-2 text-2xl font-bold text-amber-800">{pending}</p>
          </div>

          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-sm text-red-600">Rejected</p>

            <p className="mt-2 text-2xl font-bold text-red-800">{rejected}</p>
          </div>
        </div>
      </div>

      {/* HISTORY */}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Leave History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Leave Type
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  From
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  To
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Days
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {employeeLeaves.map((leave) => (
                <tr key={leave.id} className="border-t border-slate-100">
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {leave.leaveType}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {leave.fromDate}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {leave.toDate}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                    {leave.totalDays}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        leave.status === "Approved"
                          ? "bg-green-50 text-green-700"
                          : leave.status === "Rejected"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaveProfile;
