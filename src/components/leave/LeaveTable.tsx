import type { LeaveRequest, LeaveStatus } from "../../types/leave";

import LeaveApproval from "./LeaveApproval";

interface LeaveTableProps {
  leaveRequests: LeaveRequest[];

  onStatusChange: (id: string, status: LeaveStatus) => void;
}

const LeaveTable = ({ leaveRequests, onStatusChange }: LeaveTableProps) => {
  const getStatusClasses = (status: LeaveStatus) => {
    switch (status) {
      case "Approved":
        return "bg-green-50 text-green-700 border-green-200";

      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";

      case "Cancelled":
        return "bg-slate-100 text-slate-600 border-slate-200";

      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  if (leaveRequests.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
          📋
        </div>

        <h3 className="text-lg font-semibold text-slate-900">
          No Leave Requests
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          No leave requests match your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">Leave Requests</h2>

        <p className="mt-1 text-sm text-slate-500">
          Review and manage employee leave requests.
        </p>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="min-w-[1200px] w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Employee
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Department
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Leave Type
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                From
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                To
              </th>

              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Days
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Reason
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {leaveRequests.map((leave) => (
              <tr
                key={leave.id}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >
                {/* Employee */}

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                      {leave.employeeName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-medium text-slate-900">
                        {leave.employeeName}
                      </p>

                      <p className="text-xs text-slate-500">
                        {leave.employeeId}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Department */}

                <td className="px-5 py-4 text-sm text-slate-600">
                  {leave.department}
                </td>

                {/* Leave Type */}

                <td className="px-5 py-4 text-sm text-slate-700">
                  {leave.leaveType}
                </td>

                {/* From */}

                <td className="px-5 py-4 text-sm text-slate-600">
                  {leave.fromDate}
                </td>

                {/* To */}

                <td className="px-5 py-4 text-sm text-slate-600">
                  {leave.toDate}
                </td>

                {/* Days */}

                <td className="px-5 py-4 text-center">
                  <span className="font-semibold text-slate-900">
                    {leave.totalDays}
                  </span>
                </td>

                {/* Reason */}

                <td className="max-w-[200px] px-5 py-4 text-sm text-slate-600">
                  <span title={leave.reason} className="block truncate">
                    {leave.reason}
                  </span>
                </td>

                {/* Status */}

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                      leave.status,
                    )}`}
                  >
                    {leave.status}
                  </span>
                </td>

                {/* Actions */}

                <td className="px-5 py-4">
                  <LeaveApproval
                    leave={leave}
                    onStatusChange={onStatusChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveTable;
