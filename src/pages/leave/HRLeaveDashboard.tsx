import { useMemo } from "react";

import { useLeave } from "../../hooks/useLeave";

const HRLeaveDashboard = () => {
  const { leaveRequests } = useLeave();

  const statistics = useMemo(() => {
    return {
      total: leaveRequests.length,

      pending: leaveRequests.filter((leave) => leave.status === "Pending")
        .length,

      approved: leaveRequests.filter((leave) => leave.status === "Approved")
        .length,

      rejected: leaveRequests.filter((leave) => leave.status === "Rejected")
        .length,
    };
  }, [leaveRequests]);

  const leaveTypes = [
    "Casual Leave",
    "Sick Leave",
    "Earned Leave",
    "Maternity Leave",
  ];

  return (
    <div className="min-h-full bg-slate-50 p-6">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-slate-900">
          HR Leave Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor organization-wide leave activity and employee leave requests.
        </p>
      </div>

      {/* STATISTICS */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Requests</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {statistics.total}
          </h2>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm text-amber-700">Pending</p>

          <h2 className="mt-2 text-3xl font-bold text-amber-800">
            {statistics.pending}
          </h2>
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <p className="text-sm text-green-700">Approved</p>

          <h2 className="mt-2 text-3xl font-bold text-green-800">
            {statistics.approved}
          </h2>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-700">Rejected</p>

          <h2 className="mt-2 text-3xl font-bold text-red-800">
            {statistics.rejected}
          </h2>
        </div>
      </div>

      {/* LEAVE TYPES */}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Leave Type Statistics
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {leaveTypes.map((type) => {
            const count = leaveRequests.filter(
              (leave) => leave.leaveType === type,
            ).length;

            return (
              <div
                key={type}
                className="rounded-lg border border-slate-200 p-4"
              >
                <p className="text-sm text-slate-500">{type}</p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {count}
                </p>

                <p className="mt-1 text-xs text-slate-400">Requests</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECENT REQUESTS */}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Leave Requests
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Employee
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Department
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Leave Type
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
              {leaveRequests.slice(0, 8).map((leave) => (
                <tr key={leave.id} className="border-t border-slate-100">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">
                      {leave.employeeName}
                    </p>

                    <p className="text-xs text-slate-500">{leave.employeeId}</p>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {leave.department}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {leave.leaveType}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
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

export default HRLeaveDashboard;
