import LeaveForm from "../../components/leave/LeaveForm";
import LeaveTable from "../../components/leave/LeaveTable";

import { useLeave } from "../../hooks/useLeave";

import type { LeaveFormData, LeaveStatus } from "../../types/leave";

const LeaveRequestDashboard = () => {
  const { leaveRequests, addLeaveRequest, updateLeaveStatus } = useLeave();

  // Current logged-in employee
  // Replace this later with AuthContext.
  const currentEmployeeId = "EMP001";

  const myLeaves = leaveRequests.filter(
    (leave) => leave.employeeId === currentEmployeeId,
  );

  const handleSubmit = (
    data: LeaveFormData & {
      totalDays: number;
    },
  ) => {
    addLeaveRequest({
      ...data,
      totalDays: data.totalDays,
    });
  };

  const handleStatusChange = (id: string, status: LeaveStatus) => {
    updateLeaveStatus(id, status);
  };

  return (
    <div className="min-h-full bg-slate-50 p-6">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-slate-900">
          My Leave Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Apply for leave and track your leave requests.
        </p>
      </div>

      {/* EMPLOYEE SUMMARY */}

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="text-sm text-blue-700">Total Entitlement</p>

          <p className="mt-2 text-3xl font-bold text-blue-900">20</p>

          <p className="text-xs text-blue-600">Days</p>
        </div>

        <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
          <p className="text-sm text-orange-700">Used Leave</p>

          <p className="mt-2 text-3xl font-bold text-orange-900">
            {myLeaves
              .filter((leave) => leave.status === "Approved")
              .reduce((sum, leave) => sum + leave.totalDays, 0)}
          </p>

          <p className="text-xs text-orange-600">Days</p>
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <p className="text-sm text-green-700">Remaining</p>

          <p className="mt-2 text-3xl font-bold text-green-900">
            {20 -
              myLeaves
                .filter((leave) => leave.status === "Approved")
                .reduce((sum, leave) => sum + leave.totalDays, 0)}
          </p>

          <p className="text-xs text-green-600">Days</p>
        </div>
      </div>

      {/* APPLY */}

      <LeaveForm onSubmit={handleSubmit} />

      {/* MY REQUESTS */}

      <div className="mt-6">
        <LeaveTable
          leaveRequests={myLeaves}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default LeaveRequestDashboard;
