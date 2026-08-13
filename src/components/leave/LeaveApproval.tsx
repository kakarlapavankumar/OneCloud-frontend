import type { LeaveRequest, LeaveStatus } from "../../types/leave";

interface LeaveApprovalProps {
  leave: LeaveRequest;

  onStatusChange: (id: string, status: LeaveStatus) => void;
}

const LeaveApproval = ({ leave, onStatusChange }: LeaveApprovalProps) => {
  if (leave.status !== "Pending") {
    return <span className="text-sm text-slate-400">—</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onStatusChange(leave.id, "Approved")}
        className="rounded-md bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 transition hover:bg-green-100"
      >
        Approve
      </button>

      <button
        type="button"
        onClick={() => onStatusChange(leave.id, "Rejected")}
        className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
      >
        Reject
      </button>
    </div>
  );
};

export default LeaveApproval;
