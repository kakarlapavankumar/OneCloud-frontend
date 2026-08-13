import { useMemo } from "react";

import { useLeave } from "../../hooks/useLeave";

const LeaveApprovalDashboard = () => {
  const { leaveRequests, updateLeaveStatus } = useLeave();

  const pendingRequests = useMemo(
    () => leaveRequests.filter((leave) => leave.status === "Pending"),
    [leaveRequests],
  );

  return (
    <div className="min-h-full bg-slate-50 p-6">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-slate-900">
          Leave Approval Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review pending employee leave requests and approve or reject them.
        </p>
      </div>

      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-medium text-amber-700">Pending Approvals</p>

        <p className="mt-1 text-3xl font-bold text-amber-900">
          {pendingRequests.length}
        </p>
      </div>

      <div className="space-y-4">
        {pendingRequests.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <div className="text-4xl">✓</div>

            <h2 className="mt-3 text-lg font-semibold text-slate-900">
              No Pending Requests
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              All leave requests have been processed.
            </p>
          </div>
        ) : (
          pendingRequests.map((leave) => (
            <div
              key={leave.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-5 lg:flex-row">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                    {leave.employeeName.charAt(0)}
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {leave.employeeName}
                    </h2>

                    <p className="text-sm text-slate-500">
                      {leave.employeeId} • {leave.department}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-4">
                      <div>
                        <p className="text-xs text-slate-400">Leave Type</p>

                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {leave.leaveType}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">From</p>

                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {leave.fromDate}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">To</p>

                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {leave.toDate}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">Total Days</p>

                        <p className="mt-1 text-sm font-bold text-blue-600">
                          {leave.totalDays}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Reason
                      </p>

                      <p className="mt-1 text-sm text-slate-700">
                        {leave.reason}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3 lg:self-center">
                  <button
                    type="button"
                    onClick={() => updateLeaveStatus(leave.id, "Rejected")}
                    className="rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Reject
                  </button>

                  <button
                    type="button"
                    onClick={() => updateLeaveStatus(leave.id, "Approved")}
                    className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeaveApprovalDashboard;
