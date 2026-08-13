import { useMemo, useState } from "react";

import LeaveForm from "../../components/leave/LeaveForm";
import LeaveSummary from "../../components/leave/LeaveSummary";
import LeaveTable from "../../components/leave/LeaveTable";

import { useLeave } from "../../hooks/useLeave";

import type { LeaveFormData, LeaveStatus } from "../../types/leave";

import "../../styles/leave.css";

const LeaveManagement = () => {
  const { leaveRequests, addLeaveRequest, updateLeaveStatus } = useLeave();

  const [searchText, setSearchText] = useState("");

  const [statusFilter, setStatusFilter] = useState<"All" | LeaveStatus>("All");

  const handleSubmit = (
    data: LeaveFormData & {
      totalDays: number;
    },
  ) => {
    addLeaveRequest({
      employeeId: data.employeeId,
      employeeName: data.employeeName,
      department: data.department,
      leaveType: data.leaveType,
      fromDate: data.fromDate,
      toDate: data.toDate,
      totalDays: data.totalDays,
      reason: data.reason,
    });
  };

  const handleStatusChange = (id: string, status: LeaveStatus) => {
    updateLeaveStatus(id, status);
  };

  const filteredLeaveRequests = useMemo(() => {
    return leaveRequests.filter((leave) => {
      const search = searchText.trim().toLowerCase();

      const matchesSearch =
        !search ||
        leave.employeeName.toLowerCase().includes(search) ||
        leave.employeeId.toLowerCase().includes(search) ||
        leave.department.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || leave.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leaveRequests, searchText, statusFilter]);

  return (
    <div className="leave-page">
      {/* PAGE HEADER */}

      <div className="leave-page-header">
        <div>
          <h1>Leave Management</h1>

          <p>Manage employee leave requests, approvals, and leave balances.</p>
        </div>
      </div>

      {/* SUMMARY */}

      <LeaveSummary leaveRequests={leaveRequests} />

      {/* APPLY LEAVE */}

      <LeaveForm onSubmit={handleSubmit} />

      {/* FILTERS */}

      <div className="leave-filter-card">
        <div className="leave-filter-group">
          <label>Search</label>

          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search employee, ID or department..."
          />
        </div>

        <div className="leave-filter-group">
          <label>Status</label>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as "All" | LeaveStatus)
            }
          >
            <option value="All">All Status</option>

            <option value="Pending">Pending</option>

            <option value="Approved">Approved</option>

            <option value="Rejected">Rejected</option>

            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* TABLE */}

      <LeaveTable
        leaveRequests={filteredLeaveRequests}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default LeaveManagement;
