import React from "react";
import LeaveDashboardCard from "../../components/leave/LeaveDashboardCard";

const LeaveManagement: React.FC = () => {
  return (
    <div className="min-h-full bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 rounded-2xl bg-slate-900 px-8 py-10 text-white shadow-lg">
          <h1 className="text-3xl font-bold">Leave Management</h1>

          <p className="mt-2 text-slate-300">
            Employee Leave Management Module
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <LeaveDashboardCard
            title="Leave Request"
            description="Submit a new employee leave request."
            to="/leave/request"
            icon={<span className="text-2xl">📝</span>}
          />

          <LeaveDashboardCard
            title="Leave Approval"
            description="Approve or reject employee leave requests."
            to="/leave/approval"
            icon={<span className="text-2xl">✅</span>}
          />

          <LeaveDashboardCard
            title="HR Dashboard"
            description="View real-time HR statistics."
            to="/leave/hr-dashboard"
            icon={<span className="text-2xl">📊</span>}
          />

          <LeaveDashboardCard
            title="Employee Profile"
            description="View employee information and reports."
            to="/leave/employee-profile"
            icon={<span className="text-2xl">👤</span>}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
